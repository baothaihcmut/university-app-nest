import { Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { UsersRespository } from './repositories/users.repository';
import { CommonModule } from 'src/common/common.module';
import { UserInteractor } from './interactors/user.interactor';

@Module({
  providers: [UsersService, UsersRespository, UserInteractor],
  imports: [CommonModule],
  exports: [UsersService, UsersRespository],
})
export class UsersModule {}
