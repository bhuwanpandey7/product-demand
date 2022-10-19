import { observer } from 'mobx-react';
import React, { Component } from 'react'
import Store from '../../../Stores/Store';
import productData from '../../../data/products.json';

interface ProductItemProps {
    products: []
}

class ProductItem extends Component<ProductItemProps> {
    store: any;
    products: any;
    state: any;
    constructor(props: any) {
        super(props);
        this.state = {
            selectedProduct: {}
        }
        this.store = Store;
        this.getProductDetails = this.getProductDetails.bind(this);
    }

    getProductDetails(event: any) {
        if (event.target === event.currentTarget) {
            this.setState(() => {
                const products = this.store.getProducts;
                const productName = event.target.firstChild.firstChild.innerText.toLowerCase().trim();;
                const selectedProduct = productData.filter((elem: any) => elem.productName.toLowerCase().trim() == productName);
                // console.log(products, selectedProduct, productName);

                this.state.selectedProduct = selectedProduct;
                this.store.updateSelectedProduct(this.state.selectedProduct);
            })
        }
    }

    render() {
        let data: any = this.props.products;
        return (
            <div onClick={this.getProductDetails} className='product__List-item' key={data.productName}>
                <div>
                    <span>{data.productName}</span>
                    <div>
                        {
                            data.tags.map((tag: any) => {
                                return <span key={tag} style={{ color: '#12B8FF', marginLeft: '2px', padding: '2px' }}>
                                    {tag}
                                </span>
                            })
                        }
                    </div>
                </div>
                <span>{data.category}</span>
            </div>
        )
    }
}

export default observer(ProductItem);