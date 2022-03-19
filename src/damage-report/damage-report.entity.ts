import { BaseEntity } from 'shared/entities/shared.entity';
import { Column, Entity } from 'typeorm';
import type { Point } from 'geojson';
import { DamageDegree } from 'damage-report/damage-degree.enum';

@Entity({
  name: 'damage-report',
})
export class DamageReportEntity extends BaseEntity {
  @Column({
    type: 'geometry',
    spatialFeatureType: 'Point',
  })
  point: Point;

  @Column({
    type: 'enum',
    enum: DamageDegree,
  })
  damageDegree: `${DamageDegree}`;

  @Column({
    type: 'text',
    nullable: true,
  })
  reporterIp: string | null;
}
