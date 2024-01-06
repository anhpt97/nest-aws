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
import { DownloadFileDto, UploadFilesDto } from './s3.dto';
import { S3Service } from './s3.service';

@ApiTags('aws')
@Controller('')
export class S3Controller {
  constructor(private s3Service: S3Service) {}

  @Post('upload')
  @UseInterceptors(AnyFilesInterceptor())
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: UploadFilesDto })
  upload(
    @UploadedFiles(new FileValidationPipe()) files: Express.Multer.File[],
  ) {
    return this.s3Service.upload(files);
  }

  @Post('download')
  @ApiBody({ type: DownloadFileDto })
  async download(@Body() dto: DownloadFileDto, @Res() res: Response) {
    res.set({ 'Content-Disposition': `attachment; filename=${dto.filename}` });
    res.end(await this.s3Service.download(dto));
  }
}
