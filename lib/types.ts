export type BooruPost = {
  id: number | string;
  preview_url: string;
  file_url: string;
  tags: string[];
  source: string;
  width: number;
  height: number;
  rating: string;
  created_at: string;
  author: string;
  site: "danbooru" | "rule34" | "gelbooru";
};

export type BooruSite = BooruPost["site"];

export interface SearchParams {
  tags?: string;
  limit?: number;
  page?: number;
}
