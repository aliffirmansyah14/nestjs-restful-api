import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma.service';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  async findAll() {
    return await this.prismaService.user.findMany();
  }
}
