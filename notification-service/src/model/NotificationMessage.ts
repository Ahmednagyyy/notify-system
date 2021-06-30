export class NotificationMessage {
  constructor(
    title: string,
    body: string,
    groupId: string,
    createdAt: Date,
    audienceType: string,
    notificationType: string
  ) {
    this.audienceType = audienceType;
    this.body = body;
    this.title = title;
    this.groupId = groupId;
    this.createdAt = createdAt;
    this.notificationType = notificationType;
  }

  title: string;
  body: string;
  groupId: string;
  createdAt: Date;
  audienceType: string;
  notificationType: string;
}
