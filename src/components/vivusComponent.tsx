import * as React from 'react';
import ReactVivus from 'react-vivus';
import svg from '../assets/article.svg';

export default class VivusComponent extends React.Component<{}> {
  render() {
    return (
      <ReactVivus
    id="foo"
    option={{
      file: svg,
      animTimingFunction: 'EASE',
      type: 'oneByOne',
      onReady: console.log
    }}
    style={{ height: '100px', width: '100px' }}
    callback={console.log}
  />
    );
  }
}