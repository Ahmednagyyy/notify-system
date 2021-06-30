import { KafkaConsumer } from "node-rdkafka";
import { NotificationMessage } from "../model/NotificationMessage";

require("dotenv").config();

// Kafka config and topics values
const KAFKA_HOST = process.env.KAFKA_HOST || "localhost:9092";
const SIGNLE_NOTIFICATION_TOPIC = process.env.SIGNLE_NOTIFICATION_TOPIC || "single_notification_topic";
const GROUP_NOTIFICATION_TOPIC = process.env.GROUP_NOTIFICATION_TOPIC || "group_notification_topic";

// initateConsumer is a function to start Kafka consumer to listen over the given topics 
export const initateConsumer = () => {
  var consumer = new KafkaConsumer(
    {
      "group.id": "kafka",
      "metadata.broker.list": KAFKA_HOST,
    },
    {
      // To be able to listen in app start
      'auto.offset.reset': 'smallest'
    }
  );

  console.log(`connecting to kafka`);

  consumer.connect();

  consumer.on("ready", () => {
    console.log("consumer ready..");
    consumer.subscribe([
      SIGNLE_NOTIFICATION_TOPIC,
      GROUP_NOTIFICATION_TOPIC
    ]);
    consumer.consume();
  })
    .on("data", function (data) {

      const notificationJson = JSON.parse(data.value.toString())

      let notification = new NotificationMessage(notificationJson.title,
        notificationJson.body,
        notificationJson.groupId,
        notificationJson.createdAt,
        notificationJson.audienceType,
        notificationJson.notificationType)

      if (notification.audienceType === 'GROUP') {
        if (notification.notificationType.includes('SMS')) {
          console.log(`GROUP SMS Notification Received\nMessage: ${JSON.stringify(notification)}`);
        }
        if (notification.notificationType.includes('PUSH')) {
          console.log(`GROUP Push Notification Received\nMessage: ${JSON.stringify(notification)}`);
        }
      }

      if (notification.audienceType === 'SINGLE') {
        if (notification.notificationType.includes('SMS')) {
          console.log(`SINGLE SMS Notification Received\nMessage: ${JSON.stringify(notification)}`);
        }
        if (notification.notificationType.includes('PUSH')) {
          console.log(`SINGLE Push Notification Received\nMessage: ${JSON.stringify(notification)}`);
        }
      }
      return notification;
    });

}




