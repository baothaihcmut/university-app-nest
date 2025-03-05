import { Role as prismaRole } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { User } from '../entities/user';
import { Role } from 'src/common/enums/role';
import { UUID } from 'crypto';

@Injectable()
export class UsersRespository {
  constructor(private prismaService: PrismaService) {}

  async createUser(userData: User, tx?: PrismaService) {
    const client = tx || this.prismaService;

    await client.user.create({
      data: {
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        password: userData.password,
        currentRefreshToken: userData.currentRefreshToken,
        phoneNumber: userData.phoneNumber,
        birthplace: userData.birthplace,
        birthday: userData.birthday,
        socialNetworkInfo: userData.socialNetworkInfo,
        address: userData.address,
        role:
          userData.role === Role.STUDENT
            ? prismaRole.STUDENT
            : prismaRole.TEACHER,
        isActive: userData.isActive ?? false,
        image: userData.image,
      },
    });
    if (userData.role === Role.STUDENT && userData.student) {
      await client.student.create({
        data: {
          userId: userData.id,
          studentNumber: userData.student.studentId,
          schoolYear: userData.student.schoolYear,
          startYear: userData.student.startYear,
          endYear: userData.student.endYear,
          majorId: userData.student.majorId,
        },
      });
    } else if (userData.role === Role.TEACHER && userData.teacher) {
      await client.teacher.create({
        data: {
          userId: userData.id,
          teacherNumber: userData.teacher.teacherId,
        },
      });
    }
  }

  async findUserByEmail(email: string, tx?: PrismaService): Promise<User> {
    const client = tx || this.prismaService;
    const res = await client.user.findFirst({
      where: {
        email,
      },
    });
    return new User({
      ...res,
      role: res.role === 'STUDENT' ? Role.STUDENT : Role.TEACHER,
      id: res.id as UUID,
    });
  }
}
