import * as React from 'react';
import { Helmet } from 'react-helmet';
import { Fade } from 'react-reveal';
import { observer } from 'mobx-react';
import Auth from '../../services/Auth';
import CategoryManager from '../../services/CategoryManager';
import Module from '../../models/Module';
import ModuleManager from '../../services/ModuleManager';
import Loader from '../../components/Loader';
import Breadcrumb from '../../components/Breadcrumb';
import SearchForm from '../../components/SearchForm';
import Icon from '../../components/Icon';
import Article from '../../components/Article';
import Footer from '../../components/Footer';
import Tag from '../../components/Tag';
import Title from '../../components/Title';
import Category from '../../models/Category';
import { Link } from 'react-router-dom';
const background = require('../../assets/article.svg');

interface Props {
  history: any;
}

const sectionStyle = {
  backgroundImage: `url(${background})`,
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'right',
  backgroundSize: 'contain',
};

interface State {
  isLoaded: boolean;
  modules: Module[][];
  categories: Category[];
}

/**
 * Articles archive
 */
@observer
export default class View extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      modules: [],
      categories: [],
    };
  }

  async componentDidMount() {
    if (!Auth.user) {
      return;
    }

    // Load content
    await CategoryManager.findAll();
    const modules = await Promise.all(
      CategoryManager.categories.map((category) =>
        ModuleManager.findByCategory(category, { limit: 4 }),
      ),
    );

    this.setState({
      modules,
      categories: CategoryManager.categories,
      isLoaded: true,
    });
  }

  render() {
    return (
      <>
        <Helmet title={'Sample article archive'} />
        <section className="hero archive">
          <Breadcrumb
            breadcrumbs={[
              {
                name: 'Home',
                link: '/',
              },
              {
                name: 'Articles',
                link: window.location.pathname,
              },
            ]}
            className="articles"
            backText="Return Home"
            handleBack={() => {
              this.props.history.push('/');
            }}
          />

          <Fade bottom>
            <div className="top-content">
              <div className="container articles" style={sectionStyle}>
                <Title
                  title="Find here what you're looking for"
                  color="white"
                  size="1"
                  hasMaxWidth={true}
                />
                <SearchForm
                  placeholder="Search articles"
                  handleSubmit={({ search }, setSubmitting) => {
                    setSubmitting(false);
                    if (search) {
                      this.props.history.push(`/modules?search=${search}`);
                    }
                  }}
                />
              </div>
            </div>
          </Fade>

          <Fade bottom>
            <div className="meta-category is-centered">
              <Icon iconName="tag" />
              {CategoryManager.categories.map((category) => {
                const categoryUrl = `/modules?category=${category.uuid}`;
                return <Tag tagName={category.name} link={categoryUrl} />;
              })}
            </div>
          </Fade>
        </section>
        <section className="is-fullheight is-primary content">
          <div className="container archive">
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
                      <Fade bottom>
                        <div className="level">
                          <div className="level-left">
                            <div className="level-item">
                              <Link to={categoryUrl}>
                                <h2 className="title is-4">{category.name}</h2>
                              </Link>
                            </div>
                          </div>
                          <div className="level-right">
                            <div className="level-item">
                              <Link to={categoryUrl} className="button is-text">
                                <span>View more</span>
                                <Icon iconName="arrow-right" />
                              </Link>
                            </div>
                          </div>
                        </div>
                        <div className="columns is-multiline is-mobile">
                          {modules.slice(0, 4).map((module) => (
                            <Article
                              key={module.uuid}
                              title={module.title}
                              author={module.createdBy}
                              date={module.createdAt.fromNow()}
                              module={module}
                            />
                          ))}
                        </div>
                        <br />
                      </Fade>
                    </>
                  );
                })}
              </>
            )}
          </div>
        </section>
        <Footer />
      </>
    );
  }
}
