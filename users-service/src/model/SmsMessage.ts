export class SmsMessage {
  constructor(
    message: string,
    phone: string,
  ) {
    this.message = message;
    this.phone = phone;
  }

  message: string;
  phone: string;
}
