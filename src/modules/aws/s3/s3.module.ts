import { Module } from '@nestjs/common';
import { S3v2Controller } from './s3-v2.controller';
import { S3v2Service } from './s3-v2.service';
import { S3Controller } from './s3.controller';
import { S3Service } from './s3.service';

@Module({
  controllers: [S3v2Controller, S3Controller],
  providers: [S3v2Service, S3Service],
})
export class S3Module {}
