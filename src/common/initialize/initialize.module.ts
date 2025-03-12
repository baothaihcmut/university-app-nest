import { Module } from "@nestjs/common";
import { UserSeederService } from "./user-seeder.service";
import { PrismaModule } from "../prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  providers: [UserSeederService],
  exports: [UserSeederService],
})
export class InitializeModule {}
