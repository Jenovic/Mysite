import Axios from 'axios';
import * as queryString from 'query-string';

interface UploadOptions {
  moduleUuid?: string;
  slideUuid?: string;
  userUuid?: string;
}

type OnUploadProgress = (progressEvent: any) => void;

class UploadManager {
  private serialize(file) {
    const formData = new FormData();
    formData.append('file', file);
    return formData;
  }

  private async upload(
    type: string,
    file: 'image' | 'thumbnail' | 'document',
    options: UploadOptions = {},
    onUploadProgress?: OnUploadProgress,
  ) {
    return Axios.post(
      `uploads/${type}?${queryString.stringify(options)}`,
      this.serialize(file),
      {
        onUploadProgress,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );
  }

  public async uploadImage(
    file,
    options: UploadOptions = {},
    onUploadProgress?: OnUploadProgress,
  ) {
    return this.upload('image', file, options, onUploadProgress);
  }

  public async uploadThumbnail(
    file,
    options: UploadOptions = {},
    onUploadProgress?: OnUploadProgress,
  ) {
    return this.upload('thumbnail', file, options, onUploadProgress);
  }

  public async uploadDocument(
    file,
    options: UploadOptions = {},
    onUploadProgress?: OnUploadProgress,
  ) {
    return this.upload('document', file, options, onUploadProgress);
  }
}

export default new UploadManager();
