import * as React from 'react';
import Icon from './Icon';
import Search from './SearchForm';
import Paragraph from './Paragraph';
import Quote from './Quote';

interface State {
  addParagraph: boolean;
  addQuote: boolean;
  addImage: boolean;
  addVideo: boolean;
  addLink: boolean;
  addCode: boolean;
  elementIndex: number;
  blocks: any;
}

export default class AdminArticle extends React.Component<{}, State> {
  constructor(props) {
    super(props);
    this.state = {
      addParagraph: false,
      addQuote: false,
      addImage: false,
      addVideo: false,
      addLink: false,
      addCode: false,
      elementIndex: 0,
      blocks: [],
    };
  }

  addContent(block: any) {
    this.setState({
      blocks: [...this.state.blocks, block],
    });
  }

  removeContent = async (index: any) => {
    this.state.blocks.splice(index, 1);
    await this.setState({
      blocks: this.state.blocks,
    });
  };

  render() {
    return (
      <div className="col is-12 is-9-md main">
        <div className="container">
          <h2>Create New Article</h2>
          <div className="building-blocks box" v-if="!link.length">
            <label className="label">Building blocks</label>
            <div className="buttons">
              <button
                type="button"
                className="button is-default"
                onClick={async () => {
                  await this.addContent(
                    <Paragraph
                      index={this.state.elementIndex}
                      handleContentRemoval={this.removeContent}
                    />,
                  );
                  console.log('array size: ', this.state.blocks.length);
                  await this.setState({
                    elementIndex:
                      this.state.blocks.length === 1
                        ? 1
                        : this.state.blocks.length,
                  });
                  console.log('temp index: ', this.state.elementIndex);
                }}
              >
                <Icon iconName="paragraph" /> <span>Paragraph</span>
              </button>
              <button
                type="button"
                className="button is-default"
                onClick={async () => {
                  this.addContent(<Quote />);
                }}
              >
                <Icon iconName="quote-left" /> <span>Quote</span>
              </button>
              <button type="button" className="button is-default">
                <Icon iconName="image" /> <span>Image</span>
              </button>
              <button type="button" className="button is-default">
                <Icon iconName="code" /> <span>Code</span>
              </button>
              <button type="button" className="button is-default">
                <Icon iconName="video" /> <span>Video</span>
              </button>
              <button type="button" className="button is-default">
                <Icon iconName="link" /> <span>Link</span>
              </button>
            </div>
          </div>
          <div className="field">
            <label className="label">Title</label>
            <div className="control">
              <input type="text" name="title" className="input"></input>
            </div>
          </div>
          <div className="field featured_image">
            <label className="label">Featured Image</label>
            <button type="button" className="button is-default">
              <span>Add New</span> <Icon iconName="plus" />
            </button>
            <select
              className="select"
              name="featuredMedia"
              v-model="featuredMedia"
            >
              <option value="">Choose Existing</option>
            </select>
          </div>
          <div className="field">{this.state.blocks}</div>
        </div>
      </div>
    );
  }
}
