import carts from '#styles/ui/carts.module.scss';

import ProductItem from './ProductItem';

import { Link } from 'react-router-dom';

export default ({ item }) => {
    return (
        <div className={ carts.set }>
            <Link to={ "/category/" + item.id } className={ carts.title }>{ item.name }</Link>
            <div className={ carts.list } style={ { marginTop: 20 } }>
                {item.products.map(product => (
                    <ProductItem key={"landing.home.set." + item.id + ".product" + product.id} product={product}/>
                ))}
            </div>
        </div>
    )
}