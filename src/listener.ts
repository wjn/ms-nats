import nats from 'node-nats-streaming';
import { randomBytes } from 'crypto';
import { TicketCreatedListener } from './events/ticket-created-listener';

console.clear();
// config ---------------------
const cfg = {
  serviceName: 'orders-service',
  clusterId: 'ticketing',
  clientId: randomBytes(4).toString('hex'),
  natsConfig: {
    url: 'http://localhost:4222',
  },
};
// redefine clientId to include service name prefix
cfg.clientId = `${cfg.serviceName}-${randomBytes(4).toString('hex')}`;

// end config ---------------------

const stan = nats.connect(cfg.clusterId, cfg.clientId, cfg.natsConfig);

stan.on('connect', () => {
  console.log(
    `${cfg.serviceName} (${cfg.clientId}) successfully connected to NATS`
  );

  stan.on('close', () => {
    console.log(
      `NATS ${cfg.serviceName} (${cfg.clientId}) successfully CLOSED its connection.`
    );
    process.exit();
  });

  new TicketCreatedListener(stan).listen();
});

process.on('SIGINT', () => stan.close());
process.on('SIGTERM', () => stan.close());
