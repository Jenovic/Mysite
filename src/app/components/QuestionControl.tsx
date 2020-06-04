import * as React from 'react';
import Question from '../models/Question';
import Answer from '../models/Answer';
import QuestionManager from '../services/QuestionManager';

import Icon from './Icon';
import Card from './Card';
import NameForm from './NameForm';
import Notification from './Notification';
import Modal from './Modal';
import AnswerForm from './AnswerForm';
import Errors from './Errors';

interface Props {
  isActive: boolean;
  question: Question;
  handleUpdate: Function;
  handleDelete: Function;
  handleError: Function;
}

interface State {
  answer: Answer;
  isRemoving: boolean;
  isAddingAnswer: boolean;
  isEditingAnswer: boolean;
  isRemovingAnswer: boolean;
  answerErrors: string[];
}

export default class QuestionControl extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      answer: null,
      isRemoving: false,
      isAddingAnswer: false,
      isEditingAnswer: false,
      isRemovingAnswer: false,
      answerErrors: [],
    };
  }

  render() {
    if (!this.props.question) {
      return null;
    }
    return (
      <>
        <Card key={this.props.question.uuid}>
          <div className="columns is-vcentered is-mobile">
            <div className="column is-8">
              <h2 className="title is-4">{this.props.question.text}</h2>
            </div>
            {this.props.isActive && (
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
            )}
          </div>
          {this.props.isActive && (
            <NameForm
              name={this.props.question.text}
              labelText="Question"
              buttonText="Save"
              tooltip="A possible question to be asked."
              handleSubmit={async ({ name }, setSubmitting) => {
                try {
                  const response = await QuestionManager.update(
                    this.props.question.uuid,
                    {
                      text: name,
                    },
                  );
                  setSubmitting(false);
                  this.props.handleUpdate(response);
                } catch (e) {
                  setSubmitting(false);
                  if (e.response) {
                    this.props.handleError(e.response.data);
                  }
                }
              }}
            />
          )}

          {this.props.isActive && (
            <>
              <hr />
              <div className="level is-mobile">
                <div className="level-left">
                  <div className="level-item">
                    <h2 className="title is-4">Answers</h2>
                  </div>
                  <div className="level-item has-text-grey">
                    ({this.props.question.answers.length})
                  </div>
                </div>
                <div className="level-right">
                  <div className="level-item">
                    <button
                      className="button"
                      onClick={() => {
                        this.setState({
                          isAddingAnswer: true,
                          answerErrors: [],
                        });
                      }}
                    >
                      <Icon iconName="plus" />
                      <span>Add New</span>
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}

          {this.props.question.answers.length === 0 && (
            <Notification>No answers found</Notification>
          )}
          {this.props.question.answers.map((answer) => (
            <Card className="resource-list" key={answer.uuid}>
              <div className="columns is-vcentered is-mobile">
                <div className="column is-8">
                  <strong>{answer.text}</strong>
                  {answer.isCorrect && (
                    <>
                      <br />
                      <small className="has-text-grey">Correct answer</small>
                    </>
                  )}
                </div>
                {this.props.isActive && (
                  <div className="column is-4">
                    <div className="buttons is-right">
                      <a
                        className="button"
                        onClick={() => {
                          this.setState({
                            answer,
                            isEditingAnswer: true,
                            answerErrors: [],
                          });
                        }}
                      >
                        <Icon iconName="pen" />
                        <span>Edit</span>
                      </a>
                      <a
                        className="button"
                        onClick={() => {
                          this.setState({ answer, isRemovingAnswer: true });
                        }}
                      >
                        <Icon iconName="times" />
                        <span>Remove</span>
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </Card>
          ))}
        </Card>

        {/* Remove Question */}
        <Modal
          isActive={this.state.isRemoving}
          handleClose={async (status) => {
            try {
              if (status === 1) {
                await QuestionManager.destroy(this.props.question.uuid);
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
            <h2>Remove Question</h2>
            {this.props.question && (
              <p>
                Are you sure you want to remove the question{' '}
                <strong>{this.props.question.title}</strong>?
              </p>
            )}
          </div>
        </Modal>

        {/* Add Answer */}
        <Modal
          isActive={this.state.isAddingAnswer}
          hasControls={false}
          handleClose={() => {
            this.setState({ isAddingAnswer: false });
          }}
        >
          <div className="content">
            <h2>New Answer</h2>
            <Errors errors={this.state.answerErrors} />
            <AnswerForm
              buttonText="Create"
              handleSubmit={async (fields, setSubmitting) => {
                try {
                  const response = await QuestionManager.addAnswer(
                    this.props.question,
                    Object.assign({}, fields, {
                      questionUuid: this.props.question.uuid,
                    }),
                  );
                  setSubmitting(false);
                  this.setState({ isAddingAnswer: false });
                  this.props.handleUpdate(response);
                } catch (e) {
                  setSubmitting(false);
                  if (e.response) {
                    this.setState({ answerErrors: e.response.data });
                  }
                }
              }}
            />
          </div>
        </Modal>

        {/* Edit Answer */}
        <Modal
          isActive={this.state.isEditingAnswer}
          hasControls={false}
          handleClose={() => {
            this.setState({ isEditingAnswer: false });
          }}
        >
          <div className="content">
            <h2>Edit Answer</h2>
            <Errors errors={this.state.answerErrors} />
            <AnswerForm
              answer={this.state.answer}
              buttonText="Save"
              handleSubmit={async (fields, setSubmitting) => {
                try {
                  const response = await QuestionManager.updateAnswer(
                    this.props.question,
                    this.state.answer,
                    fields,
                  );
                  setSubmitting(false);
                  this.setState({ isEditingAnswer: false });
                  this.props.handleUpdate(response);
                } catch (e) {
                  setSubmitting(false);
                  if (e.response) {
                    this.setState({ answerErrors: e.response.data });
                  }
                }
              }}
            />
          </div>
        </Modal>

        {/* Remove Answer */}
        <Modal
          isActive={this.state.isRemovingAnswer}
          handleClose={async (status) => {
            try {
              if (status === 1) {
                const response = await QuestionManager.removeAnswer(
                  this.props.question,
                  this.state.answer,
                );
                this.props.handleUpdate(response);
              }
              this.setState({ isRemovingAnswer: false });
            } catch (e) {
              if (e.response) {
                this.props.handleError(e.response.data);
                this.setState({ isRemovingAnswer: false });
              }
            }
          }}
          confirmText="Remove"
        >
          <div className="content">
            <h2>Remove Answer</h2>
            <p>Are you sure you want to remove this answer?</p>
          </div>
        </Modal>
      </>
    );
  }
}
