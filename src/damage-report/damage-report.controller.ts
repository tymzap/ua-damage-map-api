import { Controller, Get, Post, Body } from '@nestjs/common';
import {
  RequestIp,
  RequestIpParam,
} from 'shared/decorators/request-ip.decorator';
import { CreateDamageReportDto } from 'damage-report/dto/create-damage-report.dto';

import { DamageReportService } from 'damage-report/damage-report.service';
import type { DamageReportDto } from 'damage-report/dto/damage-report.dto';

@Controller('damage-report')
export class DamageReportController {
  constructor(private readonly damageReportService: DamageReportService) {}

  @Get()
  async getDamageReports(): Promise<DamageReportDto[]> {
    const damageReportEntities =
      await this.damageReportService.getDamageReports();
    return damageReportEntities.map(({ entity, features }) => ({
      ...entity.getDTO(),
      ...features,
    }));
  }

  @Post()
  async createDamageReport(
    @Body() data: CreateDamageReportDto,
    @RequestIp() requestIp: RequestIpParam,
  ): Promise<DamageReportDto> {
    const newDamageReport = await this.damageReportService.createDamageReport({
      latitude: data.latitude,
      longitude: data.longitude,
      damageDegree: data.damageDegree,
      description: data.description,
      reporterIp: requestIp || undefined,
    });
    return newDamageReport.getDTO();
  }
}
