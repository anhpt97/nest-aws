import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UploadFilesDto {
  @ApiPropertyOptional({ format: 'binary' })
  file: string;
}

export class DownloadFileDto {
  @IsString()
  @ApiProperty({ example: '' })
  filename: string;
}
