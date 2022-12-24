import { BaseProductProperty } from "~/assets/shared/enums/base-product-property.enum";

export const sortOptions = {
  default: {
    label: 'Стандартно',
  },
  priceAsc: {
    label: 'По возрастанию цены',
    value: {
      property: BaseProductProperty.TotalPrice,
      direction: 1,
    }
  },
  priceDesc: {
    label: 'По убыванию цены',
    value: {
      property: BaseProductProperty.TotalPrice,
      direction: -1,
    }
  },
  discountDesc: {
    label: 'По величине скидки',
    value: {
      property: BaseProductProperty.Discount,
      direction: -1,
    }
  },
}
