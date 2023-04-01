import { Publisher } from './Publisher';

interface Novel {
  id: number;
  publisher: Publisher;
  novelName: string;
  totalScore: number;
  firstPublishingDate: Date;
}

export type { Novel };
