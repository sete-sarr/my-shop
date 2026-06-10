import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import{UsersModule}from'src/users/users.module';
import{JwtModule}from'@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AuthController } from './auth.controller';
import{jwtConstants}from'./constants'


@Module({
  
  providers: [AuthService],
  imports:[UsersModule, JwtModule.registerAsync({inject:[ConfigService],
    useFactory:async(configService: ConfigService)=>(
      {
        secret: jwtConstants.secret,
        signOptions: { expiresIn: '24h' },
        global: true,
      }
    )
  })
   
  ],
  controllers: [AuthController],
})
export class AuthModule {}
