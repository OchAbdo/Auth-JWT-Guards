import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './jwt.strategy';
import { User } from './user.entity';

@Module({
  imports:[TypeOrmModule.forFeature([User]),
      PassportModule.register({defaultStrategy : 'jwt'}),
      JwtModule.registerAsync({
        imports:[ConfigModule],
        inject : [ConfigService],
        useFactory : (configservice : ConfigService)=>({
          secret: configservice.get<string>("JWT_SECRET"),
          signOptions:{
            expiresIn : 3600 /*configservice.get<string>("EXPIRED_TIME")*/
          }
        })
      })
],
  controllers: [AuthController],
  providers: [AuthService , UserRepository , JwtStrategy],
  exports : [JwtStrategy , PassportModule]
})
export class AuthModule {}
