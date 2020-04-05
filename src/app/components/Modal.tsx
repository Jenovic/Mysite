import * as React from 'react';

interface Props {
  children: any;
  isActive: boolean;
  handleClose: (status: 0 | 1 | 2) => void;
  hasControls: boolean;
  canDismiss: boolean;
  hasDismiss: boolean;
  confirmText: string;
  cancelText: string;
}

export default class Modal extends React.Component<Props> {
  static defaultProps = {
    hasControls: true,
    canDismiss: true,
    hasDismiss: false,
    confirmText: 'Confirm',
    cancelText: 'Cancel',
  };

  render() {
    if (!this.props.isActive) {
      return null;
    }
    return (
      <div className="modal is-active">
        <div className="modal-background" />
        <div className="modal-content">
          <div className="card">
            <div className="card-content">
              {this.props.children}
              {this.props.hasControls && (
                <div className="buttons is-right">
                  <a
                    className="button"
                    onClick={() => {
                      this.props.handleClose(2);
                    }}
                  >
                    {this.props.cancelText}
                  </a>
                  <a
                    className="button is-success"
                    onClick={() => {
                      this.props.handleClose(1);
                    }}
                  >
                    {this.props.confirmText}
                  </a>
                </div>
              )}
              {this.props.canDismiss && this.props.hasDismiss && (
                <div className="buttons is-right">
                  <a
                    className="button"
                    onClick={() => {
                      this.props.handleClose(0);
                    }}
                  >
                    {this.props.confirmText}
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
        {this.props.canDismiss && (
          <button
            onClick={() => {
              this.props.handleClose(0);
            }}
            className="modal-close is-large"
            aria-label="close"
          />
        )}
      </div>
    );
  }
}
