import { Injectable } from '@nestjs/common';
import { SharedUserRepository } from 'src/shared/repositories/sharedUserRepository.repository';

@Injectable()
export class InitDataService {
  constructor(private readonly userRepositorty: SharedUserRepository) {}

  async run(userId: number) {
    return await this.userRepositorty.findOne({
      where: { id: userId },
    });
  }
}
