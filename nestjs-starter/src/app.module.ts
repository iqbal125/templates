import { Module, } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HealthModule } from './modules/health/health.module';
import { TodoModule } from './modules/todo/todo.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { JwtStrategy } from './modules/auth/jwt.strategy';
import { PrismaModule } from './database/prisma.module';
import {
  appConfig,
  databaseConfig,
  jwtConfig,
  swaggerConfig,
  corsConfig,
  validationSchema,
} from './utils/app.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, databaseConfig, jwtConfig, swaggerConfig, corsConfig],
      envFilePath: '.env',
      cache: true,
      validationSchema: validationSchema,
      validationOptions: {
        allowUnknown: true,
        abortEarly: false,
      },
    }),
    HealthModule,
    TodoModule,
    PrismaModule,
    AuthModule,
    UsersModule,
  ],
  controllers: [],
  providers: [JwtStrategy],
})
export class AppModule { }
