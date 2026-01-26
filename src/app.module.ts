import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true , envFilePath : '.env.dev' }),
  TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => ({
      type: 'postgres',
      host: 'localhost',
      port: configService.get<number>('DB_PORT'),
      username: configService.get<string>('DB_USER'),
      password: configService.get<string>('DB_PASS'),
      database: configService.get<string>('DB_NAME'),
      autoLoadEntities: true,
      synchronize: true,
    })
  })
    , AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
