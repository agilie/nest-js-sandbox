import { Processor, Process } from '@nestjs/bull';

@Processor()
export class UserUpdateProcessor {

    @Process()
    async updateUsers() {
        // Do some stuff here
    }
}
