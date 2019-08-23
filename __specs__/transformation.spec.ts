import * as path from 'path';
import { transformFileSync } from '@babel/core';

test('Transformations', () => {
  expect(transformFileSync(path.join(__dirname, '__fixtures__/index.ts'))!.code)
    .toMatchInlineSnapshot(`
    "\\"use strict\\";

    var _react = _interopRequireDefault(require(\\"react\\"));

    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

    const SampleFnComponent = () => createElement('div', {
      \\"id\\": 'container',
      \\"className\\": 'profile-container'
    });

    const _sampleFnEl = _react.default.createElement(SampleFnComponent);

    class InnerClassComponent extends _react.default.Component {
      render() {
        return createElement('div', {
          \\"id\\": 'container',
          \\"className\\": 'profile-container',
          \\"children\\": createElement('div', {
            \\"id\\": 'inner-container',
            \\"children\\": this.props.name
          })
        });
      }

    }

    class OuterClassComponent extends _react.default.Component {
      render() {
        return createElement(_react.default.Fragment, {
          \\"children\\": [createElement(SampleFnComponent, {}), createElement(InnerClassComponent, {
            \\"name\\": 'Paul'
          })]
        });
      }

    }

    const _sampleCEl = _react.default.createElement(OuterClassComponent);

    const SampleComponent1 = p => {
      return createElement('div', {
        \\"children\\": p.children
      });
    };

    class SampleComponent extends _react.default.Component {
      render() {
        return createElement(SampleComponent1, {
          \\"end\\": 'hello',
          \\"children\\": createElement('div', {})
        });
      }

    }"
  `);
});
