const express = require("express");
const amqp = require("amqplib/callback_api");
const PORT = 3001;

const app = express();

// Consumers
app.get("/products", (req, res) => {
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
      ch.assertQueue(queue, { durable: false });

      console.log("Waiting for messages from the queue...");

      ch.consume(
        queue,
        async (msg) => {
          if (msg !== null) {
            console.log("Received message:", msg.content.toString());
            await res.send(msg.content.toString());
          } else {
            console.log("No message received");
            res.status(404).send("No message received");
          }
        },
        { noAck: true }
      );
    });
  });
});

app.listen(PORT, () => {
  console.log("Products service started on port", PORT);
});
