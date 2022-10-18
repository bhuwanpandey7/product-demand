import React, { Component } from 'react'
import { extendObservable } from 'mobx'

class Store {

  constructor() {
    extendObservable(this, {
      productData: [],
      searchText: ""
    });
  }
}

export default new Store();