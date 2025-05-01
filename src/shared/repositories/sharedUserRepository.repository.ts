import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Users } from '../entities/users.entity';

@Injectable()
export class SharedUserRepository extends Repository<Users> {
  constructor(dataSource: DataSource) {
    super(Users, dataSource.createEntityManager());
  }
}
