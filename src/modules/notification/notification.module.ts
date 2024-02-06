import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios'
import { NotificationService } from './notification.service'
import { NotificationController } from './notification.controller'

@Module({
    imports: [
        HttpModule
    ],
    providers: [NotificationService],
    controllers: [NotificationController],
})

export class NotificationModule {}
