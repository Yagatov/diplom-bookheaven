import pages from '#styles/account/pages.module.scss';

import Request from '../../Request.js';
import { useQuery } from '@tanstack/react-query'

export function OrdersPage() {

    const query = useQuery({
        queryKey: ['adminOrder'],
        queryFn: () => {
            return Request.get("/api/admin/orders/");
        }
    });

    return (
        <div className={pages.content}>
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
            <div style={{
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
                                <p>Пользователь { item.user_id }</p> 
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}