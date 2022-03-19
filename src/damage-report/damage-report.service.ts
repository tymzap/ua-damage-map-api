import { Injectable } from '@nestjs/common';
import { DamageReportRepository } from 'damage-report/damage-report.repository';

import { CreateDamageReportDto } from 'damage-report/dto/create-damage-report.dto';
import { DamageReportEntity } from 'damage-report/damage-report.entity';

@Injectable()
export class DamageReportService {
  constructor(
    private readonly damageReportRepository: DamageReportRepository,
  ) {}

  getDamageReports(): Promise<DamageReportEntity[]> {
    return this.damageReportRepository.findMany();
  }

  createDamageReport(
    data: CreateDamageReportDto & { reporterIp?: string },
  ): Promise<DamageReportEntity> {
    return this.damageReportRepository.createAndSaveOne(data);
  }
}
