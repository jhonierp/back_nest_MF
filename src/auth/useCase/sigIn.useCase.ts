import { HttpException, Injectable } from '@nestjs/common';
import { SharedUserRepository } from 'src/shared/repositories/sharedUserRepository.repository';
import { PasswordService } from '../services/password.service';
import { AuthTokenResponseDto, SignInRequestDto } from '../dtos/auth.dto';
import { AuthService } from '../services/auth.service';

@Injectable()
export class SigInUseCase {
  constructor(
    private readonly sharedUserRepository: SharedUserRepository,
    private readonly passwordService: PasswordService,
    private readonly authService: AuthService,
  ) {}

  async sigIn(
    signInRequestDto: SignInRequestDto,
  ): Promise<AuthTokenResponseDto> {
    const user = await this.sharedUserRepository.findOne({
      where: { email: signInRequestDto.email },
    });

    if (!user) {
      throw new HttpException('User not found', 404);
    }

    const isPassWordValid = await this.passwordService.compare(
      signInRequestDto.password,
      user.password,
    );

    if (!isPassWordValid) {
      throw new HttpException('Invalid Acces Data', 400);
    }

    const tokens = await this.authService.generateTokens({
      sub: user.id,
      email: user.email,
    });

    return tokens;
  }
}
