import { Module } from '@nestjs/common';
import { RmqService } from '@app/common';

@Module({
  providers: [RmqService],
  exports: [RmqService],
})
export class RmqModule {}
