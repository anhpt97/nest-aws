import {
  Body,
  Controller,
  Post,
  Res,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { FileValidationPipe } from '~/common/pipes';
import { S3v2Service } from './s3-v2.service';
import { DownloadFileDto, UploadFilesDto } from './s3.dto';

@ApiTags('aws')
@Controller('v2')
export class S3v2Controller {
  constructor(private s3v2Service: S3v2Service) {}

  @Post('upload')
  @UseInterceptors(AnyFilesInterceptor())
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: UploadFilesDto })
  upload(
    @UploadedFiles(new FileValidationPipe()) files: Express.Multer.File[],
  ) {
    return this.s3v2Service.upload(files);
  }

  @Post('download')
  @ApiBody({ type: DownloadFileDto })
  async download(@Body() dto: DownloadFileDto, @Res() res: Response) {
    res.set({ 'Content-Disposition': `attachment; filename=${dto.filename}` });
    res.end((await this.s3v2Service.download(dto)).Body);
  }
}
