import * as React from 'react';
import Quote from './Quote';

export default class CallToAction extends React.Component {
  render() {
    return (
      <section className="cta">
        <div className="container">
          <div className="cols">
            <div className="col is-12 is-6-md">
              <img src={require('../assets/cta-anime.gif')} />
            </div>
            <div className="col is-12 is-6-md cta-quote">
              <Quote text="The best way to predict the future is to to create it." />
            </div>
          </div>
        </div>
      </section>
    );
  }
}
