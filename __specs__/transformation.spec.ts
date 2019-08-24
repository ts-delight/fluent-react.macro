import * as path from 'path';
import { transformFileSync } from '@babel/core';

test('Transformations', () => {
  expect(transformFileSync(path.join(__dirname, '__fixtures__/index.ts'))!.code)
    .toMatchInlineSnapshot(`
    "\\"use strict\\";

    var _React = _interopRequireWildcard(require(\\"react\\"));

    function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

    const SampleFnComponent = () => _React.createElement('div', {
      \\"id\\": 'container',
      \\"className\\": 'profile-container'
    });

    const _sampleFnEl = _React.default.createElement(SampleFnComponent);

    class InnerClassComponent extends _React.default.Component {
      render() {
        return _React.createElement('div', {
          \\"id\\": 'container',
          \\"className\\": 'profile-container',
          \\"children\\": _React.createElement('div', {
            \\"id\\": 'inner-container',
            \\"children\\": this.props.name
          })
        });
      }

    }

    class OuterClassComponent extends _React.default.Component {
      render() {
        return _React.createElement(_React.default.Fragment, {
          \\"children\\": [_React.createElement(SampleFnComponent, {}), _React.createElement(InnerClassComponent, {
            \\"name\\": 'Paul'
          })]
        });
      }

    }

    const _sampleCEl = _React.default.createElement(OuterClassComponent);

    const SampleComponent1 = p => {
      return _React.createElement('div', {
        \\"children\\": p.children
      });
    };

    class SampleComponent extends _React.default.Component {
      render() {
        return _React.createElement(SampleComponent1, {
          \\"end\\": 'hello',
          \\"children\\": _React.createElement('div', {})
        });
      }

    }

    class ComponentWithImplicitChildren extends _React.default.Component {
      render() {
        return _React.createElement(SampleComponent1, {
          \\"end\\": 'hello',
          \\"children\\": [_React.createElement('div', {
            \\"id\\": 'bar'
          }), _React.createElement('div', {
            \\"className\\": 'foo'
          })]
        });
      }

    }"
  `);
});
