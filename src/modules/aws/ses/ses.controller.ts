import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SendMailDto } from './ses.dto';
import { SesService } from './ses.service';

@ApiTags('aws')
@Controller('')
export class SesController {
  constructor(private sesService: SesService) {}

  @Post('send')
  send(@Body() dto: SendMailDto) {
    return this.sesService.send(dto);
  }
}
