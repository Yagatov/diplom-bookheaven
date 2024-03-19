import pages from '#styles/account/pages.module.scss';
import styles from '#styles/account/pages/profile.module.scss';
import cart from '#styles/ui/carts.module.scss';

import { BasketItem } from '#ui/carts/CartItem';

import { useAtom } from 'jotai';
import UserAtom from '../../atoms/UserAtom.js';

import Request from '../../Request.js';
import { useQuery } from '@tanstack/react-query'

export function OrdersPage() {
    const [ user, setUser ] = useAtom(UserAtom);

    const query = useQuery({
        queryKey: ['accountOrder'],
        queryFn: () => {
            return Request.get("/api/account/orders/");
        }
    });

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
                    <h2 className={pages.title}>Заказы</h2>
                )
            }

            <div className={pages.box}>
                <div className={cart.cont} style={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    gap: 20
                }}>
                    {query.data?.data?.map(item => {
                        return (
                            <div key={"account.order." + item.id} style={{
                                display: "flex",
                                justifyContent: "space-between",
                                gap: 30,
                                backgroundColor: "rgba(255, 255, 255, .03)",
                                borderRadius: 10,
                                padding: "10px 20px",
                                fontSize: 12
                            }}>
                                <p>Заказ от { item.created_at }</p>    
                                <p>Сумма заказа { item.price } рублей</p> 
                                <p>В процессе</p> 
                            </div>
                        )
                    })}
                </div>
                {/* {
                    query.data?.data?.length > 0 ? (
                        <div className={cart.btn} style={{marginTop: 50, fontSize: 12}} onClick={handleOrder}>оформить заказ на  } рублей</div>
                    ) : (
                        <div>Пустота...</div>
                    )
                } */}
            </div>
        </div>
    )
}