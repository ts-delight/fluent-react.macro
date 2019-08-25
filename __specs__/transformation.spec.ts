import * as path from "path";
import { transformFileSync } from "@babel/core";

test("Transformations", () => {
  expect(transformFileSync(path.join(__dirname, "__fixtures__/index.ts"))!.code)
    .toMatchInlineSnapshot(`
    "\\"use strict\\";

    var _React = _interopRequireWildcard(require(\\"react\\"));

    function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

    // Usage of DOM Helpers: 
    const C1 = () => _React.createElement(\\"div\\", {
      \\"className\\": 'hello',
      \\"__source\\": {
        fileName: \\"__specs__/__fixtures__/index.ts\\",
        lineNumber: 6
      }
    }); // Nesting with helpers: 


    const C2 = () => _React.createElement(\\"div\\", {
      \\"id\\": 'outer',
      \\"children\\": _React.createElement(\\"div\\", {
        \\"id\\": 'inner',
        \\"__source\\": {
          fileName: \\"__specs__/__fixtures__/index.ts\\",
          lineNumber: 11
        }
      }),
      \\"__source\\": {
        fileName: \\"__specs__/__fixtures__/index.ts\\",
        lineNumber: 10
      }
    }); // Nesting with multiple children:


    const C3 = () => _React.createElement(\\"div\\", {
      \\"id\\": 'outer',
      \\"children\\": [_React.createElement(\\"div\\", {
        \\"id\\": 'inner-1',
        \\"__source\\": {
          fileName: \\"__specs__/__fixtures__/index.ts\\",
          lineNumber: 17
        }
      }), _React.createElement(\\"div\\", {
        \\"id\\": 'inner-2',
        \\"__source\\": {
          fileName: \\"__specs__/__fixtures__/index.ts\\",
          lineNumber: 18
        }
      })],
      \\"__source\\": {
        fileName: \\"__specs__/__fixtures__/index.ts\\",
        lineNumber: 16
      }
    }); // Nesting without terminating invocation:


    const C4 = () => _React.createElement(\\"div\\", {
      \\"id\\": 'outer',
      \\"children\\": [_React.createElement(\\"div\\", {
        \\"id\\": 'inner-1',
        \\"__source\\": {
          fileName: \\"__specs__/__fixtures__/index.ts\\",
          lineNumber: 24
        }
      }), _React.createElement(\\"div\\", {
        \\"id\\": 'inner-2',
        \\"__source\\": {
          fileName: \\"__specs__/__fixtures__/index.ts\\",
          lineNumber: 25
        }
      })],
      \\"__source\\": {
        fileName: \\"__specs__/__fixtures__/index.ts\\",
        lineNumber: 23
      }
    }); // Usage of other function components:


    const C5 = () => _React.createElement(C1, {
      \\"__source\\": {
        fileName: \\"__specs__/__fixtures__/index.ts\\",
        lineNumber: 30
      }
    }); // Function components with props:


    const C6 = props => _React.createElement(\\"div\\", {
      \\"id\\": props.id,
      \\"children\\": _React.createElement(\\"div\\", {
        \\"children\\": props.user.name,
        \\"__source\\": {
          fileName: \\"__specs__/__fixtures__/index.ts\\",
          lineNumber: 41
        }
      }),
      \\"__source\\": {
        fileName: \\"__specs__/__fixtures__/index.ts\\",
        lineNumber: 40
      }
    }); // DOM Nodes without helpers:


    const C7 = props => _React.createElement(\\"div\\", {
      \\"id\\": props.id,
      \\"children\\": _React.createElement(\\"div\\", {
        \\"children\\": props.user.name,
        \\"__source\\": {
          fileName: \\"__specs__/__fixtures__/index.ts\\",
          lineNumber: 47
        }
      }),
      \\"__source\\": {
        fileName: \\"__specs__/__fixtures__/index.ts\\",
        lineNumber: 46
      }
    }); // Class components:


    class C8 extends _React.default.Component {
      render() {
        return _React.createElement(\\"div\\", {
          \\"children\\": \\"Hello\\",
          \\"__source\\": {
            fileName: \\"__specs__/__fixtures__/index.ts\\",
            lineNumber: 53
          }
        });
      }

    } // Class components with arrow functions:


    class C9 extends _React.default.Component {
      render = () => _React.createElement(\\"div\\", {
        \\"children\\": \\"Hello\\",
        \\"__source\\": {
          fileName: \\"__specs__/__fixtures__/index.ts\\",
          lineNumber: 59
        }
      });
    } // Class components with props and nesting:


    class C10 extends _React.default.Component {
      render() {
        return _React.createElement(\\"div\\", { ...{
            id: this.props.id
          },
          \\"children\\": _React.createElement(\\"div\\", {
            \\"children\\": this.props.user.name,
            \\"__source\\": {
              fileName: \\"__specs__/__fixtures__/index.ts\\",
              lineNumber: 66
            }
          }),
          \\"__source\\": {
            fileName: \\"__specs__/__fixtures__/index.ts\\",
            lineNumber: 65
          }
        });
      }

    } // Composition in class components:


    class C11 extends _React.default.Component {
      render() {
        return _React.createElement(\\"div\\", { ...{
            id: this.props.id
          },
          \\"children\\": [_React.createElement(\\"div\\", {
            \\"children\\": \\"container-1\\",
            \\"__source\\": {
              fileName: \\"__specs__/__fixtures__/index.ts\\",
              lineNumber: 75
            }
          }), _React.createElement(C10, { ...{
              id: this.props.id,
              user: {
                name: 'lorefnon'
              }
            },
            \\"__source\\": {
              fileName: \\"__specs__/__fixtures__/index.ts\\",
              lineNumber: 76
            }
          }), _React.createElement(\\"div\\", {
            \\"children\\": \\"container-2\\",
            \\"__source\\": {
              fileName: \\"__specs__/__fixtures__/index.ts\\",
              lineNumber: 77
            }
          })],
          \\"__source\\": {
            fileName: \\"__specs__/__fixtures__/index.ts\\",
            lineNumber: 74
          }
        });
      }

    } // Render props and hooks:


    const C12 = p => {
      const [count, setCount] = _React.default.useState(0);

      return _React.createElement(\\"a\\", { ...{
          id: p.id,
          onClick: e => setCount(count + 1)
        },
        \\"children\\": p.render(count),
        \\"__source\\": {
          fileName: \\"__specs__/__fixtures__/index.ts\\",
          lineNumber: 89
        }
      });
    }; // Nesting inside arrays and fragments:


    const C13 = () => _React.createElement(_React.default.Fragment, {
      \\"children\\": [_React.createElement(\\"div\\", {
        \\"children\\": [_React.createElement(\\"div\\", {
          \\"children\\": \\"a\\",
          \\"__source\\": {
            fileName: \\"__specs__/__fixtures__/index.ts\\",
            lineNumber: 98
          }
        }), [null, undefined, _React.createElement(\\"div\\", {
          \\"children\\": [_React.createElement(\\"div\\", {
            \\"children\\": \\"b\\",
            \\"__source\\": {
              fileName: \\"__specs__/__fixtures__/index.ts\\",
              lineNumber: 103
            }
          }), _React.createElement(\\"div\\", {
            \\"children\\": \\"c\\",
            \\"__source\\": {
              fileName: \\"__specs__/__fixtures__/index.ts\\",
              lineNumber: 104
            }
          })],
          \\"__source\\": {
            fileName: \\"__specs__/__fixtures__/index.ts\\",
            lineNumber: 102
          }
        })]],
        \\"__source\\": {
          fileName: \\"__specs__/__fixtures__/index.ts\\",
          lineNumber: 97
        }
      }), _React.createElement(\\"div\\", {
        \\"children\\": [1, 2, 3].map(i => _React.createElement(\\"div\\", {
          \\"children\\": i,
          \\"__source\\": {
            fileName: \\"__specs__/__fixtures__/index.ts\\",
            lineNumber: 109
          }
        })),
        \\"__source\\": {
          fileName: \\"__specs__/__fixtures__/index.ts\\",
          lineNumber: 108
        }
      })],
      \\"__source\\": {
        fileName: \\"__specs__/__fixtures__/index.ts\\",
        lineNumber: 96
      }
    });"
  `);
});
