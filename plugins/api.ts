import Products from "~/assets/api/products";

export default (context: any, inject: any) => {
  const factories = {
    products: Products(context.$axios),
  };

  inject("api", factories);
};
