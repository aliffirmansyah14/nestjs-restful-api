import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import { ConfigModule } from '@nestjs/config';
import { ValidationService } from './validation.service';
import { DtoService } from './dto.service';
import { APP_FILTER } from '@nestjs/core';
import { ErrorFiler } from './error.filter';

@Global()
@Module({
  imports: [
    WinstonModule.forRoot({
      format: winston.format.json(),
      level: 'debug',
      transports: [new winston.transports.Console()],
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  providers: [
    PrismaService,
    ValidationService,
    {
      provide: APP_FILTER,
      useClass: ErrorFiler,
    },
  ],
  exports: [PrismaService, ValidationService],
})
export class CommonModule {}
