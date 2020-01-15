import * as React from 'react';
import { Link, withRouter } from 'react-router-dom';
import Typed from 'react-typed';

export default class HeroAnimation extends React.Component<{}> {
  render() {
    return (
      <div className="hero-anime">
        <Typed strings={['A place to showcase projects.']} typeSpeed={50} />
        <br />
      </div>
    );
  }
}
