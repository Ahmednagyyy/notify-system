import kafka = require('node-rdkafka');

import { PUSH_NOTIFICATION_TOPIC, SMS_NOTIFICATION_TOPIC } from "./Topics";

require("dotenv").config();

// Kafka config and topics values
const KAFKA_HOST = process.env.KAFKA_HOST || "localhost:9092";

// initateConsumer is a function to start Kafka consumer to listen over the given topics 
export const publishMessage = (message: String, topic: String) => {

  if (topic === SMS_NOTIFICATION_TOPIC || topic === PUSH_NOTIFICATION_TOPIC) {

    var producer = kafka.Producer.createWriteStream({
      'metadata.broker.list': KAFKA_HOST
    }, {}, {
      topic: SMS_NOTIFICATION_TOPIC ? SMS_NOTIFICATION_TOPIC : PUSH_NOTIFICATION_TOPIC
    });

    producer.on('error', (err) => {
      console.error('Error in our kafka stream');
      console.error(err);
    });

    const success = producer.write(Buffer.from(message));
    if (success) {
      console.log(`Sent Successfully`);
    } else {
      console.log('Too many messages in the queue already..');
    }
  }



}




