
require("dotenv").config();

export const SMS_NOTIFICATION_TOPIC = process.env.SMS_NOTIFICATION_TOPIC || "sms_notification_topic";
export const PUSH_NOTIFICATION_TOPIC = process.env.PUSH_NOTIFICATION_TOPIC || "push_notification_topic";
export const SIGNLE_NOTIFICATION_TOPIC = process.env.SIGNLE_NOTIFICATION_TOPIC || "single_notification_topic";
export const GROUP_NOTIFICATION_TOPIC = process.env.GROUP_NOTIFICATION_TOPIC || "group_notification_topic";
