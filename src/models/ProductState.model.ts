import { Filter } from "./Filter.model";
import { IProduct } from "./Product.model";

interface IProductState {
    productData: Array<IProduct>;
    filterList: Array<Filter>,
    checkedFilterList: Array<Filter>,
    searchQuery: string,
    query: {
        type: string,
        target: string
    }
}

export type { IProductState, IProduct };