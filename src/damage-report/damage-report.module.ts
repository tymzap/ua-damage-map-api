import { Module } from '@nestjs/common';
import { DamageReportController } from './damage-report.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DamageReportEntity } from 'damage-report/damage-report.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DamageReportEntity])],
  controllers: [DamageReportController],
})
export class DamageReportModule {}
