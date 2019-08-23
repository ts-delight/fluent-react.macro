const { createMacro } = require('babel-plugin-macros');
const debug = require('debug')('fluent-react.macro');
const traverse = require('@babel/traverse').default;

const R = ({ references, state, babel }) => {
  const t = babel.types;
  const processed = new Set();

  let createElementNode;

  let identifiers = new Set();

  traverse(state.file.ast, {
    Identifier(path) {
      identifiers.add(path.node.name);
    },
  });

  const identifier = state.file.path.scope.generateUidIdentifier('React');

  state.file.path.node.body.unshift(
    t.ImportDeclaration(
      [t.importNamespaceSpecifier(identifier)],
      t.stringLiteral('react')
    )
  );

  createElementNode = t.memberExpression(
    identifier,
    t.identifier('createElement')
  );

  debug('Identified references: ', references.default.length);
  for (let i = 0; i < references.default.length; i++) {
    const nodePath = references.default[i];
    debug('Processing reference', i, nodePath.node);
    if (processed.has(nodePath.node)) {
      debug('Skipping because already processed');
      continue;
    }
    transformReference(
      nodePath,
      i,
      t,
      references,
      processed,
      createElementNode
    );
  }
};

module.exports = createMacro(R);

const findParent = nodePath => nodePath.findParent(() => true);

const transformBuilder = (parentPath, target, props, t, createElementNode) => {
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

const transformReference = (
  nodePath,
  i,
  t,
  references,
  processed,
  createElementNode
) => {
  let parentPath = findParent(nodePath);
  if (parentPath.node.type !== 'CallExpression') {
    throw new Error('Expected R to be called as a function');
  }
  const args = parentPath.node.arguments;
  if (args.length !== 1)
    throw new Error('Expected R to have been called with single argument');
  const target = args[0];
  const props = [];
  let didEnd = false;
  while (true) {
    let nextParentPath = findParent(parentPath);
    if (nextParentPath.node.type === 'MemberExpression') {
      parentPath = nextParentPath;
      const propName = parentPath.node.property.name;
      nextParentPath = findParent(parentPath);
      if (nextParentPath.node.type !== 'CallExpression') {
        throw new Error(`Expected ${propName} to be invoked as a function`);
      }
      let args = nextParentPath.node.arguments;
      parentPath = nextParentPath;
      if (propName === 'end' && args.length === 0) {
        transformBuilder(parentPath, target, props, t, createElementNode);
        didEnd = true;
        debug('Finished processing:', nodePath.node);
        processed.add(nodePath.node);
        break;
      }
      if (args.length !== 1) {
        throw new Error(
          `Expected ${propName} to be invoked with a single argument`
        );
      }
      for (let j = i + 1; j < references.default.length; j++) {
        if (references.default[j].findParent(p => p.node === args[0])) {
          transformReference(
            references.default[j],
            j,
            t,
            references,
            processed,
            createElementNode
          );
          break;
        }
      }
      args = nextParentPath.node.arguments;
      props.push({
        propName,
        value: args[0],
      });
      continue;
    } else {
      throw new Error(
        `Expected fluent-react builder chain to have been terminated with end`
      );
    }
  }
  if (!didEnd) {
    throw new Error(
      `Expected fluent-react builder chain to have been terminated with end`
    );
  }
};
