import { inject, injectable } from "inversify";
import "reflect-metadata";
import { publishMessage } from "../broker/PublisherService";
import { PUSH_NOTIFICATION_TOPIC, SMS_NOTIFICATION_TOPIC } from "../broker/Topics";
import TYPES from "../di/types";
import { Message } from "../model/Message";
import { PushNotificationMessage } from "../model/PushNotificationMessage";
import { SmsMessage } from "../model/SmsMessage";
import { User } from "../model/User";
import { UserService } from "./UserService";

export interface NotificationService {
    sendSingleSMS(notification: Message): void;
    sendSinglePushNotification(notification: Message): void;
    sendGroupSMS(notification: Message): void;
    sendGroupPushNotification(notification: Message): void;
}

@injectable()
export class NotificationServiceImpl implements NotificationService {

    private userService: UserService;

    constructor(@inject(TYPES.UsersService) userService: UserService
    ) {
        this.userService = userService;
    }

    public async sendSingleSMS(notification: Message) {
        // Get User by Id
        const user: User = await this.userService.getAllUserDevices(notification.userId)
        // Map user devices to get all his mobile numbers for sms
        user.devicesList.map(device => {
            let deviceString = JSON.stringify(device);
            let deviceJson = JSON.parse(deviceString);
            let sms = new SmsMessage(`Hi ${user.name}, ${notification.body}`, deviceJson.phone)

            console.log(`Sending SMS: \n${JSON.stringify(sms)}`)

            //Publish sms on kafka topic
            publishMessage(JSON.stringify(sms), SMS_NOTIFICATION_TOPIC)
        }
        )
    }

    public async sendSinglePushNotification(notification: Message) {
        // Get User by Id
        const user: User = await this.userService.getAllUserDevices(notification.userId)
        // Map user devices to get all his tokens for push notification
        user.devicesList.map(device => {
            let deviceString = JSON.stringify(device);
            let deviceJson = JSON.parse(deviceString);
            let pushNotification = new PushNotificationMessage(
                notification.title,
                `Hi ${user.name}, ${notification.body}`,
                deviceJson.token)

            // Check user settings to send push notifications
            if (user.notificationEnabled) {
                console.log(`Sending Push Notification: \n${JSON.stringify(pushNotification)}`)
                //Publish push notification on kafka topic
                publishMessage(JSON.stringify(pushNotification), PUSH_NOTIFICATION_TOPIC)
            }
        }
        )
    }
    public async sendGroupSMS(notification: Message) {
        // Get Users by groupId
        const users: Array<User> = await this.userService.getUserGroups(notification.groupId)
        // Map on users to get each user details
        users.map(user => {
            // Map on user devices to get his mobile numbers for sms
            user.devicesList.map(device => {
                let deviceString = JSON.stringify(device);
                let deviceJson = JSON.parse(deviceString);
                let sms = new SmsMessage(`Hi ${user.name}, ${notification.body}`, deviceJson.phone)

                console.log(`Sending SMS: \n${JSON.stringify(sms)}`)

                //Publish sms on kafka topic
                publishMessage(JSON.stringify(sms), SMS_NOTIFICATION_TOPIC)
            }
            )
        })
    }

    public async sendGroupPushNotification(notification: Message) {
        // Get Users by groupId
        const users: Array<User> = await this.userService.getUserGroups(notification.groupId)
        // Map on users to get each user details
        users.map(user => {
            // Map on user devices to get his tokens for push notifications
            user.devicesList.map(device => {
                let deviceString = JSON.stringify(device);
                let deviceJson = JSON.parse(deviceString);
                let pushNotification = new PushNotificationMessage(
                    notification.title,
                    `Hi ${user.name}, ${notification.body}`,
                    deviceJson.token)

                // Check user settings to send push notifications
                if (user.notificationEnabled) {
                    console.log(`Sending Push Notification: \n${JSON.stringify(pushNotification)}`)
                    //Publish push notification on kafka topic
                    publishMessage(JSON.stringify(pushNotification), PUSH_NOTIFICATION_TOPIC)
                }
            }
            )
        })
    }


}