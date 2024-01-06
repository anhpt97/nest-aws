import * as aws from '@aws-sdk/client-ses';
import { Injectable } from '@nestjs/common';
// import aws, { SES } from 'aws-sdk';
import { Transporter, createTransport } from 'nodemailer';
import {
  AWS_ACCESS_KEY_ID,
  AWS_REGION,
  AWS_SECRET_ACCESS_KEY,
  AWS_SES_SENDER,
} from '~/common/constants';
import { SendMailDto } from './ses.dto';

@Injectable()
export class SesService {
  private transporter: Transporter;

  constructor() {
    this.transporter = createTransport({
      SES: {
        aws,
        // ses: new SES({
        //   credentials: {
        //     accessKeyId: AWS_ACCESS_KEY_ID,
        //     secretAccessKey: AWS_SECRET_ACCESS_KEY,
        //   },
        // }),
        ses: new aws.SES({
          credentials: {
            accessKeyId: AWS_ACCESS_KEY_ID,
            secretAccessKey: AWS_SECRET_ACCESS_KEY,
          },
          region: AWS_REGION,
        }),
      },
    });
  }

  async send({ recipients, template }: SendMailDto) {
    await this.transporter.sendMail({
      from: AWS_SES_SENDER,
      to: recipients,
      subject: template.subject,
      html: template.content,
      attachments: template.attachments, // [{ content: file.buffer, filename: file.originalname }],
    });
  }
}
