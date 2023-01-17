import { Body, Controller, Post } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

interface UserData {
    email: string;
    firstName: string;
    lastName: string;
}

@Controller('users')
export class UsersController {

    constructor(
        private prisma: PrismaClient
    ) {
    }

    @Post()
    async createUser(
        @Body() userData: UserData
    ) {
        const user = await this.prisma.user.create({
            firstName: userData.firstName,
            lastName: userData.lastName,
            email: userData.email,
        });
        return {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            fullName: `${user.firstName} ${user.lastName}`
        }
    }
}
