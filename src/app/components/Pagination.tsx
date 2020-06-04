import * as React from 'react';
import Icon from './Icon';

interface Props {
  page: number;
  hasNextPage: boolean;
  handlePaginate: (newPage: number) => void;
  isLoading?: boolean;
}

export default class Pagination extends React.Component<Props> {
  render() {
    return (
      <div className="level is-mobile" style={{ width: '100%' }}>
        <div className="level-left">
          {this.props.page > 1 && (
            <div className="level-item">
              <button
                className="button is-dark"
                disabled={this.props.isLoading}
                onClick={() => {
                  this.props.handlePaginate(this.props.page - 1);
                  window.scroll({ top: 0, left: 0, behavior: 'smooth' });
                }}
              >
                <Icon iconName="arrow-left" />
                <span>Previous</span>
              </button>
            </div>
          )}
        </div>
        {this.props.hasNextPage && (
          <div className="level-right">
            <div className="level-item">
              <button
                className="button is-dark"
                disabled={this.props.isLoading}
                onClick={() => {
                  this.props.handlePaginate(this.props.page + 1);
                  window.scroll({ top: 0, left: 0, behavior: 'smooth' });
                }}
              >
                <span>Next</span>
                <Icon iconName="arrow-right" />
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
}
