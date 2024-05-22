import styles from '#styles/pages/account/orders.module.scss';

import Loader from '#/ui/Loader';

import Request from '#/Request.js';
import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom';

export function OrdersPage() {
    const query = useQuery({
        queryKey: ['accountOrders'],
        queryFn: () => {
            return Request.get("/api/account/orders/");
        }
    });

    if(query.isPending) return ( <Loader/> );
    if(query.isError) return ( <h3>Ошибка сервера</h3> );

    const statusList = {
        process: "В процессе",
        completed: "Выполнен",
        cancel: "Отменён"
    }

    return (
        <>
            <div className={ styles.box }>
                {query.data.data?.map(item => {
                    return (
                        <Link to={"/account/order/" + item.id} key={ "account.order." + item.id } className={ styles.item }>
                            <p>
                                Заказ №{ item.id } на { item.price } рублей
                            </p>
                            <p>
                                { statusList[item.status] }
                            </p>
                        </Link>
                )
                })}
            </div>

            {
                query.data.data?.length == 0 && (
                    <div>Пустота...</div>
                )
            }
        </>
    )
}