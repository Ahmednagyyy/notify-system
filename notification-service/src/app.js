const express = require("express"),
  app = express();

var Kafka = require("node-rdkafka");

require("dotenv").config();
const PORT = process.env.PORT || 3000;
const KAFKA_HOST = process.env.KAFKA_HOST || "localhost:9092";

var consumer = new Kafka.KafkaConsumer(
  {
    "group.id": "kafka",
    "metadata.broker.list": KAFKA_HOST,
  },
  {}
);

console.log(`connecting to kafka}`);

consumer.connect();

consumer
  .on("ready", () => {
    console.log("consumer ready..");
    consumer.subscribe([
      "group_notification_topic",
      "single_notification_topic"
    ]);
    consumer.consume();
  })
  .on("data", function (data) {
    console.log(`received message: ${data.value}`);
  });


app.get("/", (req, res) => {
  res.send("Up and running kafka");
});


app.listen(PORT, () => {
  console.log(`listening to port: ${PORT}`);
});
