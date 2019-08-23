import React from 'react';
import R, { PropBuilder } from '../../fluent-react.macro';

const SampleFnComponent = () =>
  R('div')
    .id('container')
    .className('profile-container')
    .end();

const _sampleFnEl = React.createElement(SampleFnComponent);

class InnerClassComponent extends React.Component<{ name: string }> {
  render() {
    return R('div')
      .id('container')
      .className('profile-container')
      .children(
        R('div')
          .id('inner-container')
          .children(this.props.name)
          .end()
      )
      .end();
  }
}

class OuterClassComponent extends React.Component {
  render() {
    return R(React.Fragment)
      .children([
        R(SampleFnComponent).end(),
        R(InnerClassComponent)
          .name('Paul')
          .end(),
      ])
      .end();
  }
}

const _sampleCEl = React.createElement(OuterClassComponent);

interface SampleProps {
  end?: string;
  children: any;
}

const SampleComponent1 = (p: SampleProps) => {
  return R('div')
    .children(p.children)
    .end();
};

class SampleComponent extends React.Component<SampleProps> {
  render() {
    return R(SampleComponent1)
      .end('hello')
      .children(R('div').end())
      .end();
  }
}
