import { DamageDegree } from 'damage-report/damage-degree.enum';

export type DamageReport = {
  latitude: number;
  longitude: number;
  damageDegree: `${DamageDegree}`;
};
