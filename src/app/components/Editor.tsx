import * as React from 'react';
import * as ReactDOMServer from 'react-dom/server';
import ReactQuill, { Quill } from 'react-quill';
import * as getVideoId from 'get-video-id';
import { Tooltip } from 'react-tippy';
import UploadManager from '../services/UploadManager';

import Icon from './Icon';
import Modal from './Modal';
import UploadForm from './UploadForm';
import Errors from './Errors';
import NameForm from './NameForm';
import Module from '../models/Module';
import Slide from '../models/Slide';
import Notification from './Notification';

interface Props {
  value: string;
  onChange: Function;
  module?: Module;
  slide?: Slide;
}

interface State {
  isAddingImage: boolean;
  isAddingVideo: boolean;
  isAddingDownload: boolean;
  uploadProgress: number;
  errors: string[];
}

// Set custom icons
const icons = Quill.import('ui/icons');
icons['heading'] = ReactDOMServer.renderToString(<Icon iconName="heading" />);
icons['primary-heading'] = ReactDOMServer.renderToString(
  <Icon className="has-text-primary" iconName="heading" />,
);
icons['bold'] = ReactDOMServer.renderToString(<Icon iconName="bold" />);
icons['italic'] = ReactDOMServer.renderToString(<Icon iconName="italic" />);
icons['underline'] = ReactDOMServer.renderToString(
  <Icon iconName="underline" />,
);
icons['link'] = ReactDOMServer.renderToString(<Icon iconName="link" />);
icons['list'] = ReactDOMServer.renderToString(<Icon iconName="list-ul" />);
icons['align-center'] = ReactDOMServer.renderToString(
  <Icon iconName="align-center" />,
);
icons['image'] = ReactDOMServer.renderToString(<Icon iconName="image" />);
icons['video'] = ReactDOMServer.renderToString(<Icon iconName="video" />);
icons['download'] = ReactDOMServer.renderToString(
  <Icon iconName="file-download" />,
);

// Register heading component
Quill.register(
  'formats/heading',
  class HeadingBlot extends Quill.import('blots/block') {
    static blotName = 'heading';
    static tagName = 'h1';
  },
);

// Register alt heading component
Quill.register(
  'formats/primary-heading',
  class PrimaryHeadingBlot extends Quill.import('blots/block') {
    static blotName = 'primary-heading';
    static tagName = 'h1';
    static className = 'has-text-primary';
  },
);

// Register download component
Quill.register(
  'formats/download',
  class DownloadBlot extends Quill.import('blots/block/embed') {
    static blotName = 'download';
    static tagName = 'p';
    static className = 'download-container';

    static create(value) {
      const node = super.create();
      node.setAttribute('data-href', value);
      node.innerHTML = `<a href="${value}" class="button" target="_blank">Download</a>`;
      return node;
    }

    static value(node) {
      return node.getAttribute('data-href');
    }
  },
);

// Register download component
Quill.register(
  'formats/align-center',
  class AlignCenterBlot extends Quill.import('blots/block') {
    static blotName = 'align-center';
    static tagName = 'div';
    static className = 'has-text-centered';
  },
);

export default class Editor extends React.Component<Props, State> {
  editor: any;
  quill: Quill;

  constructor(props) {
    super(props);
    this.state = {
      isAddingImage: false,
      isAddingVideo: false,
      isAddingDownload: false,
      uploadProgress: 0,
      errors: [],
    };

    this.imageHandler = this.imageHandler.bind(this);
    this.videoHandler = this.videoHandler.bind(this);
    this.downloadHandler = this.downloadHandler.bind(this);
  }

  componentDidMount() {
    this.quill = this.editor.getEditor();
  }

  imageHandler(value) {
    this.setState({ isAddingImage: true });
  }

  videoHandler(value) {
    this.setState({ isAddingVideo: true });
  }

  downloadHandler(value) {
    this.setState({ isAddingDownload: true });
  }

