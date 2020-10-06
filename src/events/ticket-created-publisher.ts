import { Publisher } from './base-publisher';
import { TicketCreatedEvent } from '../interfaces/ticket-created-event';
import { Topics } from '../enums/topics';
import { TicketCreatedListener } from './ticket-created-listener';

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  readonly topic = Topics.TicketCreated;
  // publish function is defined in Publisher base class
}
