const { createMacro } = require('babel-plugin-macros');
const debug = require('debug')('fluent-react.macro');
const { codeFrameColumns } = require('@babel/code-frame');
const pkgDir = require('pkg-dir');
const path = require('path');
const normalizePath = require('normalize-path');

const pkgName = 'fluent-react.macro';

const R = ({ references, state, babel }) => {
  debug('Initial state:', state);

  // Find the fileName to inject into createElement invocations
  let fileName = state.filename;
  if (fileName) {
    const rootDir = pkgDir.sync(fileName);
    if (rootDir) {
      fileName = path.relative(rootDir, fileName);
    }
    fileName = normalizePath(fileName);
  }

  // Utilities to help with ast construction
  const t = babel.types;
  // Complete source code if file
  const { code } = state.file;
  // Tracks nodes that have been transformed
  const processed = new Set();
  // Primary identifier to access react
  const identifier = state.file.path.scope.generateUidIdentifier('React');

  // Utilities to aid in transformations:
  // ====================================

  const isPending = path => !processed.has(path.node);

  // Inject a React namespace import at the beginning of file
  const injectPrimaryReactImport = () => {
    debug('Injecting react namespace import. Local identifier: ', identifier);
    state.file.path.node.body.unshift(
      t.ImportDeclaration(
        [t.importNamespaceSpecifier(identifier)],
        t.stringLiteral('react')
      )
    );
  };

  // Generate AST for React.createElement
  const createElementNode = t.memberExpression(
    identifier,
    t.identifier('createElement')
  );

  // Validate References of this macro
  const validateRefs = () => {
    const refKeys = Object.keys(references);

    // We expect only a default import
    const invalidRefKeys = refKeys.filter(k => k !== 'default');

    if (invalidRefKeys.length > 0) {
      // Something else was imported from this package
      throw new Error(
        `Invalid import(s) from ${pkgName}: ${invalidRefKeys.join(', ')}`
      );
    }

    if (
      // No default import:
      !references.default ||
      // Nothing done with the default import:
      references.default.length === 0
    ) {
      throw new Error(
        `${pkgName} was imported but never used. You can remove the import to fix this error`
      );
    }
  };

  // Find immediate parent
  const findParent = nodePath => nodePath.findParent(() => true);

  // Print well formatted errors
  const failWith = (errCode, node, message) => {
    if (node.loc) console.log(codeFrameColumns(code, node.loc, { message }));
    const error = new Error(`ERR${errCode}: ${message}`);
    error.code = `ERR${errCode}`;
    throw error;
  };

  // Transform the fluent builder chain
  const transformBuilder = (parentPath, target, props) => {
    debug('Transforming fluent builder chain', parentPath.node);
    const sourceProperties = [];
    if (fileName) {
      sourceProperties.push(
        t.objectProperty(t.identifier('fileName'), t.stringLiteral(fileName))
      );
    }
    if (parentPath.node.loc) {
      sourceProperties.push(
        t.objectProperty(
          t.identifier('lineNumber'),
          t.numericLiteral(parentPath.node.loc.start.line)
        )
      );
    }
    if (Object.keys(sourceProperties).length > 0) {
      props.push({
        propName: '__source',
        value: t.objectExpression(sourceProperties),
      });
    }
    const newTarget = t.callExpression(createElementNode, [
      target,
      t.objectExpression(
        props.map(({ propName, value, spreadable }) => {
          if (spreadable) {
            return t.spreadElement(spreadable);
          }
          return t.objectProperty(t.stringLiteral(propName), value);
        })
      ),
    ]);
    parentPath.replaceWith(newTarget);
  };

  // Validating the beginning of a fluent chain
  const getChainTarget = nodePath => {
    const refNode = nodePath.node;
    let parentPath = findParent(nodePath);
    if (
      t.isCallExpression(parentPath.node) &&
      parentPath.node.callee === nodePath.node
    ) {
      const args = parentPath.node.arguments;
      if (args.length === 0 || args.length > 3) {
        failWith(
          2,
          refNode,
          `Expected ${refNode.name} to have been called with 1-3 argument`
        );
      }
      return {
        target: args[0],
        parentPath,
        propArgIdx: 1,
      };
    } else if (
      t.isMemberExpression(parentPath.node) &&
      parentPath.node.object === refNode
    ) {
      return {
        target: t.stringLiteral(parentPath.node.property.name),
        parentPath: findParent(parentPath),
        propArgIdx: 0,
      };
    }
    failWith(1, refNode, `Expected ${refNode.name} to be invoked`);
  };

  // Process a subset of identified references in sequence
  const processReferences = (
    startIndex = 0,
    predicate = isPending,
    autoTerminate = false
  ) => {
    for (
      let refIdx = startIndex;
      refIdx < references.default.length;
      refIdx++
    ) {
      const nodePath = references.default[refIdx];
      if (predicate(nodePath)) {
        debug('Processing reference', refIdx, nodePath.node);
        transformReference(nodePath, refIdx, autoTerminate);
      } else {
        debug(
          'Ignoring reference due to predicate mismatch',
          refIdx,
          nodePath.node
        );
      }
    }
  };

  const processChainMemberExpression = (
    parentPath,
    nodePath,
    refIdx,
    target,
    props
  ) => {
    const propName = parentPath.node.property.name;
    const nextParentPath = findParent(parentPath);
    if (!t.isCallExpression(nextParentPath.node)) {
      // Allowing usage of imported reference in anything other
      // than direct invocation (eg. reassignment to some different variable etc.)
      // requires a lot of edge case handling - so we simply bail with an error
      failWith(
        3,
        nextParentPath.node,
        `Expected ${propName} to be invoked as a function`
      );
    }
    let args = nextParentPath.node.arguments;
    parentPath = nextParentPath;
    if (
      propName === 'end' &&
      // .end will terminate a fluent chain only if it doesn't receive any argument
      // otherwise it will be treated as a setter for a prop of name end
      args.length === 0
    ) {
      transformBuilder(parentPath, target, props);
      debug('Finished processing:', nodePath.node);
      processed.add(nodePath.node);
      return null;
    }

    if (args.length !== 1 && propName !== 'children') {
      // A prop setter should receive exactly one argument
      failWith(
        4,
        nextParentPath.node,
        `Expected ${propName} to be invoked with a single argument`
      );
    }
    const isChildNodeOfArg = path => path.findParent(p => p.node === args[0]);

    // Ensure that the nodes that we are relocating
    // have already been processed.
    //
    // If this is not done then macro invocations nested inside
    // arguments will get left out in processing.
    processReferences(
      refIdx + 1,
      path => isPending(path) && isChildNodeOfArg(path),
      true
    );

    // Reassign because references may have been changed in AST
    args = nextParentPath.node.arguments;

    props.push({
      propName,
      value: args[0],
    });
    return parentPath;
  };

  // Transform a single macro reference
  const transformReference = (nodePath, refIdx, autoTerminate = false) => {
    let { target, parentPath, propArgIdx } = getChainTarget(nodePath);
    const props = [];

    if (parentPath.node.arguments[propArgIdx]) {
      const preSpecifiedProps = parentPath.node.arguments[propArgIdx];
      props.push({ spreadable: preSpecifiedProps });
    }

    while (true) {
      let nextParentPath = findParent(parentPath);
      if (
        t.isMemberExpression(nextParentPath.node) &&
        nextParentPath.node.object === parentPath.node
      ) {
        parentPath = processChainMemberExpression(
          nextParentPath,
          nodePath,
          refIdx,
          target,
          props
        );
        if (parentPath === null) break;
        continue;
      }
      if (
        t.isCallExpression(nextParentPath.node) &&
        nextParentPath.node.callee === parentPath.node
      ) {
        let args = nextParentPath.node.arguments;
        if (args.length > 0) {
          for (const arg of args) {
            const isChildNodeOfArg = path =>
              path.findParent(p => p.node === arg);
            processReferences(
              refIdx + 1,
              path => isPending(path) && isChildNodeOfArg(path),
              true
            );
          }
          args = nextParentPath.node.arguments;
          if (args.length === 1) {
            props.push({
              propName: 'children',
              value: args[0],
            });
          } else {
            props.push({
              propName: 'children',
              value: t.arrayExpression(args),
            });
          }
        }
        transformBuilder(nextParentPath, target, props);
        processed.add(nodePath.node);
        break;
      }
      if (autoTerminate) {
        transformBuilder(parentPath, target, props);
        processed.add(nodePath.node);
        break;
      }
      failWith(
        5,
        parentPath.node,
        `Expected fluent-react builder chain to have been terminated with end`
      );
    }
  };

  // Transformation starting point:
  // ==============================

  validateRefs();
  injectPrimaryReactImport();
  processReferences();
};

module.exports = createMacro(R);
