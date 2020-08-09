import * as React from 'react';
import { withRouter } from 'react-router-dom';
import { Fade, Bounce } from 'react-reveal';
import HeroAnimation from './HeroAnimation';
import AnimatedIcon from './AnimatedIcon';

interface Props {
  history: any;
  location: any;
  match: any;
}

class Hero extends React.Component<Props> {
  render() {
    return (
      <section className="hero is-fullheight is-bold hero-home">
        <div className="hero-body">
          <div className="cols container">
            <div className="bg-circle"></div>
            <div className="sm-circle"></div>
            <div className="bg-open-circle"></div>
            <div className="sm-open-circle"></div>
            <div className="col is-12 is-6-md content">
              <Fade bottom>
                <div className="animation">
                  <HeroAnimation />
                </div>
                <div className="level">
                  <div className="level-item contact-info-icons">
                    <div className="links">
                      <AnimatedIcon link="" iconName="linkedin-in" />
                      <AnimatedIcon
                        className="orange-shadow"
                        link=""
                        iconName="github"
                      />
                      <AnimatedIcon
                        className="orange-border"
                        link=""
                        iconName="twitter"
                      />
                      <AnimatedIcon
                        className="orange-background"
                        link=""
                        iconName="kaggle"
                      />
                    </div>
                    <div className="vl" />
                  </div>

                  <div className="level-item description">
                    <p>
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been the industry.
                    </p>
                    <a
                      onClick={() => {
                        window.scrollTo({
                          top: 800,
                          behavior: 'smooth',
                        });
                      }}
                    >
                      <span>
                        <div className="wrapper">
                          <div className="circle-btn btn-2">
                            <span className="icon  explore">
                              <i className="fas fa-arrow-right" />
                            </span>
                            <span className="circle-bg">
                              <span>
                                <em />
                              </span>
                              <span>
                                <em />
                              </span>
                            </span>
                          </div>
                        </div>
                      </span>
                      <span className="link-text">Getting started</span>
                    </a>
                  </div>
                </div>
              </Fade>
            </div>
            <Bounce right>
              <div className="col is-12 is-6-md image-container">
                <img src={require('../assets/test-2.jpg')} />
              </div>
            </Bounce>
          </div>
        </div>
      </section>
    );
  }
}
export default withRouter(Hero);
