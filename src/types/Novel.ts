import { Publisher } from './Publisher';

interface Novel {
  id: number;
  publisher: Publisher;
  name: string;
  totalScore: number;
  publishedDate: Date;
}

export type { Novel };
