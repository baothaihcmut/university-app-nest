import { Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { UsersRespository } from './repositories/users.repository';
import { CommonModule } from 'src/common/common.module';

@Module({
  providers: [UsersService, UsersRespository],
  imports: [CommonModule],
})
export class UsersModule {}
