import { Component } from 'react'
// import { IoIosSearch } from 'react-icons/io';
import { observer } from 'mobx-react';
import Store from '../../../Stores/Store';
import Debouncer from '../../../helper/Debouncer';
import Filters from '../../../helper/Filters';
import products from '../../../products.json';
class ProductHeader extends Component {

    state: any;
    productResponse: any;
    constructor(props: any) {
        super(props);
        this.state = {
            productData: [],
            searchedProduct: "",
            filterList: Filters.filterList(),
            checkedFilterList: []
        }
        this.fetchProductData = this.fetchProductData.bind(this);
    }

    componentDidMount(): void {
        this.setState({ productData: products })
    }

    fetchProductData(event: any) {
        const targetValue = event.target.value.toLowerCase().trim();

        if (targetValue.length) {
            event.target.checked ? this.state.checkedFilterList.push(targetValue) :
                this.setState({
                    checkedFilterList:
                        this.state.checkedFilterList.filter((elem: any) => elem !== targetValue)
                })
            const fetchProducts = () => {
                const filterTypes: any = {
                    checkbox: () => {
                        this.setState({
                            productData: targetValue.length ?
                                this.state.productData.filter((elem: any) => elem.category.toLowerCase().trim().includes(targetValue)) :
                                []
                        },
                            this.updateProductList)

                    },
                    text: () => {
                        this.setState({
                            productData: targetValue.length ?
                                this.state.productData.filter((elem: any) => elem.productName.toLowerCase().trim().includes(targetValue)) :
                                []
                        },
                            this.updateProductList)
                    }
                }
                filterTypes[event.target.type]();
            }
            Debouncer.debounce(fetchProducts)();
        } else {
            this.resetSore();
        }
    }

    private updateProductList() {
        const store: any = Store;
        this.state.productData && this.state.productData.length ?
            store.updateProducts(this.state.productData) :
            this.resetSore();
    }

    private resetSore() {
        const store: any = Store;
        store.resetState();
    }

    render() {
        return (
            <div className="product__header">
                <p className='product__header-title'>I'm Looking For</p>
                <hr />
                <div className='product__header-checkFilters'>
                    {
                        this.state.filterList.map(({ id, label }: any) => {
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
        )
    }
}

export default observer(ProductHeader);