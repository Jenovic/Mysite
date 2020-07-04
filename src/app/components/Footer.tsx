import * as React from 'react';

export default class Footer extends React.Component {
  render() {
    return (
      <section className="footer has-text-grey">
        <div className="container flex">
          <div className="navbar-start">
            <a className="navbar-item" href="/">
              Home
            </a>
            <a className="navbar-item" href="#">
              About
            </a>
            <a className="navbar-item" href="/articles">
              Articles
            </a>
            <a className="navbar-item" href="#">
              Contact us
            </a>
            <span className="flex align-center legal">
              <p>@ OutData 2020 </p>
              <a className="navbar-item" href="#">
                Terms & Conditions
              </a>
              <span>|</span>
              <a className="navbar-item" href="#">
                Privacy Policy
              </a>
            </span>
          </div>
          <div className="navbar-end">
            <div className="navbar-item">
              <div className="buttons">
                <a className="button">Subscribe</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
