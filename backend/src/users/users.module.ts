import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UsersService } from './users.service.js';
import { UsersController } from './users.controller.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { PrismaModule } from '../prisma/prisma.module.js';

@Module({
  imports: [PrismaModule, PassportModule, JwtModule.register({})],
  controllers: [UsersController],
  providers: [UsersService, PrismaService],
  exports: [UsersService],
})
export class UsersModule {}
