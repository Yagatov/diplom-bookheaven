import styles from '#styles/pages/account/cart.module.scss';

import Loader from '#/ui/Loader';
import CartItem from '#/ui/shop/CartItem';

import Request from '#/Request.js';

import { Link } from 'react-router-dom';

import { useQuery } from '@tanstack/react-query'

export function CartPage() {
    const query = useQuery({
        queryKey: ['accountBasket'],
        queryFn: () => {
            return Request.get("/api/account/cart/");
        }
    });

    if(query.isPending) return ( <Loader/> );
    if(query.isError) return ( <h3>Ошибка сервера</h3> );

    let price = 0;
    let bonus = 0;

    return (
        <>
            <div className={styles.box}>
                {query.data.data?.map(item => {
                    price += item.quantity * item.product.price;
                    if(item.bonus != 0) {
                        bonus += item.quantity * Math.floor(item.product.price / 100 * item.product.bonus);
                    }
                    return (
                        <CartItem key={"account.basket." + item.id} item={item}/>
                    )
                })}
            </div>
            
            {
                query.data.data?.length > 0 ? (
                    <>
                        <div className={styles.info}>
                            Итого: { price } рублей { bonus != 0 ? ( <span className={styles.bonus}>+ { bonus } Б</span> ) : "" }
                        </div>
                        <Link to="/account/checkout" className={styles.submit}>Перейти к оформлению заказа</Link>
                    </>
                ) : (
                    <div>Пустота...</div>
                )
            }
        </>
    )
}