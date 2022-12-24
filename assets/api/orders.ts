import { NuxtAxiosInstance } from "@nuxtjs/axios";
import { DeliveryMethodDto } from "~/assets/shared/dto/methods.dto";
import { CalculationPayloadDto } from "~/assets/shared/dto/order.dto";

export default (axios: NuxtAxiosInstance) => ({
  getCalculation(payload: CalculationPayloadDto[]): Promise<DeliveryMethodDto[] | null> {
    return axios.post(`calculation/discount`, payload).then((response) => response.data);
  },

  addOrder(payload: any): Promise<any | null> {
    return axios.post(`store/order`, payload).then((response) => response.data);
  },

  getOrderByCode(code: string): Promise<any | null> {
    return axios.get(`store/order/tracking/${code}`).then((response) => response.data);
  }
})
