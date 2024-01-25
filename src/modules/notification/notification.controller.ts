import { Controller, Get, Body, Post } from "@nestjs/common";
import { NotificationService } from './notification.service'
import { ApiTags } from "@nestjs/swagger";
import { SmsNotificationDto, EmailNotificationDto } from "./dto";

@Controller("notification")
export class NotificationController {
    constructor(private readonly notificationService: NotificationService) {}

    @Post('send-sms')
    sendSms(@Body() SmsNotificationDto: SmsNotificationDto){
      return this.notificationService.sendSmsNotification(SmsNotificationDto)
    }

    @Post('send-email')
    sendEmail(@Body() EmailNotificationDto: EmailNotificationDto){
        return this.notificationService.sendEmailNotification(EmailNotificationDto)
    }
}
