import styles from '#styles/pages/account/order.module.scss';

import Loader from '#/ui/Loader';
import CartItem from '#/ui/shop/CartItem';

import Request from '#/Request.js';

import { useQuery } from '@tanstack/react-query';
import { useParams } from "react-router-dom"

export function OrderPage() {
    const { id } = useParams();

    const query = useQuery({
        queryKey: [`accountOrders[${id}]`],
        queryFn: () => {
            return Request.get("/api/account/order/" + id);
        }
    });

    if(query.isPending) return ( <Loader/> );
    if(query.isError) return ( <h3>Ошибка сервера</h3> );

    const data = query.data.data;

    const statusList = {
        process: "В процессе",
        completed: "Выполнен",
        cancel: "Отменён"
    }

    return (
        <>
            <div className={styles.title}>Заказ №{ id }</div>

            <div className={styles.info}>
                <p>
                    Дата создания: <span>{ data.created_at }</span>
                </p>
                <p>
                    Дата обновления: <span>{ data.updated_at }</span>
                </p>
                <p>
                    Стоимость: <span>{ data.price } рублей {data.bonus_take != 0 && `(-${data.bonus_take} бонусов)`}</span>
                </p>
                <p>
                    Бонусов к выдаче: <span>{ data.bonus_completed ? "Выдано" : data.status == "cancel" ? "Заказ отменён" : data.bonus_give == 0 ? "Кешбека нет :c" : data.bonus_give }</span>
                </p>
                <p>
                    Статус: <span>{ statusList[data.status] }</span>
                </p>
            </div>
            
            <div className={styles.subtitle}>Товары</div>

            <div className={styles.box}>
                {
                    data.orderItems?.map(item => {
                        return (
                            <CartItem key={"account.order.item." + item.id} item={item} hidden />
                        )
                    })
                }
            </div>
        </>
    )
}