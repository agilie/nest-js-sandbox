import { BullModule, InjectQueue } from '@nestjs/bull';
import { Module, OnModuleInit } from '@nestjs/common';
import { Queue } from 'bull';
import { UsersController } from './controllers/users.controller';
import { TestController } from './controllers/test.controller';
import { UserUpdateProcessor } from './services/user-update.processor';
import { TestTwoController } from './controllers/test-two-controller';

@Module({
    imports: [
        BullModule.registerQueueAsync({
            name: 'UPDATE_USERS',
        }),
    ],
    controllers: [
        UsersController,
        TestController,
        TestTwoController
    ],
    providers: [
        UserUpdateProcessor
    ]
})
export class UsersModule implements OnModuleInit {

    constructor(
        @InjectQueue('UPDATE_USERS') private userUpdateQueue: Queue
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
