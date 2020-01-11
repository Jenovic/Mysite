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
      <div className="level-item">
        <form>
          <label className={`title is-3 has-text-${this.props.color}`}>
            {this.props.label}:
          </label>
          <input type="text" placeholder="search..." />
        </form>
      </div>
    );
  }
}
