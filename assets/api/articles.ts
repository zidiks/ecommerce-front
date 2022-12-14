import { Paginated } from "~/assets/shared/models/paginated.model";
import { NuxtAxiosInstance } from "@nuxtjs/axios";
import { ArticleModel, FilterArticleDTO } from "~/assets/shared/dto/article.dto";

export default (axios: NuxtAxiosInstance) => ({
  getArticles<T>(options?: FilterArticleDTO): Promise<Paginated<T> | null> {
    return axios.get(`article`, { params: options }).then((response) => response.data);
  },

  getArticleById(id: string): Promise<ArticleModel | null> {
    return axios.get(`article/${id}`).then((response) => response.data);
  }
})
