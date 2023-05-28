export interface Novel {
  id: number;
  novelName: string;
  authorId: number;
  authorName: string;
  novelIntroduce: string;
  novelImageUrl: string;
  publisherType: string;
  totalScore: number;
}

export interface Comment {
  id: number;
  readerId: number;
  readerName: string;
  comment: string;
  recommendAmount: number;
}
