import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import { Component } from 'react'
import Store from '../../../Stores/Store'

class ProductDetails extends Component {
  store: any;
  constructor(props: any) {
    super(props);
    this.store = Store;
  }

  render() {
    const selectedProduct = this.store.getSelectedProduct;
    const products = this.store.getProducts;
    let data = selectedProduct && toJS(selectedProduct)[0];

    return data && products.map((item: any) => item.productName).includes(data.productName) ?
      <div className='product__summary'>
        <p className='product__summary-title'>Product Details</p>
        <hr />
        <span className='product__summary-name'>{data.productName}</span>
        {
          data.tags.length ?
            <div className="product__summary-tags">
              {
                data.tags.map((tag: any) => <span key={tag} className="product__summary-tag">{tag}</span>)
              }
            </div> :
            <span style={{ color: '#12B8FF' }}>No Tags available</span>
        }
        <div>
          <a target="_blank" rel="noopener noreferrer" href={data.manufacturerUrl}>
            <input type="button" value="Go to Manufaturer" className='product__summary-CTE btn btn-primary btn-sm' />
          </a>
        </div>

        <p className='product__summary-description'>
          {
            data.description?.reduce((acc: any, curr: any) => acc + curr)
          }
        </p>
        <div className='product__summary-options'>
          {
            data.option1 && data.option2 ?
              <div>
                <input type="radio" name="option" id="first" />
                <label htmlFor="first">Option 1</label>
                <p>{data.option1}</p>
                <input type="radio" name="option" id="second" />
                <label htmlFor="second">Option 2</label>
                <p>{data.option2}</p>
              </div>
              :
              <span style={{ color: "#12B8FF" }}>No Available options</span>
          }
        </div>
      </div >
      : <span className='product__summary-notSelected'>No Selected Product</span>
  }
}

export default observer(ProductDetails);
