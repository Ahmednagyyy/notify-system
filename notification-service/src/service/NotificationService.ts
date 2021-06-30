import { injectable } from "inversify";
import "reflect-metadata";
import { NotificationMessage } from "../model/NotificationMessage";

export interface NotificationService {
    sendSingleSMS(notification: NotificationMessage): void;
    sendSinglePushNotification(notification: NotificationMessage): void;
    sendGroupSMS(notification: NotificationMessage): void;
    sendGroupPushNotification(notification: NotificationMessage): void;
}

@injectable()
export class NotificationServiceImpl implements NotificationService {

    public async sendSingleSMS(notification: NotificationMessage) {
        console.log("sendSingleSMS")
    }
    public async sendSinglePushNotification(notification: NotificationMessage) {
        console.log("sendSinglePushNotification")
    }
    public async sendGroupSMS(notification: NotificationMessage) {
        console.log("sendGroupSMS")
    }
    public async sendGroupPushNotification(notification: NotificationMessage) {
        console.log("sendGroupPushNotification")
    }


}