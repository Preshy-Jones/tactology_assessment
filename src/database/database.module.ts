import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { join } from 'path';

import Log from 'src/log/entities/log.entity';
import DatabaseLogger from './database-logger';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        logger: new DatabaseLogger(),
        host: configService.get('POSTGRES_DB_HOST'),
        port: configService.get('POSTGRES_DB_PORT'),
        username: configService.get('POSTGRES_USER'),
        password: configService.get('POSTGRES_PASSWORD'),
        database: configService.get('POSTGRES_DB'),
        ssl: configService.get('NODE_ENV') === 'dev' ? false : true,
        entities: [Log],
        migrations: ['dist/migrations/**/*{.ts,.js}'],
        cli: {
          migrationsDir: 'src/migrations',
        },
        synchronize: true,
        migrationsRun: true,

        autoLoadEntities: true,
      }),
    }),
  ],
})
export class DatabaseModule {}
