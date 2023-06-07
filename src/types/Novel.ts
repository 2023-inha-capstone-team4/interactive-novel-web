export interface Novel {
  id: number;
  novelName: string;
  novelImageUrl: string;
  authorId: number;
  authorName: string;
  novelIntroduce: string;
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

export interface Episode {
  id: number;
  novelDetailName: string;
  novelDetailIntroduce: string;
  novelDetailImageUrl: string;
  novelData: string;
  authorId: number;
  authorName: string;
  novelId: number;
  novelName: string;
  publisherType: string;
}

export interface BookmarkedNovel {
  novelId: number;
  novelImageUrl: number;
  novelName: string;
}
