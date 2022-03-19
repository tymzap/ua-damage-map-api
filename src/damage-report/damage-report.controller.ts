import { Controller, Get } from '@nestjs/common';

import type { DamageReport } from 'damage-report/damage-report.interface';

@Controller('damage-report')
export class DamageReportController {
  @Get()
  getDamageReports(): DamageReport[] {
    return [
      {
        latitude: 50.947136,
        longitude: 24.659384,
        damageDegree: 'workCorrectly',
      },
      {
        latitude: 51.8127344,
        longitude: 30.98168677114129,
        damageDegree: 'doesNotWork',
      },
      {
        latitude: 49.6323388,
        longitude: 36.569815814347116,
        damageDegree: 'workPartially',
      },
      {
        latitude: 48.110055616206736,
        longitude: 37.10825345718006,
        damageDegree: 'workCorrectly',
      },
    ];
  }
}
