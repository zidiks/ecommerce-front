import { GetProductsOptions } from "~/api/dto/product.dto";
import { Paginated } from "~/shared/models/paginated.model";
import { NuxtAxiosInstance } from "@nuxtjs/axios";

export default (axios: NuxtAxiosInstance) => ({
  getProducts<T>(options?: GetProductsOptions): Promise<Paginated<T> | null> {
    return axios.post(`store/products`, options).then((response) => response.data);
  }
})
