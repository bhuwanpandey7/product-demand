import { observer } from 'mobx-react';
import Store from '../../../../Stores/Store';
import { FilterList } from '../../../../helper/Filters';
import products from '../../../../products.json';
import { useEffect, useState } from 'react';
import debounce from '../../../../helper/Debounce';
import { IProduct, IProductState } from '../../../../models/ProductState.model';
import { Filter } from '../../../../models/Filter.model';
import { toJS } from 'mobx';

function ProductHeader() {

    let state: IProductState = {
        productData: [],
        filterList: FilterList,
        checkedFilterList: [],
        searchQuery: "",
        query: {
            type: "",
            target: ""
        }
    }
    const [stateData, setStateData] = useState(state);

    useEffect(() => {
        setStateData({
            ...stateData,
            productData: products
        })
        updateProductList();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [stateData.checkedFilterList, stateData.query.type, stateData.query.target])

    function fetchProductData(event: any) {
        const store: any = Store;
        const targetValue: any = event.target.value.toLowerCase().trim();
        if (targetValue.length) {
            const fetchProducts = () => {
                const filterTypes: any = {
                    checkbox: () => {
                        filterChecked();
                    },
                    text: () => {
                        setStateData({
                            ...stateData,
                            query: {
                                type: 'text',
                                target: targetValue
                            }
                        })
                    }
                }
                filterTypes[event.target.type]();
            }
            debounce(fetchProducts)();
        } else {
            resetSore();
        }

        function filterChecked() {
            if (event.target.checked) {
                let storeCheckedFilters = toJS(store.checkedFilters).map((item: Filter) => item.label);
                if (!storeCheckedFilters.includes(targetValue)) {
                    updateCheckState();
                    store.updateCheckedFilters(stateData.filterList.find(elem => elem.label.toLowerCase().trim() === targetValue));
                }
            } else {
                updateCheckState();
                store.removeCheckedFilter(stateData.filterList.find(elem => elem.label.toLowerCase().trim() === targetValue));
            }
        }

        function updateCheckState() {
            setStateData({
                ...stateData,
                query: {
                    type: 'check',
                    target: targetValue
                },
                checkedFilterList: stateData.filterList.filter(elem => elem.label.toLowerCase().trim() === targetValue)
            });
        }
    }

    function updateProductList() {
        if (stateData.query.type.length) {
            const store: any = Store;
            const filters = toJS(store.checkedFilters);
            const queryTypes: any = {
                'check': () => {
                    const data: Array<IProduct> =
                        stateData.productData
                            .filter((elem: any) => filters
                                .map((elem: Filter) => elem.label.toLowerCase().trim())
                                .includes(elem.category.toLowerCase().trim()));
                    data && data.length ?
                        store.updateProducts(data) :
                        resetSore();
                },
                'text': () => {
                    const data: Array<IProduct> =
                        stateData.productData
                            .filter((elem: any) => elem.productName.toLowerCase().trim().includes(stateData.query.target));
                    data && data.length ?
                        store.updateProducts(data) :
                        resetSore();
                }
            }
            queryTypes[stateData.query.type]();
        }
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
                    stateData.filterList.map(({ id, label }: any) => {
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
            <input onKeyUp={fetchProductData} className='search form-control' type="text" placeholder='Type here...' id="searchBar" />
        </div>
    )
}

export default observer(ProductHeader);