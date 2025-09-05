export interface INews {
  source: { id: string | null; name: string };
  author: string | null;
  title: string;
  description: string | null;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  content: string | null;
}

export interface INewsResponse {
  status: string;
  totalResults: number;
  articles: INews[];
}

export interface ICategory {
  name: string;
  value: string;
}