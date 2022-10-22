import { observer } from 'mobx-react';
import { useRef } from 'react'
import Store from '../../../Stores/Store';
import { toJS } from 'mobx';

function ProductItem(props: any) {

    const productRef: any = useRef<HTMLSpanElement>();

    const store = Store;
    const data: any = props.products;
    const noTagsCss = {
        color: '#12B8FF',
        marginRight: "0.4rem",
        padding: "0.5rem"
    }

    function prepareProductDetails(event: any) {
        if (event.target === event.currentTarget) {
            const products = toJS(store.getProducts);
            const productName = productRef?.current?.textContent?.toLowerCase().trim();
            const selectedProduct = products.filter((elem: any) => elem.productName.toLowerCase().trim() === productName);
            store.updateSelectedProduct(selectedProduct);
        }
    }

    return (
        <div onClick={prepareProductDetails} className='product__List-item' key={data.productName}>
            <div>
                <span ref={productRef}>{data.productName}</span>
                {
                    data.tags && data.tags.length ?
                        <div className='product__List-item-tags'>
                            {
                                data.tags.map((tag: any) => <span key={tag} className="product__List-item-tag">{tag}</span>)
                            }
                        </div> :
                        <span style={noTagsCss}>No Tags available</span>
                }
            </div>
            <span>{data.category}</span>
        </div>
    )
}

export default observer(ProductItem);