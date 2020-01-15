import * as React from 'react';
import { withRouter } from 'react-router-dom';
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
          <div className="container">
            <div className="bg-circle"></div>
            <div className="sm-circle"></div>
            <div className="bg-open-circle"></div>
            <div className="sm-open-circle"></div>
            <div className="level middle-content">
              <div className="level-item animation">
                <HeroAnimation />
              </div>
              <div className="level-item image">
                <img src={require('../assets/7-2-technology-picture.png')} />
              </div>
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

            <div className="hero-foot has-text-centered">
              <a
                onClick={() => {
                  window.scrollTo({
                    top: 800,
                    behavior: 'smooth',
                  });
                }}
              >
                <span className="icon has-text-white is-large bounce">
                  <i className="fas fa-chevron-down fa-2x"></i>
                </span>
              </a>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
export default withRouter(Hero);
