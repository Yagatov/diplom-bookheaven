import styles from '#styles/pages/admin/users.module.scss';

import Loader from '#/ui/Loader';

import Request from '#/Request.js';
import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom';

export function UsersPage() {

    const query = useQuery({
        queryKey: ['adminUser'],
        queryFn: () => {
            return Request.get("/api/admin/users/");
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
                        <Link className={styles.item} to={"/admin/user/" + item.id} key={"admin.user." + item.id}>
                            <p>#{ item.id } Пользователь { item.login }</p>
                        </Link>
                    )
                })}
            </div>
        </>
    )
}