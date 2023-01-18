import { Body, Controller, Post, Res } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { Response } from 'express';
import { PrismaClient } from '@prisma/client';

@Controller('test-2')
export class TestTwoController {

    constructor(
        private prisma: PrismaClient,
    ) {
    }

    @Post()
    @ApiOperation({summary: 'Create Feedback'})
    async createFeedback(
        @Body() body: any,
        @Res() response: Response,
    ) {
        const {title, content} = body;
        await this.prisma.feedback.create({
            title,
            content
        });
        return {
            success: true,
        }
    }
}
