import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserRepository } from './user.repository';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports:[TypeOrmModule.forFeature([User]),
      PassportModule.register({defaultStrategy : 'jwt'}),
      JwtModule.registerAsync({
        imports:[ConfigModule],
        inject : [ConfigService],
        useFactory : (configservice : ConfigService)=>({
          secret: configservice.get<string>("SECRECT_JWT"),
          signOptions:{
            expiresIn : configservice.get<number>("EXPIRED_TIME")
          }
        })
      })
],
  controllers: [AuthController],
  providers: [AuthService , UserRepository],
})
export class AuthModule {}
