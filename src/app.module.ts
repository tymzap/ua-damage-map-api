import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import environment from 'environment';
import { getConnectionOptions } from 'typeorm';
import { DamageReportModule } from './damage-report/damage-report.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      ignoreEnvFile: true,
      load: [() => environment],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: async () => ({
        ...(await getConnectionOptions()),
        synchronize: false,
        migrationsRun: true,
        logging: 'all',
      }),
    }),
    DamageReportModule,
  ],
  providers: [AppService],
})
export class AppModule {}
