import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { envSchema } from './utils/env/env.schema';
import { EnvModule } from './utils/env/env.module';
import { EnvService } from './utils/env/env.service';
import { getDbConfig } from './config/database';
import { BooksModule } from './books/books.module';
import { CasbinModule } from './utils/casbin/casbin.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate: (config) => envSchema.parse(config),
    }),
    TypeOrmModule.forRootAsync({
      imports: [EnvModule],
      inject: [EnvService],
      useFactory: (envService: EnvService) => getDbConfig(envService),
    }),
    CasbinModule.register({
      model: './model.conf',
      policy: './policy.csv',
      // policy: createTypeORMAdapter(),
      getEnforcerParamsFromContext: (ctx) => {
        const request = ctx.switchToHttp().getRequest();
        return {
          subject: request.query.subject,
          tenant: request.query.tenant,
        };
      },
    }),
    BooksModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
