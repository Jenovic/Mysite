import * as React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react';
import { find } from 'lodash';
import Auth from '../services/Auth';
import CategoryManager from '../services/CategoryManager';
import Module from '../models/Module';
import Section from '../components/Section';
import Icon from '../components/Icon';
import ModuleItem from '../components/ModuleItem';
import SearchForm from '../components/SearchForm';
import Card from '../components/Card';
import ModuleManager from '../services/ModuleManager';
import Loader from '../components/Loader';
import Hero from '../components/Hero';
import Footer from '../components/Footer';
import Article from '../components/Article';
import Tag from '../components/Tag';
import Title from '../components/Title';

interface Props {
  history: any;
}

interface State {
  isLoaded: boolean;
  modules: Module[][];
}

/**
 * Homepage for logged in users
 */
@observer
export default class View extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      modules: [],
    };
  }

  async componentDidMount() {
    if (!Auth.user) {
      console.log('called');
      return;
    }
    console.log('called 2');
    // Load content
    const categories = await CategoryManager.findAll();
    console.log(categories);
    const modules = await Promise.all(
      categories.map((category) =>
        ModuleManager.findByCategory(category, { limit: 4 }),
      ),
    );
    console.log(modules);
    this.setState({ modules, isLoaded: true });
    console.log('called 3');
  }

  render() {
    console.log(this.state.isLoaded);
    return (
      <>
        <Helmet title="Home" />
        <Hero />
        <section>
          <div className="level">
            <Title title="Latest articles and news" size="1" color="blue" />
          </div>
          <Card className="is-min-height">
            <div className="columns is-centered">
              <div className="column is-10-desktop is-12-tablet">
                {/* Search */}
                <div className="columns">
                  <div className="column is-9-desktop is-7-tablet">
                    <h1 className="title is-3">Welcome, {Auth.user.name}</h1>
                  </div>
                  <div className="column is-3-desktop is-5-tablet">
                    <SearchForm
                      placeholder="Search modules"
                      handleSubmit={({ search }, setSubmitting) => {
                        setSubmitting(false);
                        if (search) {
                          this.props.history.push(`/modules?search=${search}`);
                        }
                      }}
                    />
                  </div>
                </div>

                {/* Mandatory Modules */}

                {!this.state.isLoaded ? (
                  <Loader />
                ) : (
                  <>
                    {/* Category Preview */}
                    {CategoryManager.categories.map((category, index) => {
                      const categoryUrl = `/modules?category=${category.uuid}`;
                      const modules = this.state.modules[index];
                      if (modules.length === 0) {
                        return null;
                      }

                      return (
                        <>
                          <Tag tagName={category.name} />
                          <>
                            <br />
                            <div className="level">
                              <div className="level-left">
                                <div className="level-item">
                                  <Link to={categoryUrl}>
                                    <h2 className="title is-4">
                                      {category.name}
                                    </h2>
                                  </Link>
                                </div>
                              </div>
                              <div className="level-right">
                                <div className="level-item">
                                  <Link
                                    to={categoryUrl}
                                    className="button is-text"
                                  >
                                    <span>View all</span>
                                    <Icon iconName="arrow-right" />
                                  </Link>
                                </div>
                              </div>
                            </div>
                            <div className="columns is-multiline is-mobile">
                              {modules.slice(0, 4).map((module) => (
                                <div
                                  key={module.uuid}
                                  className="column is-3-desktop is-4-tablet is-6-mobile"
                                >
                                  <ModuleItem module={module} />
                                </div>
                              ))}
                            </div>
                          </>
                        </>
                      );
                    })}
                  </>
                )}
              </div>
            </div>
          </Card>
        </section>
        <Footer />
      </>
    );
  }
}
