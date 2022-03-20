import { Injectable } from '@nestjs/common';
import { DamageReportRepository } from 'damage-report/damage-report.repository';
import url from 'url';
import { map } from 'rxjs';
import { firstValueFrom } from 'rxjs';

import { CreateDamageReportDto } from 'damage-report/dto/create-damage-report.dto';
import { DamageReportEntity } from 'damage-report/damage-report.entity';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class DamageReportService {
  constructor(
    private readonly configService: ConfigService<Environment>,
    private readonly httpService: HttpService,
    private readonly damageReportRepository: DamageReportRepository,
  ) {}

  async getDamageReports(): Promise<
    {
      entity: DamageReportEntity;
      features: { placeName: string; placeCategory?: string };
    }[]
  > {
    const damageReportEntities = await this.damageReportRepository.findMany();
    return Promise.all(
      damageReportEntities.map(async (damageReportEntity) => {
        const locationFeatures = await this.getDamageReportLocationFeatures({
          latitude: damageReportEntity.point.coordinates[0],
          longitude: damageReportEntity.point.coordinates[1],
        });
        return {
          entity: damageReportEntity,
          features: {
            placeName: locationFeatures.name,
            placeCategory: locationFeatures.category,
          },
        };
      }),
    );
  }

  async getDamageReportLocationFeatures(params: {
    latitude: number;
    longitude: number;
  }): Promise<{
    name: string;
    category?: string;
  }> {
    const url = this.buildReverseGeocodingUrl(params);
    const { data } = await firstValueFrom(this.httpService.get(url));
    const feature = data.features[0];
    return {
      name: feature.place_name,
      category: feature.properties?.category || undefined,
    };
  }

  private buildReverseGeocodingUrl(params: {
    latitude: number;
    longitude: number;
  }): string {
    const { latitude, longitude } = params;
    const mapboxKey = this.configService.get<string>('MAPBOX_KEY');
    return url.format({
      host: 'https://api.mapbox.com/geocoding/v5/mapbox.places/',
      pathname: `${longitude},${latitude}.json`,
      query: {
        type: 'address',
        reverseMode: 'score',
        routing: true,
        limit: 1,
        access_token: mapboxKey,
      },
    });
  }

  createDamageReport(
    data: CreateDamageReportDto & { reporterIp?: string },
  ): Promise<DamageReportEntity> {
    return this.damageReportRepository.createAndSaveOne(data);
  }
}
