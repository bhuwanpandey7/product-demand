import { observer } from 'mobx-react';
import React, { Component } from 'react'
import Store from '../../../Stores/Store';
import ProductItem from './ProductItem';

class ProductList extends Component {
    store: any;
    constructor(props: any) {
        super(props);
        this.store = Store;
    }

    render() {
        return (
            <div className="product__List">
                {
                    this.store.getProducts &&
                    this.store.getProducts
                        .map((data: any) => {
                            return <ProductItem products={data} />
                        })
                }
            </div>
        )
    }
}

export default observer(ProductList);