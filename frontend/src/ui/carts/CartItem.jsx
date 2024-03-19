import carts from '#styles/ui/carts.module.scss';
import { Link } from 'react-router-dom';

import Request from '../../Request.js';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useAtom } from 'jotai'
import UserAtom from '../../atoms/UserAtom.js';
import { useState } from 'react';

export function CartItem({cart}) {
    const [user, setUser] = useAtom(UserAtom);
    const [text, setText] = useState("В корзину");

    const mutation = useMutation({
        mutationFn: (data) => {
            return Request.post('/api/account/basket/product', data)
        },
        onSuccess: (data) => {
            if(data.data?.quantity) {
                setText("В корзине " + data.data?.quantity)
            }
        }
    })

    function handleClick(event) {
        if(user == null) {
            setText("Авторизуйтесь")
            return;
        }

        const formData = new FormData();
        formData.append("product_id", cart.id);

        mutation.mutate(formData);
    }

    return (
        <div className={carts.cart}>
            <div className={carts.image}>
                <img src={Request.getUri() + "/public/images/products/" + cart.image}/>
            </div>
            <div className={carts.info}>
                <div className={carts.price}>{cart.price} ₽</div>
                <div className={carts.name}>{cart.name}</div>
                <div className={carts.author}>{cart.author}</div>
            </div>
            <div className={carts.action}>
                {
                    !mutation.isPending && (
                        <div className={carts.to} onClick={handleClick}>
                            { text }
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export function BasketItem({item}) {
    const cart = item?.product;
    const queryClient = useQueryClient();

    const [text, setText] = useState(item.quantity);

    const mutation = useMutation({
        mutationFn: (data) => {
            return Request.post('/api/account/basket/product', data)
        },
        onSuccess: (data) => {
            if(data.data?.quantity) {
                setText(data.data?.quantity)
                queryClient.invalidateQueries('accountProfile');
            }
        }
    })

    const removeMutation = useMutation({
        mutationFn: () => {
            return Request.delete('/api/account/basket/product/' + item.id)
        },
        onSuccess: (data) => {
            if(data.data?.quantity !== undefined) {
                setText(data.data?.quantity);
                queryClient.invalidateQueries('accountProfile');
                // if(data.data.quantity === 0) {
                // }
            }
        }
    })

    function handleClick(event) {
        const formData = new FormData();
        formData.append("product_id", cart.id);

        mutation.mutate(formData);
    }
    return (
        <div className={carts.cart}>
            <div className={carts.image}>
                <img src={Request.getUri() + "/public/images/products/" + cart.image}/>
            </div>
            <div className={carts.info}>
                <div className={carts.price}>{cart.price} ₽</div>
                <div className={carts.name}>{cart.name}</div>
                <div className={carts.author}>{cart.author}</div>
            </div>
            <div className={carts.action}>
                {
                    !mutation.isPending && (
                        <>
                            <div className={carts.to} onClick={() => removeMutation.mutate()}>
                                Убрать
                            </div>
                            <div style={{
                                fontSize: 14,
                                padding: "5px 7px",
                                border: "1px solid rgba(255, 255, 255, .3)",
                                borderRadius: 5
                            }}>
                                { text }
                            </div>
                            <div className={carts.to} onClick={handleClick}>
                                Добавить
                            </div>
                        </>
                    )
                }
            </div>
            <div style={{
                textAlign: "center",
                fontSize: 14
            }}>
                { text * cart.price } рублей
            </div>
        </div>
    )
}