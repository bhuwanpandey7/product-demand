import React, { Component } from 'react'

import {
  action,
  computed,
  makeObservable,
  observable,
} from "mobx";

class Store {

  productData: any = [];
  // searchedProduct: any = "";
  selectedProduct: any;
  selectedProductOption: string = "";
  constructor() {
    makeObservable(this, {
      productData: observable,

      // searchedProduct: observable,
      updateProducts: action,
      getProducts: computed,
      resetState: action,
      selectedProduct: observable,
      updateSelectedProduct: action,
      getSelectedProduct: computed,
      // selectedProductOption: observable,
      // updateSelectedProductOption: action,
    });
  }

  resetState() {
    this.productData = [];
    this.selectedProduct = null;
  }

  updateProducts(searchedProducts: []) {
    this.productData = [];
    this.productData = searchedProducts;
  }


  // updateSelectedProductOption(selectedOption: string) {
  //   this.selectedProductOption = selectedOption;
  // }

  updateSelectedProduct(selectedProduct: any) {
    this.selectedProduct = selectedProduct;
  }

  // get getSelectedProductOption() {
  //   return this.selectedProductOption;
  // }

  get getSelectedProduct() {
    return this.selectedProduct;
  }

  get getProducts() {
    return this.productData;
  }
}

export default new Store();