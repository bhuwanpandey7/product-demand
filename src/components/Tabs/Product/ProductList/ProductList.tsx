import { observer } from 'mobx-react';
import Store from '../../../../Stores/Store';
import ProductItem from '../ProductItem/ProductItem';

function ProductList() {

    const store = Store;

    return (
        <div className="product__List">
            {
                store.getProducts &&
                store.getProducts
                    .map((data: any) => {
                        return <ProductItem key={data.id} products={data} />
                    })
            }
        </div>
    )
}

export default observer(ProductList);