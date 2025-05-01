import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { PasswordService } from './services/password.service';
import { SigInUseCase } from './useCase/sigIn.useCase';
import { Users } from 'src/shared/entities/users.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './controllers/auth.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { SharedUserRepository } from 'src/shared/repositories/sharedUserRepository.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([Users]),

    JwtModule.registerAsync({
      imports: [ConfigModule],
      global: true,
      // eslint-disable-next-line require-await
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: configService.get<string>('JWT_EXPIRES_IN') },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [AuthService, PasswordService, SigInUseCase, SharedUserRepository],
  controllers: [AuthController],
})
export class AuthModule {}
