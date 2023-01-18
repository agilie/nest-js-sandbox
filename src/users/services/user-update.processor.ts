import { Process, Processor } from '@nestjs/bull';

@Processor('UPDATE_USERS')
export class UserUpdateProcessor {

    @Process()
    async updateUsers() {
        // Do some update stuff here
    }
}
