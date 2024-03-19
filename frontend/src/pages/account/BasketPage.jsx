import pages from '#styles/account/pages.module.scss';
import styles from '#styles/account/pages/profile.module.scss';
import cart from '#styles/ui/carts.module.scss';

import { useNavigate } from 'react-router-dom';

import { BasketItem } from '#ui/carts/CartItem';

import { useAtom } from 'jotai';
import UserAtom from '../../atoms/UserAtom.js';

import Request from '../../Request.js';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

export function BasketPage() {
    const [ user, setUser ] = useAtom(UserAtom);
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const query = useQuery({
        queryKey: ['accountBasket'],
        queryFn: () => {
            return Request.get("/api/account/basket/");
        }
    });

    const mutation = useMutation({
        mutationFn: (data) => {
            return Request.post('/api/account/order', data)
        },
        onSuccess: () => {
            queryClient.invalidateQueries('accountOrder');
            queryClient.invalidateQueries('accountProfile');
            navigate('/account/order');
        }
    })

    let price = 0;

    function handleOrder() {
        const formData = new FormData();
        formData.append("price", price);
        mutation.mutate(formData);
    }

    return (
        <div className={pages.content} style={{width: "100%"}}>
            {
                query.isPending && (
                    <h2 className={pages.title}>Загрузка...</h2>
                )
            }
            {
                query.isError && (
                    <h2 className={pages.title}>Ошибка.</h2>
                )
            }
            {
                query.isSuccess && (
                    <h2 className={pages.title}>Корзина</h2>
                )
            }

            <div className={pages.box}>
                <div className={cart.cont} style={{width: "100%"}}>
                    {query.data?.data?.map(item => {
                        price += item.quantity * item?.product.price;
                        return (
                            <BasketItem key={"account.basket." + item.id} item={item}/>
                        )
                    })}
                </div>
                {
                    query.data?.data?.length > 0 ? (
                        <div className={cart.btn} style={{marginTop: 50, fontSize: 12}} onClick={handleOrder}>оформить заказ на { price } рублей</div>
                    ) : (
                        <div>Пустота...</div>
                    )
                }
            </div>
        </div>
    )
}