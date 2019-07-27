import * as React from 'react';
import { Link, withRouter } from 'react-router-dom';

interface Props {
  history: any;
  location: any;
  match: any;
}

interface State {}

class Hero extends React.Component<Props, State> {
  render() {
    return (
      <section className="hero is-fullheight is-bold ">
        <div className="hero-body">
          <div className="container">
            <div>
              <img
                src={require('../assets/7-2-technology-picture.png')}
                className="is-pulled-right"
              />
              <img src={require('../assets/7-2-technology-picture.png')} />
            </div>

            <div className="level has-text-centered">
              <p className="level-item">
                <span className="icon is-large fas fa-3x has-text-centered">
                  <i className="fab fa-github" />
                </span>
                <span className="icon is-large fas fa-3x has-text-centered">
                  <i className="fab fa-twitter" />
                </span>
                <span className="icon fas fa-3x has-text-centered">
                  <i className="fab fa-kaggle" />
                </span>
                <div className="vl" />
                <p className="description">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s.
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
                    <span>Getting started</span>
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
