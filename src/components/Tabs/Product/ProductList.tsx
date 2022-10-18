import React, { Component } from 'react'
import Store from '../../../Stores/Store';

export default class ProductList extends Component {
    store: any;
    constructor(props: any) {
        super(props);
        this.store = Store;
    }
    handleSearchResponse(response: []) {

    }
    render() {
        return (
            <div className="product__List">
                {
                    this.store.productData
                        .filter((elem: any) => elem.productName.includes(this.store.searchText))
                        .map((data: any) => {
                            return <div key={data.productName}>{data.productName}</div>
                        })
                }
            </div>
        )
    }
}
