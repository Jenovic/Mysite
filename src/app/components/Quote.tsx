import * as React from 'react';

export default class Quote extends React.Component {
  render() {
    return (
      <div v-if="articleContent.type === 'QUOTE'">
        <button type="button" className="delete is-pulled-right"></button>
        <label className="label">Quote</label>

        <div className="control">
          <input type="hidden" name="content[]" value="QUOTE"></input>
          <textarea
            name="content[]"
            v-model="articleContent.content"
            className="textarea"
          ></textarea>
        </div>
      </div>
    );
  }
}
