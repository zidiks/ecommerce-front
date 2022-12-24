import { NuxtAxiosInstance } from "@nuxtjs/axios";;
import { CategoryDto } from "~/assets/shared/dto/category.dto";

export default (axios: NuxtAxiosInstance) => ({
  getCategoriesTree<T>(): Promise<CategoryDto | null> {
    return axios.get(`store/category/tree`,).then((response) => response.data);
  },
})
