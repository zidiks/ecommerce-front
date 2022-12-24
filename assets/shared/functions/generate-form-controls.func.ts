import { ProductTypePropertyType } from "~/assets/shared/enums/product-property.enum";
import { ComparisonOperator } from "~/assets/shared/enums/mongoose-query.enum";
import { FilterModel } from "~/assets/shared/models/filters.model";

export function generateFormControls(filters: FilterModel[]) {
  return Object.fromEntries(filters.map(filter => {
    let value;
    switch (filter.type) {
      case ProductTypePropertyType.NumberInput:
      case ProductTypePropertyType.NumberSelect:
        value = { [ComparisonOperator.gte]: null, [ComparisonOperator.lte]: null };
        break;
      case ProductTypePropertyType.StringSelect:
      case ProductTypePropertyType.StringMultiSelect:
        value = { [ComparisonOperator.in]: filter.default || [] };
        break;
      case ProductTypePropertyType.CheckBox:
        value = { [ComparisonOperator.eq]: filter.default || false };
        break;
      default:
        value = { [ComparisonOperator.eq]: null };
        break;
    }
    return [filter.code, value];
  }));
}
