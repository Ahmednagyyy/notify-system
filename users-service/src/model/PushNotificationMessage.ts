export class PushNotificationMessage {
  constructor(
    title: string,
    body: string,
    token: string
  ) {
    this.body = body;
    this.title = title;
    this.token = token;
  }

  title: string;
  body: string;
  token: string;
}
