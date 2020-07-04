import * as React from 'react';
import { Helmet } from 'react-helmet';
import { observer } from 'mobx-react';
import { Redirect } from 'react-router';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Module from '../../models/Module';
import Slide from '../../models/Slide';
import AdminAuth from '../../services/Auth';
import ModuleManager from '../../services/ModuleManager';
import CategoryManager from '../../services/CategoryManager';
import Section from '../../components/Section';
import Card from '../../components/Card';
import Icon from '../../components/Icon';
import Notification from '../../components/Notification';
import Modal from '../../components/Modal';
import Errors from '../../components/Errors';
import NameForm from '../../components/NameForm';
import ModuleForm from '../../components/ModuleForm';
import SlideControl from '../../components/SlideControl';
import UploadForm from '../../components/UploadForm';
import Tooltip from '../../components/Tooltip';
import Breadcrumb from '../../components/Breadcrumb';

interface Props {
  match: {
    params: {
      uuid: string;
    };
  };
  history: any;
}

interface State {
  module: Module;
  slide: Slide;
  didSave: boolean;
  isEditing: boolean;
  isEditingThumbnail: boolean;
  isRemoving: boolean;
  isAddingCategory: boolean;
  isAddingSlide: boolean;
  isThumbnailActive: boolean;
  isSlidesActive: boolean;
  uploadProgress: number;
  errors: [];
}

