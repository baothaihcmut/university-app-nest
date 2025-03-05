import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Injectable()
export class UsersRespository {
  constructor(private prismaService: PrismaService) {}
}
