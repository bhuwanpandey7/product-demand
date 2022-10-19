import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import React, { Component } from 'react'
import Store from '../../../Stores/Store'

class ProductDetails extends Component {
  store: any;

  constructor(props: any) {
    super(props);
    this.store = Store;
  }

  render() {
    console.log(this.store.getSelectedProduct && Object.values(toJS(this.store.getSelectedProduct)));
    let data = this.store.getSelectedProduct && toJS(this.store.getSelectedProduct)[0];
    return <div>
      <p>Product Details</p>
      <hr />
      <span>{data.productName}</span>
      <div>
        {data.tags}
      </div>
      <input type="button" value="Go To Manufaturer" className='btn btn-primary btn-sm' />
      <p>
        {
          data.description?.reduce((acc: any, curr: any) => acc + curr)
        }
      </p>
      <div>
        <input type="checkbox" name="first" id="first" />
        <label htmlFor="first">Option 1</label>
        <p>{data.option1}</p>
        <input type="checkbox" name="second" id="second" />
        <label htmlFor="first">Option 2</label>
        <p>{data.option2}</p>
      </div>
      {
        Object.keys(data)
          .map((elem: any) => {
            return <div className="details">
              {/* <span>{data.productName}</span> */}
            </div>
          })
      }
    </div>

  }
}

export default observer(ProductDetails);
