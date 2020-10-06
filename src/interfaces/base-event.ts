import { Topics } from '../enums/topics';

export interface Event {
  topic: Topics;
  data: any;
}
