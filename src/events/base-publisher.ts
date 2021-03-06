import { Stan } from 'node-nats-streaming';
import { ImportsNotUsedAsValues } from 'typescript';
import { Event } from '../interfaces/base-event';
import { Topics } from '../enums/topics';

export abstract class Publisher<T extends Event> {
  abstract topic: T['topic'];

  // stan is nats backwards and what the NATS community calls the NATS client
  private client: Stan;

  constructor(client: Stan) {
    this.client = client;
  }

  publish(data: T['data']) {
    return new Promise((resolve, reject) => {
      this.client.publish(this.topic, JSON.stringify(data), (err) => {
        if (err) {
          return reject(err);
        }
        console.log(`${this.topic} event published to NATS`);
        resolve();
      });
    });
  }
}