  renderToolbar() {
    return (
      <div className="field is-grouped" id="toolbar">
        <div className="control">
          <div className="field has-addons">
            <div className="control">
              <Tooltip title="Turn the highlighted text bold.">
                <button className="button ql-bold" />
              </Tooltip>
            </div>
            <div className="control">
              <Tooltip title="Turn the highlighted text italic.">
                <button className="button ql-italic" />
              </Tooltip>
            </div>
            <div className="control">
              <Tooltip title="Add an underline to the highlighted text.">
                <button className="button ql-underline" />
              </Tooltip>
            </div>
            <div className="control">
              <Tooltip title="Add a link to the highlighted text.">
                <button className="button ql-link" />
              </Tooltip>
            </div>
          </div>
        </div>
        <div className="control">
          <div className="field has-addons">
            <div className="control">
              <Tooltip title="Turn the text into a heading.">
                <button className="button ql-heading" />
              </Tooltip>
            </div>
            <div className="control">
              <Tooltip title="Turn the text into a coloured heading.">
                <button className="button ql-primary-heading" />
              </Tooltip>
            </div>
            <div className="control">
              <Tooltip title="Turn the text into a list.">
                <button className="button ql-list" value="bullet" />
              </Tooltip>
            </div>
            <div className="control">
              <Tooltip title="Centre align the text.">
                <button className="button ql-align-center" />
              </Tooltip>
            </div>
          </div>
        </div>
        <div className="control">
          <div className="field has-addons">
            <div className="control">
              <Tooltip title="Add an image.">
                <button className="button ql-image" />
              </Tooltip>
            </div>
            <div className="control">
              <Tooltip title="Embed a video.">
                <button className="button ql-video" />
              </Tooltip>
            </div>
            <div className="control">
              <Tooltip title="Add a download.">
                <button className="button ql-download" />
              </Tooltip>
            </div>
          </div>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="editor">
        {this.renderToolbar()}
        <ReactQuill
          ref={(editor) => (this.editor = editor)}
          value={this.props.value}
          modules={{
            toolbar: {
              container: '#toolbar',
              handlers: {
                image: this.imageHandler,
                video: this.videoHandler,
                download: this.downloadHandler,
              },
            },
          }}
          onChange={(value) => {
            this.props.onChange(value);
          }}
        />

        {/* Image upload */}
        <Modal
          isActive={this.state.isAddingImage}
          hasControls={false}
          handleClose={() => {
            this.setState({ isAddingImage: false });
          }}
        >
          <div className="content">
            <h2>Upload Image</h2>
            <Errors errors={this.state.errors} />
            <UploadForm
              progress={this.state.uploadProgress}
              handleSubmit={async (values, setSubmitting) => {
                try {
                  const response = await UploadManager.uploadImage(
                    values.file,
                    {
                      moduleUuid: this.props.module
                        ? this.props.module.uuid
                        : '',
                      slideUuid: this.props.slide ? this.props.slide.uuid : '',
                    },
                    (progressEvent) => {
                      const progress = Math.round(
                        (progressEvent.loaded * 100) / progressEvent.total,
                      );
                      this.setState({
                        uploadProgress: progress,
                      });
                    },
                  );
                  this.setState({
                    isAddingImage: false,
                    uploadProgress: 0,
                    errors: [],
                  });

                  // Insert it into the editor
                  const range = this.quill.getSelection();
                  this.quill.insertEmbed(
                    range ? range.index : 0,
                    'image',
                    response.data.url,
                  );
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
          </div>
        </Modal>

        {/* Video Embed */}
        <Modal
          isActive={this.state.isAddingVideo}
          hasControls={false}
          confirmText="Return"
          handleClose={() => {
            this.setState({ isAddingVideo: false });
          }}
        >
          <div className="content">
            <h2>Embed Video</h2>
            <Errors errors={this.state.errors} />
            <Notification>
              Only YouTube, Vimeo or Buto videos are supported.
            </Notification>
            <NameForm
              labelText="Video URL"
              buttonText="Embed"
              handleSubmit={async (values, setSubmitting) => {
                setSubmitting(false);
                if (!values.name) {
                  this.setState({ errors: ['Please provide a video URL'] });
                  return;
                }

                // Parse the embed URL from the input
                const url = ((input): string | false => {
                  const { id, service } = getVideoId(input);

                  // Buto.tv links are allowed, but we assume the URL provided is valid for embed
                  if (!service) {
                    if (/embed\.buto\.tv/gi.test(input)) {
                      return input;
                    }
                  }

                  switch (service) {
                    case 'youtube':
                      return `https://www.youtube.com/embed/${id}`;
                    case 'vimeo':
                      return `https://player.vimeo.com/video/${id}`;
                    default:
                      this.setState({
                        errors: ['Please provide a valid video URL'],
                      });
                      return false;
                  }
                })(values.name);
                if (!url) {
                  return;
                }

                // Insert it into the editor
                const range = this.quill.getSelection();
                this.quill.insertEmbed(range ? range.index : 0, 'video', url);

                this.setState({ isAddingVideo: false, errors: [] });
              }}
            />
          </div>
        </Modal>

        {/* Document upload */}
        <Modal
          isActive={this.state.isAddingDownload}
          hasControls={false}
          handleClose={() => {
            this.setState({ isAddingDownload: false });
          }}
        >
          <div className="content">
            <h2>Upload Document</h2>
            <Errors errors={this.state.errors} />
            <UploadForm
              progress={this.state.uploadProgress}
              handleSubmit={async (values, setSubmitting) => {
                try {
                  const response = await UploadManager.uploadDocument(
                    values.file,
                    {
                      moduleUuid: this.props.module
                        ? this.props.module.uuid
                        : undefined,
                      slideUuid: this.props.slide
                        ? this.props.slide.uuid
                        : undefined,
                    },
                    (progressEvent) => {
                      const progress = Math.round(
                        (progressEvent.loaded * 100) / progressEvent.total,
                      );
                      this.setState({
                        uploadProgress: progress,
                      });
                    },
                  );
                  this.setState({
                    isAddingDownload: false,
                    uploadProgress: 0,
                    errors: [],
                  });

                  // Insert it into the editor
                  const range = this.quill.getSelection();
                  this.quill.insertEmbed(
                    range ? range.index : 0,
                    'download',
                    response.data.url,
                  );
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
          </div>
        </Modal>
      </div>
    );
  }
}
