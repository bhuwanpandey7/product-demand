import React, { Component } from 'react'
import { IoIosSearch } from 'react-icons/io';
import productData from '../../../data/products.json';
import { observer } from 'mobx-react';
import Store from '../../../Stores/Store';

class ProductHeader extends Component {

    state: any;
    constructor(props: any) {
        super(props);
        this.state = {
            productData: [],
            searchText: ""
        }
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

    productResponse: any = [];

    fetchProductData(event: any) {
        // fetch('../../../data/products.json')
        // .then(data => data.json())
        // .then(data => {
        console.log(productData);
        // this.productResponse = productData;
        const store: any = Store;
        store.productData = productData;
        // this.state.searchText = event.target.value;
        store.searchText = event.target.value;
        // })
    }

    render() {
        return (
            <>
                <div className="product__header">
                    <p>I'm Looking For</p>
                    <hr />
                    <div className='product__header-checkFilters'>
                        {
                            this.filterList.map(({ id, label }: any) => {
                                console.log(id, label)
                                return <div className='check__Filters' key={id} >
                                    <input className='' type="checkbox" value={label} id={id} />
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