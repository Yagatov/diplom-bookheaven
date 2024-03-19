import pages from '#styles/account/pages.module.scss';
import styles from '#styles/account/pages/profile.module.scss';

import { Link } from 'react-router-dom';

import Request from '../../Request.js';

import { useQuery } from '@tanstack/react-query'

export function ProfilePage() {

    const { isPending, isSuccess, isError, data, error } = useQuery({
        queryKey: ['accountProfile'],
        queryFn: () => {
            return Request.get("/api/account/profile");
        }
    });


    return (
        <div className={pages.content}>
            <h2 className={pages.title}>{ isPending ? "Загрузка" : isError ? "Ошибка" : "Профиль"}</h2>

            {
                isSuccess && (
                    <div className={pages.box}>
                        <div className={styles.profile}>
                            <div className={styles.ava}>
                                <img src={data.data.avatar == null ? "/images/avatar.jpg" : Request.getUri() + "/public/images/avatars/" + data.data.avatar} alt=""/>
                            </div>
                            <div className={styles.info}>
                                <div className={styles.nickname}>{data.data.login}</div>
                                <div className={styles.email}>{data.data.email}</div>
                            </div>
                            <Link to="/account/settings" className={styles.action} >
                                <img src="/images/icons/user_settings.svg" width={25}/>
                                Настроить
                            </Link>
                            {
                                data.data.role == "ADMIN" && (
                                    <Link to="/admin" className={styles.action} >
                                        <img src="/images/icons/admin.svg" width={25}/>
                                        Админ
                                    </Link>
                                )
                            }
                        </div>

                        <div className={styles.stats}>
                            <StatItem name="Бонусы" value={data.data.bonus}/>
                        </div>
                    </div>
                ) 
            }
            
        </div>
    )
}

function StatItem({name, value}) {
    return (
        <div className={styles.item}>
            <div className={styles.name}>{name}</div>
            <div className={styles.value}>{value}</div>
        </div>
    );
}