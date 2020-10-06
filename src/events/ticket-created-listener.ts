import nats, { Message, Stan } from 'node-nats-streaming';
import { Listener } from './base-listener';
import { TicketCreatedEvent } from '../interfaces/ticket-created-event';
import { Topics } from '../enums/topics';

export class TicketCreatedListener extends Listener<TicketCreatedEvent> {
  // by providing both the type (:type) and the assignment (= assignment) we
  // guarantee that the type and value of the topic for this class is always
  // Topics.TicketCreated
  topic: Topics.TicketCreated = Topics.TicketCreated;

  // NATS query group
  queueGroupName = 'payments-service';

  // process message received from NATS
  onMessage(data: any, msg: Message) {
    console.log('Event data!', data);

    // indicate successful message parsed.
    msg.ack();
  }
}
