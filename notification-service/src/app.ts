import * as express from "express";
import { initateConsumer } from "./broker/ConsumerService";

const app: express.Application = express();
  

require("dotenv").config();

const PORT = process.env.PORT || 3000;


initateConsumer()

app.get("/", (req, res) => {
  res.send("Up and running kafka");
});


app.listen(PORT, () => {
  console.log(`listening to port: ${PORT}`);
});

module.exports = app;
