import { Module } from '@nestjs/common';
import { DamageReportController } from './damage-report.controller';

@Module({
  controllers: [DamageReportController],
})
export class DamageReportModule {}
