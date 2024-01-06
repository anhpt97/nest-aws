import { Injectable } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import { GetObjectOutput } from 'aws-sdk/clients/s3';
import {
  AWS_ACCESS_KEY_ID,
  AWS_S3_BUCKET,
  AWS_SECRET_ACCESS_KEY,
} from '~/common/constants';
import { DownloadFileDto } from './s3.dto';

@Injectable()
export class S3v2Service {
  private s3: S3;

  constructor() {
    this.s3 = new S3({
      credentials: {
        accessKeyId: AWS_ACCESS_KEY_ID,
        secretAccessKey: AWS_SECRET_ACCESS_KEY,
      },
    });
  }

  async upload(files: Express.Multer.File[]) {
    await Promise.all(
      files.map(
        ({ originalname, mimetype, buffer }) =>
          new Promise((resolve, reject) => {
            this.s3.upload(
              {
                ACL: 'public-read',
                Body: buffer,
                Bucket: AWS_S3_BUCKET,
                ContentType: mimetype,
                Key: originalname,
              },
              (err, data) => (err ? reject(err) : resolve(data)),
            );
          }),
      ),
    );
  }

  async download({ filename }: DownloadFileDto): Promise<GetObjectOutput> {
    return await new Promise((resolve, reject) => {
      this.s3.getObject(
        { Bucket: AWS_S3_BUCKET, Key: filename },
        (err, data) => (err ? reject(err) : resolve(data)),
      );
    });
  }
}
