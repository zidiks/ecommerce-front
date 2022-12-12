import { GetProductsOptions, ProductModel } from "~/assets/shared/dto/product.dto";
import { Paginated } from "~/assets/shared/models/paginated.model";
import { NuxtAxiosInstance } from "@nuxtjs/axios";

export default (axios: NuxtAxiosInstance) => ({
  getProducts<T>(options?: GetProductsOptions): Promise<Paginated<T> | null> {
    return axios.post(`store/products`, options).then((response) => response.data);
  },

  getProductById(id: string): Promise<ProductModel | null> {
    return axios.get(`store/product/${id}`).then((response) => response.data);
  }
})
