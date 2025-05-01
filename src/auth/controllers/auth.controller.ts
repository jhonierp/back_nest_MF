import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SigInUseCase } from '../useCase/sigIn.useCase';
import { SignInRequestDto } from '../dtos/auth.dto';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly sigInUseCase: SigInUseCase) {}

  @Post('signin')
  async sigIn(@Body() sigInDto: SignInRequestDto) {
    return await this.sigInUseCase.sigIn(sigInDto);
  }
}
