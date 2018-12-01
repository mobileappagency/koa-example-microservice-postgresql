const Broker = require('../lib/services/broker');

jest.mock('amqplib', () => ({
  connect: jest.fn()
    .mockReturnValue({
      assertQueue: jest.fn(),
      sendQueue: jest.fn()
    }),
}));


describe('Broker', () => {
  let broker;

  beforeEach(() => {
    broker = new Broker();
  });

  it('does get instantiated', () => {
    const amqplib = require('amqplib');

    expect(amqplib.connect).toHaveBeenCalledWith('amqp://localhost');
  });
});
