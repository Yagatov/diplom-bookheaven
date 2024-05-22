import styles from '#styles/pages/account/checkout.module.scss';

import Loader from '#/ui/Loader';
import CartItem from '#/ui/shop/CartItem';

import Request from '#/Request.js';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate, Link } from 'react-router-dom';
import { useRef, useState } from 'react';


export function CheckoutPage() {
    const cart = useQuery({
        queryKey: ['accountCart'],
        queryFn: () => {
            return Request.get("/api/account/cart/");
        }
    });

    const user = useQuery({
        queryKey: ['accountProfile'],
        queryFn: () => {
            return Request.get('/api/account/profile');
        }
    });


    if(cart.isPending || user.isPending) return ( <Loader/> );
    if(cart.isError || user.isError) return ( <h3>Ошибка сервера</h3> );

    const result = {
        price: 0,
        bonus: 0
    }

    return (
        <>
            <div className={styles.box}>
                {
                    cart.data.data?.map(item => {
                        result.price += item.quantity * item.product.price;
                        if(item.bonus != 0) {
                            result.bonus += item.quantity * Math.floor(item.product.price / 100 * item.product.bonus);
                        }
                        return (
                            <CartItem key={"account.basket." + item.id} item={item} hidden/>
                        )
                    })
                }
            </div>

            {
                cart.data.data?.length > 0 ? (
                    <CheckoutItem user={user.data.data} result={result} />
                ) : (
                    <div>Пустота...</div>
                )
            }
        </>
    )
}

function CheckoutItem({ user, result }) {
    const { avatar, login, email, bonus } = user;

    const maxBonus = bonus > result.price ? result.price : bonus;

    const [ useBonus, setUseBonus ] = useState(0);
    const [ bonusText, setBonusText ] = useState('');

    const queryClient = useQueryClient();

    const navigate = useNavigate();

    const mutation = useMutation({
        mutationFn: () => {
            const form = new FormData();

            form.append('bonus', useBonus);

            return Request.post('/api/account/order', form)
        },
        onSuccess: () => {
            navigate('/account/orders');
            queryClient.invalidateQueries('accountCart');
            queryClient.invalidateQueries('accountOrders');
        },
    })

    function handleBonus(event) {
        const value = event.target.value;

        if(value == '' || value < 0 || value > maxBonus) {
            setUseBonus(0);
            return setBonusText('Недопустимое значение.');
        }

        setUseBonus(value);
        setBonusText('Использовано ' + value + ' бонусов');
    }

    return (
        <>
            <div className={styles.info}>
                <div className={styles.customer}>
                    Заказчик:
                    <div className={styles.profile}>
                        <div className={styles.ava}>
                            <img src={ avatar == null ? "/images/avatar.jpg" : Request.getUri() + "/public/images/avatars/" + avatar} />
                        </div>
                        <div className={styles.user}>
                            <div className={styles.nickname}>{ login }</div>
                            <div className={styles.nickname}>{ email }</div>
                            <div className={styles.email}>Бонусов: { bonus }</div>
                        </div>

                    </div>
                </div>

                <div className={styles.bonus}>
                    Использование бонусов:
                    <div className={styles.field}>
                        <input type="number" onChange={handleBonus} placeholder={'Макс. значение: ' + maxBonus}/>
                    </div>
                    <div className={styles.message}>{ bonusText }</div>
                </div>
            </div>
            <button onClick={() => mutation.mutate()} disabled={mutation.isPending} className={styles.submit}>Оплатить { result.price - useBonus } рублей { result.bonus != 0 ? ( <span className={styles.bonus}>+ { result.bonus } Б</span> ) : "" }</button>
        </>
    )
}