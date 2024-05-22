import styles from '#styles/pages/admin/messages.module.scss';

import Loader from '#/ui/Loader';

import Request from '#/Request.js';
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react';

export function MessagesPage() {

    const query = useQuery({
        queryKey: ['adminMessages'],
        queryFn: () => {
            return Request.get("/api/admin/messages/");
        }
    });

    if(query.isPending) return ( <Loader /> );
    if(query.isError) return ( <h3>Ошибка сервера</h3> );

    const data = query.data?.data;

    return (
        <>
            <div className={styles.box}>
                {data?.map(item => {
                    return (
                        <MessageItem key={"admin.message." + item.id} message={item} />
                    )
                })}
            </div>
        </>
    )
}

function MessageItem({ message }) {
    const [ active, setActive ] = useState(false);

    return (
        <>
            {
                !active ? (
                    <div className={styles.item} onClick={() => setActive((prev) => !prev)}>
                        <p>#{ message.id } Сообщение от {message.user.login} </p>
                    </div>
                ) : (
                    <div className={styles.item2} onClick={() => setActive((prev) => !prev)}>
                        <p>Тема: { message.topic }</p>
                        <p>Сообщение: { message.message }</p>
                    </div>
                )
            }
        </>
    )
}