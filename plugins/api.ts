import Products from "~/assets/api/products";
import Articles from "~/assets/api/articles";

export default (context: any, inject: any) => {
  const factories = {
    products: Products(context.$axios),
    articles: Articles(context.$axios),
  };

  inject("api", factories);
};
