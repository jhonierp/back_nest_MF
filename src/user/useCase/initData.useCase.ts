import { Injectable } from '@nestjs/common';
import { InitDataService } from '../services/initData.service';

@Injectable()
export class InitDataUseCase {
  constructor(private readonly initDatService: InitDataService) {}

  async run(userId: number) {
    return await this.initDatService.run(userId);
  }
}
