import styles from '#styles/pages/admin/orders.module.scss';

import Loader from '#/ui/Loader';

import Request from '#/Request.js';
import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom';

export function OrdersPage() {

    const query = useQuery({
        queryKey: ['adminOrder'],
        queryFn: () => {
            return Request.get("/api/admin/orders/");
        }
    });

    if(query.isPending) return ( <Loader /> );
    if(query.isError) return ( <h3>Ошибка сервера</h3> );

    return (
        <>
            <div className={styles.box}>
                    {query.data?.data?.map(item => {
                        return (
                            <Link to={"/admin/order/" + item.id} key={"admin.order." + item.id} className={styles.item}>
                                <p>Заказ №{ item.id } на { item.price } рублей от { item.user.login }</p>
                                <p>{item.status}</p>
                            </Link>
                        )
                    })}
            </div>
        </>
    )
}