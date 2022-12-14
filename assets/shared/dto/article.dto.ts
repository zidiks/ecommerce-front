import { ApiId, ApiTimestamp } from "~/assets/shared/models/api.model";

export interface FilterArticleDTO {
  search?: string;
  tags?: string;
  sort?: string;
  asc?: number;
  preview?: boolean;
  limit?: number;
  page?: number;
}

export interface ArticleModelPrev extends ApiId, ApiTimestamp {
  media: string;
  title: string;
  description: string;
  tags: string[];
}

export interface ArticleModel extends ArticleModelPrev {
  content: string;
}
