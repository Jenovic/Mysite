import * as React from 'react';
import { Helmet } from 'react-helmet';
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
      console.log('called');
      return;
    }
    console.log('called 2');
    // Load content
    await CategoryManager.findAll();
    console.log(CategoryManager.categories);
    const modules = await Promise.all(
      CategoryManager.categories.map((category) =>
        ModuleManager.findByCategory(category, { limit: 4 }),
      ),
    );
    console.log(modules);
    this.setState({
      modules,
      categories: CategoryManager.categories,
      isLoaded: true,
    });
    console.log('called 3');
  }

  render() {
    console.log(CategoryManager.categories);
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
                link: '/articles',
              },
            ]}
            className="articles"
            backText="Return Home"
            handleBack={() => {
              this.props.history.push('/');
            }}
          />

          <div className="top-content">
            <div className="container" style={sectionStyle}>
              <Title
                title="Find here what you're looking for"
                color="white"
                size="1"
                hasMaxWidth={true}
              />
              {/* <SearchForm color="white" /> */}
            </div>
          </div>

          <div className="meta-category is-centered">
            <Tag tagName="#" />
            {CategoryManager.categories.map((category, index) => {
              <>
                <p>{category.name}</p>
                <Tag tagName={category.name} />;
              </>;
            })}
          </div>
        </section>
        <section className="is-fullheight is-primary content">
          <div className="container archive">
            <div className="cols is-centered is-multiline articles">
              <Article
                category="article_card data"
                title="The title"
                author="Sanil Purryag"
                date="18 Aug 2019"
              ></Article>
              <Article
                category="article_card research"
                title="The title"
                author="Sanil Purryag"
                date="18 Aug 2019"
              ></Article>
              <Article
                category="article_card analysis"
                title="The title"
                author="Sanil Purryag"
                date="18 Aug 2019"
              ></Article>
              <Article
                category="article_card data"
                title="The title"
                author="Sanil Purryag"
                date="18 Aug 2019"
              ></Article>
              <Article
                category="article_card analysis"
                title="The title"
                author="Sanil Purryag"
                date="18 Aug 2019"
              ></Article>
              <Article
                category="article_card data"
                title="The title"
                author="Sanil Purryag"
                date="18 Aug 2019"
              ></Article>
              <Article
                category="article_card research"
                title="The title"
                author="Sanil Purryag"
                date="18 Aug 2019"
              ></Article>
              <Article
                category="article_card research"
                title="The title"
                author="Sanil Purryag"
                date="18 Aug 2019"
              ></Article>
            </div>
          </div>
        </section>
        <Footer />
      </>
    );
  }
}
