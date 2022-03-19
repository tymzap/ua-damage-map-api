import { Controller, Get, Post } from '@nestjs/common';
import {
  RequestIp,
  RequestIpParam,
} from 'shared/decorators/request-ip.decorator';

import type { DamageReport } from 'damage-report/damage-report.interface';

@Controller('damage-report')
export class DamageReportController {
  @Get()
  getDamageReports(): DamageReport[] {
    return [
      {
        latitude: 50.947136,
        longitude: 24.659384,
        damageDegree: 'worksPartially',
      },
      {
        latitude: 51.8127344,
        longitude: 30.98168677114129,
        damageDegree: 'doesNotWork',
      },
      {
        latitude: 49.6323388,
        longitude: 36.569815814347116,
        damageDegree: 'worksCorrectly',
      },
      {
        latitude: 48.110055616206736,
        longitude: 37.10825345718006,
        damageDegree: 'doesNotWork',
      },
    ];
  }

  @Post()
  submitDamageReport(@RequestIp() requestIp: RequestIpParam) {
    return [requestIp];
  }
}
