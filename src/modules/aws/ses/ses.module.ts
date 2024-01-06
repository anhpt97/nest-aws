import { Module } from '@nestjs/common';
import { SesController } from './ses.controller';
import { SesService } from './ses.service';

@Module({
  controllers: [SesController],
  providers: [SesService],
})
export class SesModule {}
