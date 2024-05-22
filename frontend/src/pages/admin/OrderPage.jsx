import styles from '#styles/pages/admin/order.module.scss';

import Loader from '#/ui/Loader';
import CartItem from '#/ui/shop/CartItem';

import Request from '#/Request.js';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useParams } from "react-router-dom"
import { useState } from 'react';

export function OrderPage() {
    const { id } = useParams();

    const query = useQuery({
        queryKey: [`adminOrders[${id}]`],
        queryFn: () => {
            return Request.get("/api/admin/order/" + id);
        }
    });

    if(query.isPending) return ( <Loader/> );
    if(query.isError) return ( <h3>Ошибка сервера</h3> );

    const data = query.data.data;

    return (
        <>
            <div className={styles.title}>Заказ №{ id }</div>

            <div className={styles.info}>
                <p>
                    Заказчик: <span>{ data.user.login } / { data.user.email } / { data.user.bonus } бонусов </span>
                </p>
                <p>
                    Дата создания: <span>{ data.created_at }</span>
                </p>
                <p>
                    Дата обновления: <span>{ data.updated_at }</span>
                </p>
                <p>
                    Стоимость: <span>{ data.price } рублей</span>
                </p>
                <p>
                    Использовано бонусов: <span>{ data.bonus_take }</span>
                </p>
                <p>
                    Бонусов к выдаче: <span>{ data.bonus_give }</span>
                </p>
                <p>
                    Выдан ли бонусы: <span>{ data.bonus_completed ? "Выдано" : "Ещё не выдано" }</span>
                </p>
                <div>
                    {/* Статус: <span>{ data.status }</span> */}
                    <ChangeStatus id={id} status={data.status} />
                </div>
            </div>
            
            <div className={styles.subtitle}>Товары</div>

            <div className={styles.box}>
                {
                    data.orderItems?.map(item => {
                        return (
                            <CartItem key={"admin.order.item." + item.id} item={item} hidden />
                        )
                    })
                }
            </div>
        </>
    )
}

function ChangeStatus({ id, status }) {
    const [ current, setCurrent ] = useState(status);
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: (data) => {
            return Request.post('/api/admin/order/' + id + '/status', data)
        },
        onSuccess: () => {
            queryClient.invalidateQueries(`adminOrders[${id}]`);
        } 
    });

    function handleStatus(type) {
        setCurrent(type);
        mutation.mutate({ status: type });
    }

    return (
        <>
            <p>Статус: <span>{ status }</span></p>
            <div className={styles.status}>
                <StatusItem disabled={mutation.isPending} handle={handleStatus} current={current} id="process" name="В процессе" />
                <StatusItem disabled={mutation.isPending} handle={handleStatus} current={current} id="completed" name="Выполнен" />
                <StatusItem disabled={mutation.isPending} handle={handleStatus} current={current} id="cancel" name="Отменён" />
            </div>
        </>
    )
}

function StatusItem({ disabled = false, handle, current, id, name }) {
    return (
        <button disabled={disabled} onClick={() => handle(id)} className={[styles.item, current == id ? styles.active : ""].join(' ')} >
            { name }
        </button>
    )
}