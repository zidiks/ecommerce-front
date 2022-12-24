import { NuxtAxiosInstance } from "@nuxtjs/axios";
import { BrandModel } from "~/assets/shared/dto/brand.dto";

export default (axios: NuxtAxiosInstance) => ({
  getBrands(): Promise<BrandModel[] | null> {
    return axios.get(`store/brand`).then((response) => response.data);
  },
})
