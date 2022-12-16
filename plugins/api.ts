import Products from "~/assets/api/products";
import Articles from "~/assets/api/articles";
import Categories from "~/assets/api/categories";

export default (context: any, inject: any) => {
  const factories = {
    products: Products(context.$axios),
    articles: Articles(context.$axios),
    categories: Categories(context.$axios),
  };

  inject("api", factories);
};
