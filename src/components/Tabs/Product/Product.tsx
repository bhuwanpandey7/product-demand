import { Component } from 'react'
import './Product.scss';
import ProductDetails from './ProductDetails';
import ProductHeader from './ProductHeader';
import ProductList from './ProductList';

export default class Product extends Component {
  render() {
    return (
      <div className='product'>
        <div className='product__data'>
          <ProductHeader />
          <ProductList />
        </div>
        <div className='product__Details'>
          <ProductDetails />
        </div>
      </div>
    )
  }
}
