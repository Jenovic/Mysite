import * as React from 'react';
import { Helmet } from 'react-helmet';
import { observer } from 'mobx-react';
import Hero from '../components/Hero';
import Footer from '../components/Footer';
import Article from '../components/Article';
import Tag from '../components/Tag';
import Title from '../components/Title';
import SearchForm from '../components/SearchForm';
import CategoryManager from '../services/CategoryManager';
import Module from '../models/Module';
import ModuleManager from '../services/ModuleManager';
import Loader from '../components/Loader';
import Icon from '../components/Icon';
import CallToAction from '../components/CallToAction';

interface Props {
  history: any;
}

interface State {
  isLoaded: boolean;
  modules: Module[];
}

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
    const categories = await CategoryManager.findAll();
    console.log(categories);
    const modules = await ModuleManager.findAll();
    console.log(modules);
    this.setState({ modules, isLoaded: true });
    console.log('called 3');
  }

  render() {
    return (
      <>
        <Helmet title="Home" />
        <Hero />
        <section className="is-fullheight is-primary content">
          <div className="container archive">
            <div className="level">
              <Title title="Latest articles and news" size="1" color="blue" />
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

            {!this.state.isLoaded ? (
              <Loader />
            ) : (
              <>
                <div className="meta-category is-centered">
                  <Icon iconName="tag" />
                  {CategoryManager.categories.map((category) => {
                    const categoryUrl = `/modules?category=${category.uuid}`;
                    return <Tag tagName={category.name} link={categoryUrl} />;
                  })}
                </div>
                <div className="cols is-centered is-multiline articles">
                  {this.state.modules.map((module, index) => {
                    return (
                      <Article
                        key={module.uuid}
                        title={module.title}
                        author="Sanil Purryag"
                        date="1d"
                      />
                    );
                  })}
                </div>
              </>
            )}
          </div>
        </section>
        <CallToAction />
        <Footer />
      </>
    );
  }
}
