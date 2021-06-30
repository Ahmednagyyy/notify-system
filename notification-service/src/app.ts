import * as express from "express";
import { Sequelize } from "sequelize-typescript";
import { initateConsumer } from "./broker/ConsumerService";
import { Device } from "./model/Device";
import { Group } from "./model/Group";
import { User } from "./model/User";
import { UserDevices } from "./model/UserDevices";
import { UserGroups } from "./model/UserGroups";

const app: express.Application = express();
  
require("dotenv").config();

const env = process.env.NODE_ENV || "development";

const PORT = process.env.PORT || 3000;

// initialize sequelize + register app models
const config = require(__dirname + "/config/config.js")[env];
const sequelize = new Sequelize(config);
sequelize.addModels([User, Device, Group, UserGroups, UserDevices]);

// Start Kafka listner
initateConsumer()

app.get("/", (req, res) => {
  res.send("Up and running kafka");
});


app.listen(PORT, () => {
  console.log(`listening to port: ${PORT}`);
});

module.exports = app;
