export class EmailNotificationDto {
    applicationType: string;
    richText: string;
    plainText: string | null;
    subject: string;
    originTitle: string;
    recipient: string
}
