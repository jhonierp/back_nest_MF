import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';

import { ConfigService } from '@nestjs/config';
import { AuthTokenResponseDto, TokenPayloadModel } from '../dtos/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  generateTokens(payload: TokenPayloadModel): AuthTokenResponseDto {
    const accessToken = this.jwtService.sign(payload);
    const refreshToken = this.jwtService.sign(
      {
        sub: payload.sub,
      },
      { expiresIn: this.configService.get('JWT_EXPIRES_IN') },
    );

    return {
      accessToken,
      refreshToken,
    };
  }
}
