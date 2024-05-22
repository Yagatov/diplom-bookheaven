import styles from '#styles/pages/admin/user.module.scss';

import Loader from '#/ui/Loader';
import CartItem from '#/ui/shop/CartItem';

import Request from '#/Request.js';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useParams } from "react-router-dom"
import { useState } from 'react';

export function UserPage() {
    const { id } = useParams();

    const query = useQuery({
        queryKey: [`adminUsers[${id}]`],
        queryFn: () => {
            return Request.get("/api/admin/user/" + id);
        }
    });

    if(query.isPending) return ( <Loader/> );
    if(query.isError) return ( <h3>Ошибка сервера</h3> );

    const data = query.data.data;

    return (
        <>
            <div className={styles.title}>Пользователь #{ id }</div>

            <div className={styles.info}>
                <p>
                    Логин: <span>{ data.login } </span>
                </p>
                <p>
                    Почта: <span>{ data.email } </span>
                </p>
                <p>
                    Бонусов: <span>{ data.bonus } </span>
                </p>
                <p>
                    Создано: <span>{ data.created_at } </span>
                </p>
                <p>
                    Обновлено: <span>{ data.updated_at } </span>
                </p>
                <div>
                    <ChangeRole id={id} role={data.role} />
                </div>
            </div>
        </>
    )
}

function ChangeRole({ id, role }) {
    const [ current, setCurrent ] = useState(role);
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: (data) => {
            return Request.post('/api/admin/user/' + id + '/role', data)
        },
        onSuccess: () => {
            queryClient.invalidateQueries(`adminUsers[${id}]`);
        } 
    });

    function handleStatus(type) {
        setCurrent(type);
        mutation.mutate({ role: type });
    }

    return (
        <>
            <p>Роль: <span>{ role }</span></p>
            <div className={styles.status}>
                <RoleItem disabled={mutation.isPending} handle={handleStatus} current={current} id="USER" name="Обычный" />
                <RoleItem disabled={mutation.isPending} handle={handleStatus} current={current} id="ADMIN" name="Администратор" />
            </div>
        </>
    )
}

function RoleItem({ disabled = false, handle, current, id, name }) {
    return (
        <button disabled={disabled} onClick={() => handle(id)} className={[styles.item, current == id ? styles.active : ""].join(' ')} >
            { name }
        </button>
    )
}