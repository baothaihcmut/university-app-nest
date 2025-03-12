import { Injectable, OnApplicationBootstrap } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { randomUUID } from "crypto";
import { Role } from "@prisma/client";

@Injectable()
export class UserSeederService implements OnApplicationBootstrap {
  constructor(private prismaService: PrismaService) {}
  async onApplicationBootstrap() {
    //check if email exist
    await Promise.all([this.createStudent()]);
  }
  private async createStudent() {
    if (
      (await this.prismaService.user.findFirst({
        where: {
          email: "bao.thaikhmt@hcmut.edu.vn",
        },
      })) == null
    ) {
      await this.prismaService.user.create({
        data: {
          id: randomUUID().toString(),
          email: "bao.thaikhmt@hcmut.edu.vn",
          isActive: false,
          role: Role.STUDENT,
          student: {
            create: {
              studentNumber: "2210264",
              startYear: new Date(),
              endYear: new Date(),
              schoolYear: "2024",
            },
          },
        },
      });
    }
  }
}
