import React, { Component } from 'react'
import { IoIosSearch } from 'react-icons/io';
import productData from '../../../data/products.json';
import { observer } from 'mobx-react';
import Store from '../../../Stores/Store';
import Debouncer from '../../../helper/Debouncer';

class ProductHeader extends Component {

    state: any;
    constructor(props: any) {
        super(props);
        this.state = {
            productData: [],
            searchedProduct: ""
        }
        this.fetchProductData = this.fetchProductData.bind(this);
    }

    filterList = [
        {
            id: 'development',
            label: "Software Development"
        },
        {
            id: 'business',
            label: "Daily Business"
        },
        {
            id: 'graphicEditor',
            label: "Graphic Editors"
        },
        {
            id: 'textEditor',
            label: "Text Editor"
        },
        {
            id: 'managementTools',
            label: "Management Tools"
        }
    ];

    fetchProductData(event: any) {

        const fetchProducts = () => {
            const store: any = Store;
            const targetValue = event.target.value.toLowerCase().trim();

            const filterTypes: any = {
                checkbox: () => {
                    this.setState(() => {
                        this.state.productData = targetValue.length ?
                            productData.filter(elem => elem.category.toLowerCase().trim().includes(targetValue)) :
                            [];
                        store.updateProducts(this.state.productData);
                    })
                },
                text: () => {
                    this.setState(() => {
                        this.state.productData = targetValue.length ?
                            productData.filter(elem => elem.productName.toLowerCase().trim().includes(targetValue)) :
                            [];
                        store.updateProducts(this.state.productData);
                    })
                }
            }
            filterTypes[event.target.type]();
        }

        Debouncer.debounce(fetchProducts)();
    }

    render() {
        return (
            <>
                <div className="product__header">
                    <p className='product__header-title'>I'm Looking For</p>
                    <hr />
                    <div className='product__header-checkFilters'>
                        {
                            this.filterList.map(({ id, label }: any) => {
                                return <div className='check__Filters' key={id} >
                                    <input
                                        onChange={this.fetchProductData}
                                        className=''
                                        type="checkbox"
                                        value={label}
                                        id={id} />
                                    <label htmlFor={id}>{label}</label>
                                </div>
                            })
                        }
                    </div>
                    <div className='search__Wrapper'>
                        {/* <label htmlFor="searchBar"> <IoIosSearch /></label> */}
                        <input onKeyUp={this.fetchProductData} className='search form-control' type="text" placeholder='Type here...' id="searchBar" />
                    </div>
                </div>
            </>
        )
    }
}

export default observer(ProductHeader);