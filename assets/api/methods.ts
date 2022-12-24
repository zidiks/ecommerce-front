import { NuxtAxiosInstance } from "@nuxtjs/axios";
import { DeliveryMethodDto, PaymentMethodDto } from "~/assets/shared/dto/methods.dto";

export default (axios: NuxtAxiosInstance) => ({
  getDeliveryMethods(): Promise<DeliveryMethodDto[] | null> {
    return axios.get(`store/delivery-method`).then((response) => response.data);
  },

  getPaymentMethods(): Promise<PaymentMethodDto[] | null> {
    return axios.get(`store/payment-method`).then((response) => response.data);
  }
})
