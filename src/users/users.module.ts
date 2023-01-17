import { InjectQueue } from '@nestjs/bull';
import { Module, OnModuleInit } from '@nestjs/common';
import { Queue } from 'bull';
import { UsersController } from './controllers/users.controller';
import { TestController } from './controllers/test.controller';
import { UserUpdateProcessor } from './services/user-update.processor';

@Module({
    controllers: [
        UsersController,
        TestController
    ],
    providers: [
        UserUpdateProcessor
    ]
})
export class UsersModule implements OnModuleInit {

    constructor(
        @InjectQueue('Update users') private userUpdateQueue: Queue
    ) {
    }

    async onModuleInit() {
        await this.userUpdateQueue.add({}, {
            repeat: {
                every: 1000
            },
        });
    }

}
