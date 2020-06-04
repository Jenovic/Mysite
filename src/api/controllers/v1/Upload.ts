import {
  Controller,
  Post,
  Use,
  Get,
  PathParams,
  QueryParams,
} from '@tsed/common';
import { Description } from '@tsed/swagger';
import { MultipartFile } from '@tsed/multipartfiles';
import AdminAuthenticated from '../../middleware/v1/Authentication';
import UploadManager from '../../services/UploadManager';

@Controller('/uploads')
export default class UploadController {
  constructor(private uploadManager: UploadManager) {}

  /**
   * Get an upload
   */
  @Get('/:uuid')
  @Use(AdminAuthenticated)
  @Description('Get an upload')
  public async get(@PathParams('uuid') uuid: string) {
    return this.uploadManager.find(uuid);
  }

  /**
   * Upload an image
   */
  @Post('/image')
  @Use(AdminAuthenticated)
  @Description('Upload an image')
  public async createImage(
    @MultipartFile('file') file: Express.Multer.File,
    @QueryParams('moduleUuid') moduleUuid?: string,
    @QueryParams('slideUuid') slideUuid?: string,
  ) {
    return this.uploadManager.createImage(file, {
      moduleUuid: moduleUuid ? moduleUuid : null,
      slideUuid: slideUuid ? slideUuid : null,
    });
  }

  /**
   * Upload a thumbnail
   */
  @Post('/thumbnail')
  @Use(AdminAuthenticated)
  @Description('Upload a thumbnail')
  public async createThumbnail(
    @MultipartFile('file') file: Express.Multer.File,
    @QueryParams('moduleUuid') moduleUuid?: string,
    @QueryParams('slideUuid') slideUuid?: string,
  ) {
    return this.uploadManager.createImage(file, {
      moduleUuid: moduleUuid ? moduleUuid : null,
      slideUuid: slideUuid ? slideUuid : null,
      width: 640,
      height: 480,
    });
  }

  /**
   * Upload a document
   */
  @Post('/document')
  @Use(AdminAuthenticated)
  @Description('Upload a document')
  public async createPDF(
    @MultipartFile('file') file: Express.Multer.File,
    @QueryParams('moduleUuid') moduleUuid?: string,
    @QueryParams('slideUuid') slideUuid?: string,
  ) {
    return this.uploadManager.createDocument(file, {
      moduleUuid: moduleUuid ? moduleUuid : null,
      slideUuid: slideUuid ? slideUuid : null,
    });
  }

  /**
   * Upload a CPD certificate template
   */
  @Post('/certificate')
  @Use(AdminAuthenticated)
  @Description('Upload a CPD certificate template')
  public async createCertificate(
    @MultipartFile('file') file: Express.Multer.File,
    @QueryParams('moduleUuid') moduleUuid: string,
  ) {
    return this.uploadManager.createDocument(file, { moduleUuid });
  }
}
