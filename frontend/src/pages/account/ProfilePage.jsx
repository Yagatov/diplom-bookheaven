import styles from '#styles/pages/account/profile.module.scss';

import Loader from '#/ui/Loader';
import Request from '#/Request.js';

import { Link } from 'react-router-dom';

import { useQuery } from '@tanstack/react-query'

export function ProfilePage() {
    const query = useQuery({
        queryKey: ['accountProfile'],
        queryFn: () => {
            return Request.get('/api/account/profile');
        }
    });

    if(query.isPending) return ( <Loader/> );
    if(query.isError) return ( <h3>Ошибка сервера</h3> );

    const { avatar, login, email, role, bonus } = query.data.data;
    
    return (
        <>
            <div className={styles.profile}>
                <div className={styles.ava}>
                    <img src={ avatar == null ? "/images/avatar.jpg" : Request.getUri() + "/public/images/avatars/" + avatar} />
                </div>
                <div className={styles.info}>
                    <div className={styles.nickname}>{ login }</div>
                    <div className={styles.email}>{ email }</div>
                </div>
                <Link to="/account/settings" className={styles.action} >
                    <img src="/images/icons/user_settings.svg" width={25}/>
                    Настроить
                </Link>
                {
                    role == "ADMIN" && (
                        <Link to="/admin/dashboard" className={styles.action} >
                            <img src="/images/icons/admin.svg" width={25}/>
                            Админ
                        </Link>
                    )
                }
            </div>

            <div className={ styles.stats }>
                <StatItem name="Бонусы" value={ bonus }/>
            </div>
        </>
    )
}

function StatItem({ name, value }) {
    return (
        <div className={styles.item}>
            <div className={styles.name}>{ name }</div>
            <div className={styles.value}>{ value }</div>
        </div>
    );
}