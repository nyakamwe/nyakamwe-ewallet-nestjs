import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios'
import { firstValueFrom } from 'rxjs'
import { SmsNotificationDto, EmailNotificationDto } from './dto';

@Injectable()
export class NotificationService {
    constructor(private readonly httpService: HttpService) {}

    async sendSmsNotification(SmsNotificationDto: SmsNotificationDto){
        const notificationApiUrl = process.env.NOTIFICATION_API_URL
        const { data } = await firstValueFrom(this.httpService.post(notificationApiUrl, {
            recipient: SmsNotificationDto.recipient,
            message: SmsNotificationDto.message
        }));

        return data
    }

    async sendEmailNotification(EmailNotificationDto: EmailNotificationDto){
        const notificationApiUrl = process.env.NOTIFICATION_API_URL
        const { data } = await firstValueFrom(this.httpService.post(notificationApiUrl, {
            applicationType: EmailNotificationDto.applicationType,
            richText: EmailNotificationDto.richText,
            plainText: EmailNotificationDto.plainText,
            subject: EmailNotificationDto.subject,
            originTitle: EmailNotificationDto.originTitle,
            recipient: EmailNotificationDto.recipient
        }));

        return data
    }
}
