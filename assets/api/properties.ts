import { NuxtAxiosInstance } from "@nuxtjs/axios";
import { TypePropertyModel } from "~/assets/shared/dto/type.dto";

export default (axios: NuxtAxiosInstance) => ({
  getTypesProperties(): Promise<TypePropertyModel[] | null> {
    return axios.get(`store/property`).then((response) => response.data);
  },
})
