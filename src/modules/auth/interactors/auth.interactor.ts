import { Injectable } from '@nestjs/common';
import { LoggerService } from 'src/common/logger/logger.service';
import { UsersRespository } from 'src/modules/users/repositories/users.repository';

@Injectable()
export class AuthInteractor {
  constructor(
    private userRepo: UsersRespository,
    private loggerService: LoggerService,
  ) {}

  async signUp() {
    this.loggerService.info('test', {
      id: '123',
    });
  }
}
