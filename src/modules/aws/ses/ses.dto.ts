import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { Attachment } from 'nodemailer/lib/mailer';

class Template {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: '' })
  subject: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: '' })
  content: string;

  attachments?: Attachment[];
}

export class SendMailDto {
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  @ApiProperty({ example: [''] })
  recipients: string | string[];

  @ValidateNested()
  @Type(() => Template)
  @ApiProperty()
  template: Template;
}
