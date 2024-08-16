const express = require("express");
const amqp = require("amqplib/callback_api");
const PORT = 3000;

const app = express();

app.get("/users", (req, res) => {
  let data = {
    id: 1,
    name: "John",
    age: 25,
  };

  // Producers
  amqp.connect("amqp://localhost", (err, conn) => {
    if (err) {
      console.error("Failed to connect to RabbitMQ", err);
      res.status(500).send("Failed to connect to RabbitMQ");
      return;
    }

    conn.createChannel((err, ch) => {
      if (err) {
        console.error("Failed to create a channel", err);
        res.status(500).send("Failed to create a channel");
        return;
      }

      const queue = "message_queue_user";
      const msg = JSON.stringify(data);
      ch.assertQueue(queue, { durable: false });
      ch.sendToQueue(queue, Buffer.from(msg));
      console.log(`Sent ${msg} to ${queue}`);
    });
  });

  res.send("Message from user service!!!!");
});

app.listen(PORT, () => {
  console.log("User service started on port", PORT);
});
