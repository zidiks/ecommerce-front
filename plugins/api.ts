import Products from "~/assets/api/products";
import Articles from "~/assets/api/articles";
import Categories from "~/assets/api/categories";
import Brands from "~/assets/api/brands";
import Types from "~/assets/api/types";
import Methods from "~/assets/api/methods";

export default (context: any, inject: any) => {
  const factories = {
    products: Products(context.$axios),
    articles: Articles(context.$axios),
    categories: Categories(context.$axios),
    brands: Brands(context.$axios),
    types: Types(context.$axios),
    methods: Methods(context.$axios),
  };

  inject("api", factories);
};
