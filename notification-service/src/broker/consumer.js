var Kafka = require("node-rdkafka");

require("dotenv").config();

// Kafka config and topics values
const KAFKA_HOST = process.env.KAFKA_HOST || "localhost:9092";
const SIGNLE_NOTIFICATION_TOPIC = process.env.SIGNLE_NOTIFICATION_TOPIC || "single_notification_topic";
const GROUP_NOTIFICATION_TOPIC = process.env.GROUP_NOTIFICATION_TOPIC || "group_notification_topic";

// initateConsumer is a function to start Kafka consumer to listen over the given topics 
const initateConsumer = () => {
  var consumer = new Kafka.KafkaConsumer(
    {
      "group.id": "kafka",
      "metadata.broker.list": KAFKA_HOST,
    },
    {
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
    console.log(`received message: ${data.value}`);
  });

}


module.exports = initateConsumer



