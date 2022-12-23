import Products from "~/assets/api/products";
import Articles from "~/assets/api/articles";
import Categories from "~/assets/api/categories";
import Brands from "~/assets/api/brands";
import Types from "~/assets/api/types";
import Methods from "~/assets/api/methods";
import Orders from "~/assets/api/orders";
import Properties from "~/assets/api/properties";

export default (context: any, inject: any) => {
  const factories = {
    products: Products(context.$axios),
    articles: Articles(context.$axios),
    categories: Categories(context.$axios),
    brands: Brands(context.$axios),
    types: Types(context.$axios),
    methods: Methods(context.$axios),
    orders: Orders(context.$axios),
    properties: Properties(context.$axios),
  };

  inject("api", factories);
};
