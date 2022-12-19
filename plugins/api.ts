import Products from "~/assets/api/products";
import Articles from "~/assets/api/articles";
import Categories from "~/assets/api/categories";
import Brands from "~/assets/api/brands";
import Types from "~/assets/api/types";

export default (context: any, inject: any) => {
  const factories = {
    products: Products(context.$axios),
    articles: Articles(context.$axios),
    categories: Categories(context.$axios),
    brands: Brands(context.$axios),
    types: Types(context.$axios),
  };

  inject("api", factories);
};
