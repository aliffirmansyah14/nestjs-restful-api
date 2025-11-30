import {
  Inject,
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { PrismaPg } from '@prisma/adapter-pg';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { PrismaClient } from 'prisma/generated/prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor(@Inject(WINSTON_MODULE_PROVIDER) private logger: Logger) {
    const adapter = new PrismaPg({
      connectionString: process.env.DATABASE_URL!,
    });
    super({
      adapter,
      log: [
        {
          emit: 'event',
          level: 'info',
        },
        {
          emit: 'event',
          level: 'warn',
        },
        {
          emit: 'event',
          level: 'error',
        },
        {
          emit: 'event',
          level: 'query',
        },
      ],
    });
  }

  async onModuleInit() {
    this.$on('info' as never, (e) => {
      this.logger.log(e);
    });
    this.$on('error' as never, (e) => {
      this.logger.error(e);
    });
    this.$on('warn' as never, (e) => {
      this.logger.error(e);
    });
    this.$on('query' as never, (e) => {
      this.logger.error(e);
    });
    await this.$connect();
    console.log('db connected');
  }

  async onModuleDestroy() {
    await this.$disconnect();
    console.info('db disconnected');
  }
}
