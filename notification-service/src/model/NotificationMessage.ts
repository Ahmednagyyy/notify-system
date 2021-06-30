export class NotificationMessage {
  constructor(
    title: string,
    body: string,
    groupId: string,
    userId: string,
    createdAt: Date,
    audienceType: string,
    notificationType: string
  ) {
    this.audienceType = audienceType;
    this.body = body;
    this.title = title;
    this.userId = userId;
    this.groupId = groupId;
    this.createdAt = createdAt;
    this.notificationType = notificationType;
  }

  title: string;
  body: string;
  groupId: string;
  userId: string;
  createdAt: Date;
  audienceType: string;
  notificationType: string;
}
