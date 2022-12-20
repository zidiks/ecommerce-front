import { ApiId } from "~/assets/shared/models/api.model";

export interface DeliveryMethodDto extends ApiId {
  name: string;
  description: string;
  fields: string[];
  paymentMethods: string[];
}

export interface PaymentMethodDto extends ApiId {
  name: string;
  description: string;
}
