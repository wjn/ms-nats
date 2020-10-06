import nats, { Message, Stan } from 'node-nats-streaming';
import { Listener } from './base-listener';
import { TicketCreatedEvent } from '../interfaces/ticket-created-event';
import { Topics } from '../enums/topics';

export class TicketCreatedListener extends Listener<TicketCreatedEvent> {
  // by providing both the `readonly` and the assignment (= assignment) we
  // guarantee that the type and value of the topic for this class is always
  // Topics.TicketCreated and cannot be changed in this class.
  //
  // `readonly` is similar to the `final` keyword in JAVA
  readonly topic = Topics.TicketCreated;

  // NATS query group
  queueGroupName = 'payments-service';

  // process message received from NATS
  onMessage(data: TicketCreatedEvent['data'], msg: Message) {
    console.log(`Event ${msg.getSequence()} data >>>`);
    console.log(`ID: ${data.id}`);
    console.log(`Title: ${data.title}`);
    console.log(`Price: ${data.price}`);

    // indicate successful message parsed.
    msg.ack();
  }
}
