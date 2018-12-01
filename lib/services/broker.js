const amqp = require('amqplib');

class Broker {
  constructor() {
    this.conn = amqp.connect('amqp://localhost');
  }

  async dispatch (message) {
    const ch = await this.conn.createChannel();
    ch.assertQueue('hello', { durable: false });
    ch.sendToQueue('hello', Buffer.from(message));
  }
}

module.exports = Broker;
