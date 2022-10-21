import { observer } from 'mobx-react';
import React, { Component } from 'react'
import Store from '../../../Stores/Store';
import { toJS } from 'mobx';

interface ProductItemProps {
    products: []
}

class ProductItem extends Component<ProductItemProps> {
    store: any;
    constructor(props: any) {
        super(props);
        this.store = Store;
        this.prepareProductDetails = this.prepareProductDetails.bind(this);
    }

    prepareProductDetails(event: any) {
        if (event.target === event.currentTarget) {
            this.setState(() => {
                const products = toJS(this.store.getProducts);
                const productName = event.target.firstChild.firstChild.innerText.toLowerCase().trim();;
                const selectedProduct = products.filter((elem: any) => elem.productName.toLowerCase().trim() === productName);
                this.store.updateSelectedProduct(selectedProduct);
            })
        }
    }

    render() {
        let data: any = this.props.products;
        return (
            <div onClick={this.prepareProductDetails} className='product__List-item' key={data.productName}>
                <div>
                    <span>{data.productName}</span>
                    <div className='product__List-item-tags'>
                        {
                            data.tags.map((tag: any) => <span key={tag} className="product__List-item-tag">{tag}</span>)
                        }
                    </div>
                </div>
                <span>{data.category}</span>
            </div>
        )
    }
}

export default observer(ProductItem);