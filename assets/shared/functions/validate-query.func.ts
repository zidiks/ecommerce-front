import { ComparisonOperator } from "~/assets/shared/enums/mongoose-query.enum";

export function validateFilters(query: any) {
  return Object.fromEntries(Object.entries(query).filter(([key, value]: [string, any]) => {
    let res = true;
    if (value.hasOwnProperty(ComparisonOperator.in) && value[ComparisonOperator.in].length < 1) {
      res = false;
    }
    if (value.hasOwnProperty(ComparisonOperator.eq) && !value[ComparisonOperator.eq]) {
      res = false;
    }
    if (value.hasOwnProperty(ComparisonOperator.gte) && !value[ComparisonOperator.gte]) {
      value[ComparisonOperator.gte] = undefined;
    }
    if (value.hasOwnProperty(ComparisonOperator.lte) && !value[ComparisonOperator.lte]) {
      value[ComparisonOperator.lte] = undefined;
    }
    if (Object.keys(value).length < 1) {
      res = false;
    }
    return res;
  }))
}
