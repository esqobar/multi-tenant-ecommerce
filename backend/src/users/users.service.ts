import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  /*Find By User Email */
  findByEmail(email: string) {
    const data = this.prisma.user.findUnique({
      where: { email },
    });
    return data
  }

  /*Find By User Id */
  findById(id: string) {
    const data = this.prisma.user.findUnique({
      where: {
        id
      }
    })
    return data
  }
}
