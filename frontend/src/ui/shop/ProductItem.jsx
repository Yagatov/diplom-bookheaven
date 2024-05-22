import carts from '#styles/ui/carts.module.scss';

import Request from '#/Request.js';

import { useAtom } from 'jotai'
import UserAtom from '#atoms/UserAtom.js';

import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';

import { Link } from 'react-router-dom';

export default ({ product }) => {
    const image = Request.getUri() + "/public/images/products/" + product.image;

    const [ user, setUser ] = useAtom(UserAtom);
    const [ text, setText ] = useState("В корзину");

    const mutation = useMutation({
        mutationFn: () => {
            return Request.post('/api/account/cart/product/' + product.id + '/add')
        },
        onSuccess: (data) => {
            if(data.data?.quantity) {
                setText("В корзине " + data.data?.quantity + " шт.")
            }
        }
    });

    function handleClick() {
        if(user == null) {
            setText("Авторизуйтесь")
            return;
        }

        mutation.mutate();
    }

    return (
        <div className={ carts.cart }>
            <div className={ carts.image }>
                <img src={ image }/>
            </div>
            <Link className={ carts.info } to={ "/product/" + product.id }>
                <div className={ carts.price }>{ product.price } ₽ { product.bonus != 0 ? ( <span className={carts.bonus}>+ { Math.floor(product.price / 100 * product.bonus) } Б</span> ) : "" }</div>
                <div className={ carts.name }>{ product.name }</div>
                <div className={ carts.author }>{ product.author }</div>
            </Link>
            <div className={ carts.action }>
                <button className={ carts.to } onClick={ handleClick } disabled={ mutation.isPending }>
                    { mutation.isPending ? "Загрузка" : text }
                </button>
            </div>
        </div>
    )
}