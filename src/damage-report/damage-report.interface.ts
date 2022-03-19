export type DamageReport = {
  latitude: number;
  longitude: number;
  damageDegree: 'workCorrectly' | 'workPartially' | 'doesNotWork';
};
