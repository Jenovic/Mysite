import * as React from 'react';
import { Link, withRouter } from 'react-router-dom';

interface Props {
  history: any;
  location: any;
  match: any;
}

class Hero extends React.Component<Props> {
  render() {
    return (
      <section className="hero is-fullheight is-bold ">
        <div className="hero-body">
          <div className="container">
            <div className="bg-circle"></div>
            <div className="sm-circle"></div>
            <div className="bg-open-circle"></div>
            <div className="sm-open-circle"></div>
            <div className="middle-content">
              <h1>A Place to showcase Projects.</h1>
              <img
                src={require('../assets/7-2-technology-picture.png')}
                className="is-pulled-right"
              />
            </div>

            <div className="level has-text-centered">
              <p className="level-item">
                <div id="contact-info">
                  <div className="links">
                    <a href="">
                      <div>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span className="icon is-large fas fa-3x has-text-centered">
                          <i className="fab fa-linkedin-in"></i>
                        </span>
                      </div>
                    </a>
                    <a href="" className="orange-shadow">
                      <div>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span className="icon is-large fas fa-3x has-text-centered">
                          <i className="fab fa-github" />
                        </span>
                      </div>
                    </a>
                    <a href="" className="orange-border">
                      <div>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span className="icon is-large fas fa-3x has-text-centered">
                          <i className="fab fa-twitter" />
                        </span>
                      </div>
                    </a>
                    <a href="" className="orange-background">
                      <div>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span className="icon fas fa-3x has-text-centered">
                          <i className="fab fa-kaggle" />
                        </span>
                      </div>
                    </a>
                  </div>
                </div>
                <div className="vl" />
                <p className="description">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry.
                  <br />
                  <a href="">
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
                </p>
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
export default withRouter(Hero);
