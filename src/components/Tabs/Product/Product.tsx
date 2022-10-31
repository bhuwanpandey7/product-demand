import './Product.scss';
import ProductDetails from './ProductDetails/ProductDetails';
import ProductHeader from './ProductHeader/ProductHeader';
import ProductList from './ProductList/ProductList';
import Store from '../../../Stores/Store'
import { observer } from 'mobx-react';

function Product() {
  const store = Store;
  return (
    <div className='product'>
      <div className='product__data'>
        <ProductHeader />
        <ProductList />
      </div>
      {
        store.selectedProduct &&
        <div className='product__Details'>
          <ProductDetails />
        </div>
      }
    </div>
  )
}

export default observer(Product);