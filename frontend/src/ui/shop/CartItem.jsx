import stylesCart from '#styles/ui/cart.module.scss';

import Request from '#/Request.js';

import { Link } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react';

export default ({ item, hidden = false }) => {
    const product = item.product;
    const [ quantity, setQuantity ] = useState(item.quantity);
    const queryClient = useQueryClient();
    
    const clean = useMutation({
        mutationFn: () => {
            return Request.post('/api/account/cart/product/' + product.id + '/delete')
        },
        onSuccess: successMutation
    });

    function successMutation(data) {
        if(data.data?.quantity) {
            setQuantity(data.data?.quantity);
        }
        queryClient.invalidateQueries('accountBasket');
    }

    return (
        <div className={stylesCart.cart}>
            <div className={stylesCart.image}>
                <img src={Request.getUri() + "/public/images/products/" + product.image}/>
            </div>
            <div className={stylesCart.info}>
                {/* <div className={stylesCart.price}>Цена: { product.price } ₽</div> */}
                <div className={stylesCart.price}>Стоимость: { quantity * product.price } ₽ { product.bonus != 0 ? ( <span className={stylesCart.bonus}>+ { quantity * Math.floor(product.price / 100 * product.bonus) } Б</span> ) : "" }</div>
                <Link to={"/product/" + product.id} className={stylesCart.name}>{product.name}</Link>
                <div className={stylesCart.author}>{product.author}</div>

                {
                    hidden ? 
                        (
                            <div className={stylesCart.quantity}>
                                <div className={stylesCart.value}>
                                    { quantity } шт.
                                </div>
                            </div>
                        ) :
                        ( <QuantityItem id={product.id} quantity={ quantity } successMutation={ successMutation } /> )
                }

                {/* <div className={stylesCart.subtotal}>
                    Стоимость: { quantity * product.price } рублей
                </div> */}
            </div>
            {
                hidden || (
                    <button className={stylesCart.delete} onClick={() => clean.mutate()} disabled={clean.isPending}>
                        { clean.isPending ? "" : ( <img src="/images/icons/delete.svg" /> ) }
                    </button>
                )
            }
        </div>
    )
}

function QuantityItem({ id, quantity, successMutation }) {

    const add = useMutation({
        mutationFn: () => {
            return Request.post('/api/account/cart/product/' + id + '/add')
        },
        onSuccess: successMutation
    });

    const remove = useMutation({
        mutationFn: () => {
            return Request.post('/api/account/cart/product/' + id + '/remove')
        },
        onSuccess: successMutation
    });

    return (
        <div className={stylesCart.quantity}>
            <button className={stylesCart.action} onClick={() => quantity == 1 ? null : remove.mutate()} disabled={remove.isPending}>
                { remove.isPending ? "" : "-" }
            </button>
            <div className={stylesCart.value}>
                { quantity }
            </div>
            <button className={stylesCart.action} onClick={() => add.mutate()} disabled={add.isPending}>
                { add.isPending ? "" : "+" }
            </button>
        </div>
    )
}