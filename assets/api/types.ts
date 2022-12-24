import { NuxtAxiosInstance } from "@nuxtjs/axios";
import { TypePropertyModel } from "~/assets/shared/dto/type.dto";

export default (axios: NuxtAxiosInstance) => ({
  getTypesUniqueProperties(types: string[]): Promise<TypePropertyModel[] | null> {
    return axios.get(`store/type/filters`, { params: { types: types.join(',') } }).then((response) => response.data);
  },
})
