import { DamageDegree } from 'damage-report/damage-degree.enum';

export class DamageReportDto {
  latitude: number;
  longitude: number;
  damageDegree: `${DamageDegree}`;
}
