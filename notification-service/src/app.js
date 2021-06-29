const express = require("express"),
  app = express();
  
const initateConsumer = require("./broker/consumer")

require("dotenv").config();

const PORT = process.env.PORT || 3000;


initateConsumer()

app.get("/", (req, res) => {
  res.send("Up and running kafka");
});


app.listen(PORT, () => {
  console.log(`listening to port: ${PORT}`);
});
