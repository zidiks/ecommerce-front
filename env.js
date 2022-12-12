import {environmentDev} from "./environments/environment";
import {environmentProd} from "./environments/environment.prod";

const dev = process.env.NODE_ENV !== 'production';
export const environment = dev ? environmentDev : environmentProd;
