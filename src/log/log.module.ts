import { Module } from '@nestjs/common';
import { LogService } from './log.service';
import { LogController } from './log.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import Log from './entities/log.entity';
import CustomLogger from './custom-logger';

@Module({
  imports: [TypeOrmModule.forFeature([Log])],
  controllers: [LogController],
  providers: [CustomLogger, LogService],
  exports: [CustomLogger],
})
export class LogModule {}
