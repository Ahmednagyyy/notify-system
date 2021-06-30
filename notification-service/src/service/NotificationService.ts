import { inject, injectable } from "inversify";
import "reflect-metadata";
import TYPES from "../di/types";
import { NotificationMessage } from "../model/NotificationMessage";
import { User } from "../model/User";
import { UserService } from "./UserService";

export interface NotificationService {
    sendSingleSMS(notification: NotificationMessage): void;
    sendSinglePushNotification(notification: NotificationMessage): void;
    sendGroupSMS(notification: NotificationMessage): void;
    sendGroupPushNotification(notification: NotificationMessage): void;
}

@injectable()
export class NotificationServiceImpl implements NotificationService {

    private userService: UserService;

    constructor(@inject(TYPES.UsersService) userService: UserService
    ) {
        this.userService = userService;
    }

    public async sendSingleSMS(notification: NotificationMessage) {
        console.log("sendSingleSMS")

        const userDb: User = await this.userService.getAllUserDevices(notification.userId)
        console.log(`${JSON.stringify(userDb)}`)
    }
    public async sendSinglePushNotification(notification: NotificationMessage) {
        console.log("sendSinglePushNotification")
        
        const userDb: User = await this.userService.getAllUserDevices(notification.userId)
        console.log(`${JSON.stringify(userDb)}`)
    }
    public async sendGroupSMS(notification: NotificationMessage) {
        console.log("sendGroupSMS")
    }
    public async sendGroupPushNotification(notification: NotificationMessage) {
        console.log("sendGroupPushNotification")
    }


}