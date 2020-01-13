import * as React from 'react';

interface Props {
  label: string;
  color: string;
}

export default class SearchForm extends React.Component<Props> {
  static defaultProps = {
    label: 'Search',
    color: 'black',
  };
  render() {
    return (
      <div className="level-item search">
        <form>
          <div className="field">
            <label className={`title is-4 has-text-${this.props.color}`}>
              {this.props.label}:
            </label>
            <input id="search" name="search" type="text" value="" />
          </div>
        </form>
      </div>
    );
  }
}
