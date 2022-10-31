import {
  action,
  computed,
  makeObservable,
  observable,
} from "mobx";
import { Filter } from "../models/Filter.model";

class Store {

  productData: any = [];
  selectedProduct: any;
  selectedProductOption: string = "";
  checkedFilters: Array<Filter> = [];
  constructor() {
    makeObservable(this, {
      productData: observable,
      updateProducts: action,
      getProducts: computed,
      resetState: action,
      selectedProduct: observable,
      updateSelectedProduct: action,
      getSelectedProduct: computed,
      selectedProductOption: observable,
      updateSelectedProductOption: action,
      checkedFilters: observable,
      updateCheckedFilters: action
    });
  }

  removeCheckedFilter(filter: Filter) {
    this.checkedFilters = this.checkedFilters.filter(elem => elem.label !== filter.label)
  }

  updateCheckedFilters(filter: Filter) {
    this.checkedFilters.push(filter);
  }

  resetState() {
    this.productData = [];
    this.selectedProduct = null;
  }

  updateProducts(searchedProducts: []) {
    this.productData = [];
    this.productData = searchedProducts;
  }


  updateSelectedProductOption(selectedOption: string) {
    this.selectedProductOption = selectedOption;
  }

  updateSelectedProduct(selectedProduct: any) {
    this.selectedProduct = selectedProduct;
  }

  get getSelectedProductOption() {
    return this.selectedProductOption;
  }

  get getSelectedProduct() {
    return this.selectedProduct;
  }

  get getProducts() {
    return this.productData;
  }
}

export default new Store();