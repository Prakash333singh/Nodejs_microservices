const { Kafka } = require("kafkajs");

// Create a Kafka client
const kafka = new Kafka({
  clientId: "my-app",
  brokers: ["localhost:9092"],
});

// Create a producer
const producer = kafka.producer();

async function sendMessage() {
  await producer.connect();
  await producer.send({
    topic: "test-topic",
    messages: [{ value: "Hello Kafka!" }],
  });
  await producer.disconnect();
}

sendMessage().catch(console.error);
