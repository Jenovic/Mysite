import * as React from 'react';
import { findIndex } from 'lodash';
import ModuleManager from '../services/ModuleManager';
import Slide from '../models/Slide';
import Module from '../models/Module';

import Card from './Card';
import Icon from './Icon';
import SlideForm from './SlideForm';
import Modal from './Modal';

interface Props {
  isActive: boolean;
  module: Module;
  slide: Slide;
  handleUpdate: Function;
  handleDelete: Function;
  handleError: Function;
}

interface State {
  isRemoving: boolean;
}

export default class SlideControl extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      isRemoving: false,
    };
  }

  render() {
    if (!this.props.slide) {
      return null;
    }

    return (
      <>
        <Card key={this.props.slide.uuid}>
          {this.props.isActive && (
            <div className="columns is-vcentered is-mobile">
              <div className="column is-8">
                <h2 className="title is-4">{this.props.slide.title}</h2>
              </div>
              <div className="column is-4">
                <div className="buttons is-right">
                  <button
                    className="button"
                    onClick={() => {
                      this.setState({ isRemoving: true });
                    }}
                  >
                    <Icon iconName="times" />
                    <span>Remove</span>
                  </button>
                </div>
              </div>
            </div>
          )}
          {this.props.isActive ? (
            <SlideForm
              module={this.props.module}
              slide={this.props.slide}
              buttonText="Save"
              handleSubmit={async ({ title, content }, setSubmitting) => {
                try {
                  const slides = this.props.module.slides;

                  // Update locally
                  const index = findIndex(slides, {
                    uuid: this.props.slide.uuid,
                  });
                  slides[index].title = title;
                  slides[index].content = content;

                  // Sync changes with server
                  const module = await ModuleManager.setSlides(
                    this.props.module,
                    slides,
                  );
                  setSubmitting(false);
                  this.props.handleUpdate(slides[index], module);
                } catch (e) {
                  setSubmitting(false);
                  if (e.response) {
                    this.props.handleError(e.response.data);
                  }
                }
              }}
            />
          ) : (
            <>
              <h1 className="title">{this.props.slide.title}</h1>
              <div
                className="content"
                dangerouslySetInnerHTML={{ __html: this.props.slide.content }}
              />
            </>
          )}
        </Card>

        {/* Remove Slide */}
        <Modal
          isActive={this.state.isRemoving}
          handleClose={async (status) => {
            try {
              if (status === 1) {
                await ModuleManager.removeSlide(
                  this.props.module,
                  this.props.slide,
                );
                this.props.handleDelete();
                this.setState({ isRemoving: false });
                return;
              }
              this.setState({ isRemoving: false });
            } catch (e) {
              if (e.response) {
                this.setState({ isRemoving: false });
                this.props.handleError(e.response.data);
              }
            }
          }}
          confirmText="Remove"
        >
          <div className="content">
            <h2>Remove Slide</h2>
            {this.props.slide && (
              <p>
                Are you sure you want to remove{' '}
                <strong>{this.props.slide.title}</strong>?
              </p>
            )}
          </div>
        </Modal>
      </>
    );
  }
}
