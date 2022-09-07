import { UsefulModule } from './useful/userful.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Logger, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { DatabaseModule } from './database/database.module';
import { ProductsModule } from './products/products.module';
import { OrderModule } from './order/order.module';
import { MembershipModule } from './membership/membership.module';
import { SiteModule } from './site/site.module';
import { RefundModule } from './refund/refund.module';
import { PointsModule } from './points/points.module';
import { BullModule } from '@nestjs/bull';
import { RedisModule } from 'nestjs-redis';
import * as Joi from 'joi';
import { MessageProducerService } from './message.producer.service';
import { MessageConsumer } from './message.consumer';

const ENV = process.env.NODE_ENV;
Logger.debug(ENV);

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `src/config/env/.${ENV}.env`,
      validationSchema: Joi.object({
        NODE_ENV: Joi.string().valid('development', 'stage').required(),
        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.string().required(),
        DB_USER: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_NAME: Joi.string().required(),
        JWT_SECRET: Joi.string().required(),
      }),
    }),
    BullModule.forRoot({
      redis: {
        host: '3.35.8.76',
        port: 5003,
      },
    }),
    BullModule.registerQueue({
      name: 'message-queue',
    }),
    UserModule,
    DatabaseModule,
    OrderModule,
    ProductsModule,
    MembershipModule,
    SiteModule,
    RefundModule,
    PointsModule,
    UsefulModule,
  ],
  controllers: [AppController],
  providers: [AppService, MessageProducerService, MessageConsumer],
})
export class AppModule {}
