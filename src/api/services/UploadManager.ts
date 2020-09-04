import { Service } from '@tsed/di';
import { Sequelize } from 'sequelize-typescript';
import * as sharp from 'sharp';
import Upload from '../models/Upload';
import CDN from './CDN';

@Service()
export default class UploadManager implements IManager<Upload> {
  public async findAll(): Promise<Upload[]> {
    return Upload.findAll();
  }

  public async find(uuid: string): Promise<Upload> {
    return Upload.findById(uuid);
  }

  /**
   * Resize an image buffer
   */
  private async resize(
    buffer: Buffer,
    width?: number,
    height?: number,
  ): Promise<Buffer> {
    if (width || height) {
      return sharp(buffer)
        .resize(width, height)
        .toBuffer();
    }
    return buffer;
  }

  /**
   * Upload a new file
   */
  public async create(
    fields: Partial<Upload>,
    buffer: Buffer,
    mimetype: string,
  ): Promise<Upload> {
    const upload = await Upload.create(fields);
    const uuid = upload.uuid.toString();
    await CDN.upload(uuid, buffer, mimetype);
    await upload.update({ url: CDN.getURL(uuid) });
    return this.find(uuid);
  }

  /**
   * Upload a new image
   */
  public async createImage(
    file: Express.Multer.File,
    options: {
      width?: number;
      height?: number;
      moduleUuid?: any;
      slideUuid?: any;
      userUuid?: any;
    } = {},
  ): Promise<Upload> {
    const mimeTypes = ['image/jpeg', 'image/png'];
    if (mimeTypes.indexOf(file.mimetype) === -1) {
      throw new Sequelize.ValidationError(
        'Image must be in JPEG or PNG format',
      );
    }
    const buffer = await this.resize(
      file.buffer,
      options.width,
      options.height,
    );
    return this.create(
      {
        type: 'IMAGE',
      },
      buffer,
      file.mimetype,
    );
  }

  /**
   * Upload a new document
   */
  public async createDocument(
    file: Express.Multer.File,
    options: {
      moduleUuid?: any;
      slideUuid?: any;
    } = {},
  ): Promise<Upload> {
    const mimeTypes = ['application/pdf'];
    if (mimeTypes.indexOf(file.mimetype) === -1) {
      throw new Sequelize.ValidationError('Document must be in PDF format');
    }
    return this.create(
      {
        type: 'DOCUMENT',
      },
      file.buffer,
      file.mimetype,
    );
  }
}
