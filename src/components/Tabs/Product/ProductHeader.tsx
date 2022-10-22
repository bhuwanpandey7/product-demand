// import { IoIosSearch } from 'react-icons/io';
import { observer } from 'mobx-react';
import Store from '../../../Stores/Store';
import Filters from '../../../helper/Filters';
import products from '../../../products.json';
import { useEffect, useState } from 'react';
import debounce from '../../../helper/Debouncer';

function ProductHeader() {

    let state: any = {
        productData: [],
        searchedProduct: "",
        filterList: Filters.filterList(),
        checkedFilterList: []
    }

    const [stateData, setStateData] = useState(state);

    useEffect(() => {
        setStateData({
            ...stateData,
            productData: products
        })
    }, [])

    function fetchProductData(event: any) {
        const targetValue = event.target.value.toLowerCase().trim();

        if (targetValue.length) {
            // event.target.checked ? state.checkedFilterList.push(targetValue) :
            // setStateData({
            //     ...stateData,
            //     checkedFilterList:
            //         stateData.checkedFilterList.filter((elem: any) => elem !== targetValue)
            // })
            const fetchProducts = () => {
                const filterTypes: any = {
                    checkbox: () => {
                        const data = targetValue.length ?
                            stateData.productData.filter((elem: any) => elem.category.toLowerCase().trim().includes(targetValue)) :
                            [];
                        updateProductList(data);
                    },
                    text: () => {
                        const data = targetValue.length ?
                            stateData.productData
                                .filter((elem: any) => elem.productName.toLowerCase().trim().includes(targetValue)) :
                            [];
                        updateProductList(data);
                    }
                }
                filterTypes[event.target.type]();
            }
            debounce(fetchProducts)();
        } else {
            resetSore();
        }
    }

    function updateProductList(searchedProducts: []) {
        const store: any = Store;
        searchedProducts && searchedProducts.length ?
            store.updateProducts(searchedProducts) :
            resetSore();
    }

    function resetSore() {
        const store: any = Store;
        store.resetState();
    }

    return (
        <div className="product__header">
            <p className='product__header-title'>I'm Looking For</p>
            <hr />
            <div className='product__header-checkFilters'>
                {
                    state.filterList.map(({ id, label }: any) => {
                        return <div className='check__Filters' key={id} >
                            <input
                                onChange={fetchProductData}
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
                <input onKeyUp={fetchProductData} className='search form-control' type="text" placeholder='Type here...' id="searchBar" />
            </div>
        </div>
    )
}

export default observer(ProductHeader);