import { Controller, Get, Post, Body } from '@nestjs/common';
import {
  RequestIp,
  RequestIpParam,
} from 'shared/decorators/request-ip.decorator';
import { CreateDamageReportDto } from 'damage-report/dto/create-damage-report.dto';

import { DamageReportService } from 'damage-report/damage-report.service';
import { DamageReportEntity } from 'damage-report/damage-report.entity';

@Controller('damage-report')
export class DamageReportController {
  constructor(private readonly damageReportService: DamageReportService) {}

  @Get()
  getDamageReports(): Promise<DamageReportEntity[]> {
    return this.damageReportService.getDamageReports();
  }

  @Post()
  async createDamageReport(
    @Body() data: CreateDamageReportDto,
    @RequestIp() requestIp: RequestIpParam,
  ): Promise<DamageReportEntity> {
    return this.damageReportService.createDamageReport({
      ...data,
      reporterIp: requestIp || undefined,
    });
  }
}
