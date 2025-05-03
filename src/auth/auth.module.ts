import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
//import { GoogleStrategy } from './strategies/google.strategy';
import { UsuariosModule } from '../usuarios/usuarios.module';
import { RolesModule } from '../roles/roles.module';

@Module({
  imports: [
    ConfigModule,
    UsuariosModule,
    RolesModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET', 'mi_finca_secret'),
        signOptions: {
          expiresIn: configService.get('JWT_EXPIRES_IN', '1d'),
        },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy /*GoogleStrategy*/],
  exports: [JwtStrategy, PassportModule, AuthService],
})
export class AuthModule {}
