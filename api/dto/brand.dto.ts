import { ApiId } from "~/shared/models/api.model";

export interface BrandModel extends ApiId {
  name: string;
  description?: string;
  origin: string;
}
