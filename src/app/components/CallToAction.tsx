import * as React from 'react';
import Title from './Title';
import Icon from './Icon';

export default class CallToAction extends React.Component {
  render() {
    return (
      <section className="cta">
        <div className="container">
          <div className="cols bg-white">
            <div className="col is-12 is-6-md">
              <img src={require('../assets/cta-anime.gif')} />
            </div>
            <div className="col is-12 is-6-md cta-content">
              <Title title="The best way to predict the future is to to create it." />
              <div className="cta-content__button">
                <button
                  type="submit"
                  className="button is-dark"
                  disabled={false}
                >
                  <span>Read More</span>
                  <Icon iconName="arrow-right" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
