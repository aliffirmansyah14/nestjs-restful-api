import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommonModule } from './common/common.module';
import { UserModule } from './user/user.module';
import { LogMiddleware } from './log/log.middleware';
import { AuthMiddeware } from './common/auth.middleware';
import { ContactModule } from './contact/contact.module';
import { AddressModule } from './address/address.module';

@Module({
  imports: [CommonModule, UserModule, ContactModule, AddressModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LogMiddleware).forRoutes({
      path: '/*',
      method: RequestMethod.ALL,
    });
    consumer.apply(AuthMiddeware).forRoutes({
      path: '/api/*',
      method: RequestMethod.ALL,
    });
  }
}
