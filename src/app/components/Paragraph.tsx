import * as React from 'react';

interface Props {
  handleContentRemoval?: (index: any) => void;
  index?: number;
}

interface State {
  hideContent: boolean;
}

export default class Paragraph extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      hideContent: false,
    };
  }
  render() {
    console.log('index: ', this.props.index);
    return (
      <>
        {/* {!this.state.hideContent && ( */}
        <div v-if="articleContent.type === 'PARAGRAPH'">
          <button
            type="button"
            className="delete is-pulled-right"
            onClick={async () => {
              // await this.setState({ hideContent: true });
              this.props.handleContentRemoval(this.props.index);
            }}
          ></button>
          <label className="label">Paragraph</label>
          <div className="control">
            <input type="hidden" name="content[]" value="PARAGRAPH"></input>
            <textarea
              name="content[]"
              v-model="articleContent.content"
              className="textarea"
            ></textarea>
          </div>
        </div>
        {/* )} */}
      </>
    );
  }
}
