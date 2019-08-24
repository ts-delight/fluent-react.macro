const { createMacro } = require('babel-plugin-macros');
const debug = require('debug')('fluent-react.macro');
const { codeFrameColumns } = require('@babel/code-frame');

const pkgName = 'fluent-react.macro';

const R = ({ references, state, babel }) => {
  debug('Initial state:', state);
  const t = babel.types;
  const { code } = state.file;

  // Tracks nodes that have been transformed
  const processed = new Set();

  const identifier = state.file.path.scope.generateUidIdentifier('React');

  debug('Injecting react namespace import. Local identifier: ', identifier);
  state.file.path.node.body.unshift(
    t.ImportDeclaration(
      [t.importNamespaceSpecifier(identifier)],
      t.stringLiteral('react')
    )
  );

  const createElementNode = t.memberExpression(
    identifier,
    t.identifier('createElement')
  );

  // Ensure that only default import is used:

  const refKeys = Object.keys(references);
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
  )
    return;

  const findParent = nodePath => nodePath.findParent(() => true);

  const throwSyntaxError = (errCode, node, message) => {
    if (node.loc)
      console.log(codeFrameColumns(code, node.loc, { message }));
    throw new Error(`ERR${errCode}: ${message}`);
  };

  const transformBuilder = (parentPath, target, props) => {
    const newTarget = t.callExpression(createElementNode, [
      target,
      t.objectExpression(
        props.map(({ propName, value }) =>
          t.objectProperty(t.stringLiteral(propName), value)
        )
      ),
    ]);
    parentPath.replaceWith(newTarget);
  };

  const validateChainHead = nodePath => {
    const refNode = nodePath.node;
    let parentPath = findParent(nodePath);
    if (parentPath.node.type !== 'CallExpression') {
      throwSyntaxError(
        1,
        refNode,
        `Expected ${refNode.name} to be called as a function`
      );
    }
    const args = parentPath.node.arguments;
    if (args.length !== 1) {
      throwSyntaxError(
        2,
        refNode,
        `Expected ${refNode.name} to have been called with single argument`
      );
    }
  };

  const transformReference = (nodePath, i) => {
    let parentPath = findParent(nodePath);
    validateChainHead(nodePath);
    const target = parentPath.node.arguments[0];
    const props = [];
    let didEnd = false;
    while (true) {
      let nextParentPath = findParent(parentPath);
      if (nextParentPath.node.type === 'MemberExpression') {
        parentPath = nextParentPath;
        const propName = parentPath.node.property.name;
        nextParentPath = findParent(parentPath);
        if (nextParentPath.node.type !== 'CallExpression') {
          // Allowing usage of imported reference in anything other
          // than direct invocation (eg. reassignment to some different variable etc.)
          // requires a lot of edge case handling - so we simply bail with an error
          throwSyntaxError(
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
          didEnd = true;
          debug('Finished processing:', nodePath.node);
          processed.add(nodePath.node);
          break;
        }
        if (args.length !== 1) {
          // A prop setter should receive exactly one argument
          throwSyntaxError(
            4,
            nextParentPath.node,
            `Expected ${propName} to be invoked with a single argument`
          );
        }
        // Ensure that the nodes that we are relocating
        // have already been processed.
        //
        // If this is not done then macro invocations nested inside
        // arguments will get left out in processing.
        for (let j = i + 1; j < references.default.length; j++) {
          if (references.default[j].findParent(p => p.node === args[0])) {
            transformReference(references.default[j], j);
            break;
          }
        }

        // Reassign because references may have been changed in AST
        args = nextParentPath.node.arguments;

        props.push({
          propName,
          value: args[0],
        });
        continue;
      } else {
        throwSyntaxError(
          5,
          parentPath.node,
          `Expected fluent-react builder chain to have been terminated with end`
        );
      }
    }
    if (!didEnd) {
      throwSyntaxError(
        6,
        parentPath.node,
        `Expected fluent-react builder chain to have been terminated with end`
      );
    }
  };

  debug('Identified references: ', references.default.length);
  for (let i = 0; i < references.default.length; i++) {
    const nodePath = references.default[i];
    debug('Processing reference', i, nodePath.node);
    if (processed.has(nodePath.node)) {
      debug('Skipping because already processed');
      continue;
    }
    transformReference(nodePath, i);
  }
};

module.exports = createMacro(R);