@observer
export default class View extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      module: null,
      slide: null,
      didSave: false,
      isEditing: false,
      isEditingThumbnail: false,
      isRemoving: false,
      isAddingCategory: false,
      isAddingSlide: false,
      isThumbnailActive: true,
      isSlidesActive: true,
      uploadProgress: 0,
      errors: [],
    };
    this.handleReorder = this.handleReorder.bind(this);
  }

  async componentDidMount() {
    const module = await ModuleManager.find(this.props.match.params.uuid);
    if (CategoryManager.categories.length === 0) {
      await CategoryManager.findAll();
    }
    this.setState({
      module,
      slide: module.slides.length ? module.slides[0] : null,
    });
  }

  /**
   * Handle re-ordering of slides
   */
  async handleReorder(result) {
    const slides = this.state.module.slides;

    // Ignore if dropped outside or not editable
    if (!result.destination || !this.state.module.isEditable()) {
      return;
    }

    // Re-order locally
    const [removed] = slides.splice(result.source.index, 1);
    slides.splice(result.destination.index, 0, removed);

    // Sync changes with server
    const module = await ModuleManager.setSlides(this.state.module, slides);
    this.setState({
      module,
      didSave: true,
    });
  }

  /**
   * Render module status indicator
   */
  renderStatus() {
    switch (this.state.module.status) {
      case 'DRAFT':
        return (
          <div className="level-item">
            <Icon
              iconName="plus-circle fa-lg"
              className="is-large has-text-grey"
            />
            <div>
              <strong>Draft</strong>
              <Tooltip>
                Module is currently in the process of being created.
              </Tooltip>
              <br />
              <small className="has-text-grey">
                Updated {this.state.module.updatedAt.fromNow()}
              </small>
            </div>
          </div>
        );
      case 'APPROVED':
        return (
          <div className="level-item">
            <Icon
              iconName="check-circle fa-lg"
              className="is-large has-text-primary"
            />
            <div>
              <strong>Approved</strong>
              <Tooltip>
                Module is valid and is accessible to users in the system.
              </Tooltip>
              <br />
              <small className="has-text-grey">
                {this.state.module.approvedAt.calendar()}
              </small>
            </div>
          </div>
        );
      case 'IN REVIEW':
        return (
          <div className="level-item">
            <Icon
              iconName="exclamation-circle fa-lg"
              className="is-large has-text-grey"
            />
            <div>
              <strong>In Review</strong>
              <Tooltip>
                Module was previously approved, but has been retracted for
                further changes.
              </Tooltip>
              <br />
              <small className="has-text-grey">
                Updated {this.state.module.updatedAt.fromNow()}
              </small>
            </div>
          </div>
        );
      default:
        return null;
    }
  }

  /**
   * Render module information and actions
   */
  renderModuleMeta() {
    return (
      <>
        <div className="columns is-vcentered is-mobile">
          <div className="column">
            <h1 className="title is-3">
              {this.state.module.title}
              &nbsp;
              <small className="has-text-grey">
                v{this.state.module.version}
              </small>
            </h1>
          </div>
          <div className="column is-3">
            <div className="buttons is-right">
              {this.state.module.isEditable() ? (
                <>
                  <button
                    className="button is-dark"
                    onClick={() => {
                      this.setState({
                        didSave: false,
                        isEditing: true,
                        errors: [],
                      });
                    }}
                  >
                    <span>Edit</span>
                    <Icon iconName="pen" />
                  </button>
                  <button
                    className="button is-dark"
                    onClick={() => {
                      this.setState({
                        didSave: false,
                        isRemoving: true,
                        errors: [],
                      });
                    }}
                  >
                    <span>Remove</span>
                    <Icon iconName="times" />
                  </button>
                  <button
                    className="button is-dark"
                    onClick={async () => {
                      try {
                        const module = await ModuleManager.approve(
                          this.state.module,
                        );
                        this.setState({
                          module,
                          didSave: false,
                          errors: [],
                        });
                      } catch (e) {
                        this.setState({
                          didSave: false,
                          errors: e.response.data,
                        });
                      }
                    }}
                  >
                    <span>Approve</span>
                    <Icon iconName="check" />
                  </button>
                </>
              ) : (
                <>
                  <a
                    className="button is-dark"
                    href={`/modules/${this.state.module.uuid}`}
                    target="_blank"
                  >
                    <span>View</span>
                    <Icon iconName="arrow-right" />
                  </a>
                  <button
                    className="button is-dark"
                    onClick={async () => {
                      try {
                        const module = await ModuleManager.review(
                          this.state.module,
                        );
                        this.setState({ module });
                      } catch (e) {
                        this.setState({
                          didSave: false,
                          errors: e.response.data,
                        });
                      }
                    }}
                  >
                    <span>Review</span>
                    <Icon iconName="pen" />
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
        <div className="level">
          <div className="level-left">
            {this.renderStatus()}
            {!!this.state.module.questionCount && !!this.state.module.passMark && (
              <>
                <div className="level-item">
                  <Icon
                    iconName="clipboard-list fa-lg"
                    className="has-text-grey-light is-large"
                  />
                  <div>
                    <strong>Test Available</strong>
                    <Tooltip>Module has a test that can be completed.</Tooltip>
                    <br />
                  </div>
                </div>
                {this.state.module.isVerifiable && (
                  <div className="level-item">
                    <Icon
                      iconName="certificate fa-lg"
                      className="has-text-grey-light is-large"
                    />
                    <div>
                      <strong>Verifiable</strong>
                      <Tooltip>
                        Completing the module will grant CPD and a certificate.
                      </Tooltip>
                      <br />
                      <small className="has-text-grey">
                        {this.state.module.verifiableHoursText}
                      </small>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
        <div className="level">
          <div className="level-left">
            {!!this.state.module.categories.length && (
              <div className="level-item">
                <div className="tags">
                  {this.state.module.categories.map((category) => (
                    <span
                      className="tag is-primary is-medium is-rounded"
                      key={category.uuid}
                    >
                      <Icon iconName="tag" />
                      <span>{category.name}</span>
                      {this.state.module.isEditable() && (
                        <a
                          className="delete"
                          onClick={async () => {
                            const module = await ModuleManager.removeCategory(
                              this.state.module,
                              category,
                            );
                            this.setState({ module });
                          }}
                        />
                      )}
                    </span>
                  ))}
                </div>
              </div>
            )}
            <div className="level-item">
              {this.state.module.isEditable() ? (
                <button
                  className="button is-white"
                  onClick={() => {
                    this.setState({ isAddingCategory: true, errors: [] });
                  }}
                >
                  <span>Add Category</span>
                  <Icon iconName="plus" />
                </button>
              ) : (
                this.state.module.categories.length === 0 && (
                  <span className="has-text-grey">
                    <Icon iconName="tag" />
                    <span>Uncategorised</span>
                  </span>
                )
              )}
            </div>
          </div>
        </div>
      </>
    );
  }

  /**
   * Render the list of slides
   */
  renderSlides(slides: Slide[], currentSlide: Slide) {
    if (!this.state.isSlidesActive) {
      return null;
    }
    if (slides.length === 0) {
      return <Notification>No slides found</Notification>;
    }
    return (
      <DragDropContext onDragEnd={this.handleReorder}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={
                snapshot.isDraggingOver ? { backgroundColor: '#f1f1f1' } : {}
              }
            >
              {slides.map((slide, index) => (
                <Draggable
                  key={slide.uuid}
                  draggableId={slide.uuid}
                  index={index}
                >
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      onClick={() => {
                        if (currentSlide !== null) {
                          if (currentSlide.uuid === slide.uuid) {
                            return;
                          }
                        }
                        this.setState({
                          slide,
                          didSave: false,
                        });
                      }}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={Object.assign({}, provided.draggableProps.style, {
                        cursor: 'pointer',
                      })}
                      className="resource-list-link"
                    >
                      <Card className="resource-list">
                        <div className="field is-grouped">
                          <div className="control">
                            <Icon iconName="file" />
                          </div>
                          <div className="control is-expanded">
                            <span
                              className={
                                currentSlide && currentSlide.uuid === slide.uuid
                                  ? 'has-text-weight-bold'
                                  : ''
                              }
                            >
                              {slide.title}
                            </span>
                            {currentSlide && currentSlide.uuid === slide.uuid && (
                              <>
                                <br />
                                <small className="has-text-grey">
                                  Currently{' '}
                                  {this.state.module.isEditable()
                                    ? 'editing'
                                    : 'viewing'}
                                </small>
                              </>
                            )}
                          </div>
                          {this.state.module.isEditable() && (
                            <div className="control" style={{ cursor: 'grab' }}>
                              <Icon iconName="grip-horizontal" />
                            </div>
                          )}
                        </div>
                      </Card>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    );
  }

  render() {
    if (!AdminAuth.user) {
      return <Redirect to="/admin/login" />;
    }
    if (!this.state.module) {
      return null;
    }
    return (
      <>
        <Helmet title={this.state.module.title} />
        <Breadcrumb
          breadcrumbs={[
            {
              name: 'Admin Panel',
              link: '/admin',
            },
            {
              name: 'Modules',
              link: '/admin/modules',
            },
            {
              name: this.state.module.shortTitle,
              link: window.location.pathname,
            },
          ]}
        />
        <section className="admin section">
          <div className="container">
            <Card>{this.renderModuleMeta()}</Card>
            <br />
            <div className="columns">
              <div className="column is-4">
                <Card>
                  {/* Thumbnail */}
                  <div className="level is-mobile">
                    <a
                      className="level-left"
                      onClick={() => {
                        this.setState({
                          isThumbnailActive: !this.state.isThumbnailActive,
                        });
                      }}
                    >
                      <div className="level-item">
                        <Icon
                          iconName={
                            this.state.isThumbnailActive
                              ? 'arrow-down'
                              : 'arrow-right'
                          }
                        />
                      </div>
                      <div className="level-item">
                        <h2 className="title is-4">Thumbnail</h2>
                      </div>
                    </a>
                    {this.state.module.isEditable() && (
                      <div className="level-right">
                        <div className="level-item">
                          <button
                            className="button is-dark"
                            onClick={() => {
                              this.setState({
                                didSave: false,
                                isEditingThumbnail: true,
                                errors: [],
                              });
                            }}
                          >
                            <span>Upload</span>
                            <Icon iconName="image" />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                  {!this.state.isThumbnailActive ? null : !!this.state.module
                      .thumbnail ? (
                    <img src={this.state.module.thumbnail} />
                  ) : (
                    <Notification>No thumbnail</Notification>
                  )}

                  <hr />

                  {/* Slides */}
                  <div className="level is-mobile">
                    <a
                      className="level-left"
                      onClick={() => {
                        this.setState({
                          isSlidesActive: !this.state.isSlidesActive,
                        });
                      }}
                    >
                      <div className="level-item">
                        <Icon
                          iconName={
                            this.state.isSlidesActive
                              ? 'arrow-down'
                              : 'arrow-right'
                          }
                        />
                      </div>
                      <div className="level-item">
                        <h2 className="title is-4">Slides</h2>
                      </div>
                      <div className="level-item has-text-grey">
                        ({this.state.module.slides.length})
                      </div>
                    </a>
                    {this.state.module.isEditable() && (
                      <div className="level-right">
                        <div className="level-item">
                          <button
                            className="button is-dark"
                            onClick={() => {
                              this.setState({
                                didSave: false,
                                isAddingSlide: true,
                                errors: [],
                              });
                            }}
                          >
                            <span>Add New</span>
                            <Icon iconName="plus" />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                  {this.renderSlides(
                    this.state.module.slides,
                    this.state.slide,
                  )}
                </Card>
              </div>
              <div className="column is-8">
                {!this.state.isAddingSlide &&
                  !this.state.isEditing &&
                  !this.state.isAddingCategory &&
                  !this.state.isEditingThumbnail && (
                    <Errors errors={this.state.errors} />
                  )}
                {this.state.didSave && (
                  <Notification className="is-primary">
                    Your changes were saved successfully
                    <a
                      onClick={() => {
                        this.setState({ didSave: false });
                      }}
                      className="delete"
                    />
                  </Notification>
                )}
                <SlideControl
                  isActive={this.state.module.isEditable()}
                  module={this.state.module}
                  slide={this.state.slide}
                  handleUpdate={(slide, module) => {
                    this.setState({ slide, module, errors: [], didSave: true });
                  }}
                  handleDelete={() => {
                    this.setState({ slide: null, didSave: false, errors: [] });
                  }}
                  handleError={(errors) => {
                    this.setState({ errors, didSave: false });
                  }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Edit Module */}
        <Modal
          isActive={this.state.isEditing}
          hasControls={false}
          handleClose={async () => {
            this.setState({
              isEditing: false,
              errors: [],
            });
          }}
        >
          <div className="content">
            <h2>Edit Module</h2>
            <Errors errors={this.state.errors} />
            <ModuleForm
              module={this.state.module}
              buttonText="Save"
              handleSubmit={async (fields, setSubmitting) => {
                try {
                  const module = await ModuleManager.update(
                    this.state.module.uuid,
                    fields,
                  );
                  setSubmitting(false);
                  this.setState({
                    module,
                    isEditing: false,
                    errors: [],
                  });
                } catch (e) {
                  setSubmitting(false);
                  if (e.response) {
                    this.setState({
                      errors: e.response.data,
                    });
                  }
                }
              }}
            />
          </div>
        </Modal>

        {/* Remove Module */}
        <Modal
          isActive={this.state.isRemoving}
          handleClose={async (status) => {
            try {
              if (status === 1) {
                await ModuleManager.destroy(this.state.module.uuid);
                this.props.history.replace('/admin/modules');
              }
              this.setState({
                isRemoving: false,
                errors: [],
              });
            } catch (e) {
              if (e.response) {
                this.setState({
                  isRemoving: false,
                  errors: e.response.data,
                });
              }
            }
          }}
          confirmText="Remove"
        >
          <div className="content">
            <h2>Remove Module</h2>
            {this.state.module && (
              <p>
                Are you sure you want to remove{' '}
                <strong>{this.state.module.title}</strong> and all associated
                content?
              </p>
            )}
          </div>
        </Modal>

        {/* Add Category */}
        <Modal
          isActive={this.state.isAddingCategory}
          hasControls={false}
          handleClose={async () => {
            this.setState({
              isAddingCategory: false,
              errors: [],
            });
          }}
        >
          <div className="content">
            <h2>Add Category</h2>
            <Errors errors={this.state.errors} />
            {CategoryManager.categories.map((category) => (
              <a
                key={category.uuid}
                onClick={async () => {
                  if (!this.state.module.hasCategory(category)) {
                    try {
                      const module = await ModuleManager.addCategory(
                        this.state.module,
                        category,
                      );
                      this.setState({
                        module,
                        isAddingCategory: false,
                        errors: [],
                      });
                    } catch (e) {
                      this.setState({
                        errors: e.response.data,
                      });
                    }
                  }
                }}
                style={
                  this.state.module.hasCategory(category)
                    ? { cursor: 'not-allowed', opacity: 0.5 }
                    : {}
                }
                className="resource-list-link"
              >
                <Card className="resource-list">
                  <div className="level is-mobile">
                    <div className="level-left">
                      <div className="level-item">
                        <Icon iconName="tag" />
                      </div>
                      <div className="level-item">
                        <div>
                          <strong>{category.name}</strong>
                          {this.state.module.hasCategory(category) && (
                            <>
                              <br />
                              <small className="has-text-grey">
                                Already added
                              </small>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </a>
            ))}
          </div>
        </Modal>

        {/* Edit Thumbnail */}
        <Modal
          isActive={this.state.isEditingThumbnail}
          hasControls={false}
          handleClose={async () => {
            this.setState({
              isEditingThumbnail: false,
              uploadProgress: 0,
              errors: [],
            });
          }}
        >
          <div className="content">
            <h2>Upload Thumbnail</h2>
            <Errors errors={this.state.errors} />
            <UploadForm
              progress={this.state.uploadProgress}
              handleSubmit={async (values, setSubmitting) => {
                try {
                  const module = await ModuleManager.uploadThumbnail(
                    this.state.module,
                    values.file,
                    (progressEvent) => {
                      const progress = Math.round(
                        (progressEvent.loaded * 100) / progressEvent.total,
                      );
                      this.setState({
                        uploadProgress: progress,
                        errors: [],
                      });
                    },
                  );
                  this.setState({
                    module,
                    isEditingThumbnail: false,
                    uploadProgress: 0,
                    errors: [],
                  });
                } catch (e) {
                  if (e.response) {
                    this.setState({
                      uploadProgress: 0,
                      errors: e.response.data,
                    });
                  }
                }
                setSubmitting(false);
              }}
            />
            <Notification>
              <Icon iconName="info-circle" />
              Images uploaded will be automatically resized to{' '}
              <strong>640x480</strong> pixels
            </Notification>
          </div>
        </Modal>

        {/* New Slide */}
        <Modal
          isActive={this.state.isAddingSlide}
          hasControls={false}
          handleClose={async () => {
            this.setState({
              isAddingSlide: false,
              errors: [],
            });
          }}
        >
          <div className="content">
            <h2>New Slide</h2>
            <Errors errors={this.state.errors} />
            <NameForm
              labelText="Title"
              buttonText="Create"
              tooltip="Name of the slide to appear in the contents menu."
              handleSubmit={async ({ name }, setSubmitting) => {
                try {
                  const module = await ModuleManager.addSlide(
                    this.state.module,
                    {
                      title: name,
                    },
                  );
                  setSubmitting(false);
                  this.setState({
                    slide: module.slides[module.slides.length - 1],

                    isAddingSlide: false,
                    isSlidesActive: true,
                    errors: [],
                  });
                } catch (e) {
                  setSubmitting(false);
                  if (e.response) {
                    this.setState({
                      errors: e.response.data,
                    });
                  }
                }
              }}
            />
          </div>
        </Modal>
      </>
    );
  }
}
