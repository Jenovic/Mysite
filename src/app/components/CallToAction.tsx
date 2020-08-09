import * as React from 'react';
import { Fade } from 'react-reveal';
import Title from './Title';
import Icon from './Icon';

export default class CallToAction extends React.Component {
  render() {
    return (
      <Fade bottom>
        <section className="cta">
          <div className="container">
            <div className="cols bg-white">
              <div className="col is-12 is-6-md">
                <Fade bottom>
                  <img src={require('../assets/cta-anime.gif')} />
                </Fade>
              </div>
              <div className="col is-12 is-6-md cta-content">
                <Fade bottom>
                  <Title
                    title="The best way to create the future is to predict it."
                    size="5"
                  />
                  <div className="cta-content__button">
                    <a href="#" className="button is-dark">
                      <span>Read More</span>
                      <Icon iconName="arrow-right" />
                    </a>
                  </div>
                </Fade>
              </div>
            </div>
          </div>
        </section>
      </Fade>
    );
  }
}
