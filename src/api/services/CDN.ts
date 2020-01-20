import * as AWS from 'aws-sdk';
import { assign } from 'lodash';

require('dotenv').config();

AWS.config.update({
  accessKeyId: process.env.CDN_ACCESS_KEY,
  secretAccessKey: process.env.CDN_SECRET_KEY,
});

const config: any = {
  endpoint: new AWS.Endpoint(process.env.CDN_ENDPOINT),
};

const s3 = new AWS.S3(config);

class CDN {
  /**
   * Get from the CDN
   */
  private static get(fields) {
    return new Promise((resolve, reject) => {
      s3.getObject(
        assign({}, fields, { Bucket: process.env.CDN_NAME }),
        (err, data) => {
          if (err) {
            reject(err);
            return;
          }
          resolve(data);
        },
      );
    });
  }

  /**
   * Upload to the CDN
   */
  private static set(fields) {
    return new Promise((resolve, reject) => {
      s3.putObject(
        assign({}, fields, { Bucket: process.env.CDN_NAME }),
        (err, data) => {
          if (err) {
            reject(err);
            return;
          }
          resolve(data);
        },
      );
    });
  }

  /**
   * Get the URL of a file from the CDN
   */
  public static getURL(uuid: string) {
    return `https://${process.env.CDN_NAME}.${process.env.CDN_ENDPOINT}/${
      process.env.APP_ENV
    }/uploads/${uuid}`;
  }

  /**
   * Upload a file with public read access to the CDN
   */
  public static upload(uuid: string, file: Buffer, mimetype: string) {
    return CDN.set({
      Key: `${process.env.APP_ENV}/uploads/${uuid}`,
      Body: file,
      ACL: 'public-read',
      ContentType: mimetype,
    });
  }
}

export default CDN;
