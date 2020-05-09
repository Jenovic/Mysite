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
      <form>
        <div className="field">
          <input id="search" name="search" type="text" value="" />
        </div>
      </form>
    );
  }
}
