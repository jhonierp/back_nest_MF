import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { InitDataUseCase } from '../useCase/initData.useCase';
import { Request } from '@nestjs/common';
import { AuthGuard } from 'src/shared/guards/authGuard';

@Controller('user')
@ApiTags('user')
export class UserController {
  constructor(private readonly initDataUseCase: InitDataUseCase) {}

  @Get('init-data')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  async initData(@Request() req) {
    return await this.initDataUseCase.run(req.user.sub);
  }
}
