import nats from 'node-nats-streaming';
import { randomBytes } from 'crypto';
import { TicketCreatedPublisher } from './events/ticket-created-publisher';

console.clear();
const cfg = {
  serviceName: 'publisher',
  clusterId: 'ticketing',
  clientId: randomBytes(4).toString('hex'),
  natsConfig: {
    url: 'http://localhost:4222',
  },
  topic: 'ticket:created',
};
// redefine clientId to include service name prefix
cfg.clientId = `${cfg.serviceName}-${randomBytes(4).toString('hex')}`;

// instantiate NATS client. Community convention calls the client `stan`
const stan = nats.connect(cfg.clusterId, cfg.clientId, cfg.natsConfig);

stan.on('connect', async () => {
  console.log(
    `${cfg.serviceName} (${cfg.clientId}) successfully connected to NATS`
  );

  const publisher = new TicketCreatedPublisher(stan);

  await publisher.publish({
    id: '123',
    title: 'concert',
    price: 20,
  });
});
