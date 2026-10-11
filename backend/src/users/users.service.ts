import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
import { PrismaService } from '../prisma/prisma.service.js';
import bcrypt from "bcryptjs";

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


  // async update(id: string, data: UpdateUserDto) {
  //   const user = await this.prisma.user.update({
  //     where: {
  //       id: id
  //     },
  //     data: {
  //       fullName: data.fullName,
  //       email: data.email,
  //       phone: data.phone
  //     },
  //     select: {
  //       fullName: true,
  //       email: true,
  //       phone: true,
  //       id: true
  //     }
  //   })
  //
  //   return {
  //     success: true,
  //     data: user,
  //     message: `Update successfully`
  //   }
  // }


  async update(id: string, data: UpdateUserDto) {
    const existingUser = await this.prisma.user.findUnique({
      where: { id },
      select: {
        fullName: true,
        email: true,
        phone: true,
      },
    });

    if (!existingUser) {
      throw new NotFoundException("User not found");
    }

    const updatedFields: string[] = [];

    if (
        data.fullName !== undefined &&
        data.fullName !== existingUser.fullName
    ) {
      updatedFields.push("full name");
    }

    if (
        data.email !== undefined &&
        data.email !== existingUser.email
    ) {
      updatedFields.push("email");
    }

    if (
        data.phone !== undefined &&
        data.phone !== existingUser.phone
    ) {
      updatedFields.push("phone");
    }

    if (updatedFields.length === 0) {
      return {
        success: true,
        data: existingUser,
        message: "No changes were made.",
      };
    }

    const user = await this.prisma.user.update({
      where: { id },
      data: {
        ...(data.fullName !== undefined && {
          fullName: data.fullName,
        }),
        ...(data.email !== undefined && {
          email: data.email,
        }),
        ...(data.phone !== undefined && {
          phone: data.phone,
        }),
      },
      select: {
        id: true,
        fullName: true,
        email: true,
        phone: true,
      },
    });

    return {
      success: true,
      data: user,
      message: `Successfully updated user's ${updatedFields.join(", ")}.`,
      updatedFields,
    };
  }

  async changePassword(id: string, data: UpdateUserDto) {
    if (!data.password) {
      throw new BadRequestException("Password is required")
    }
    const passwordHash = await bcrypt.hash(data.password!, 10)

    try {
      const user = await this.prisma.user.update({
        where: {
          id: id
        },
        data: {
          passwordHash: passwordHash
        }
      })

      return {
        success: true,
        message: "Password Change successfully"
      }
    }catch(error){
      throw new BadRequestException("Failed to change password")
    }
  }

}
