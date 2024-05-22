import markup from '#styles/global/markup.module.scss';
import styles from '#styles/layouts/account.module.scss';

import Request from '#/Request.js';

import { NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';

import { useAtom } from 'jotai';
import UserAtom from '../atoms/UserAtom.js';
import { useEffect } from 'react';

import { Navigation, NavigationButton } from '#ui/blocks/Navigation.jsx';
import { Footer } from '#ui/blocks/Footer.jsx';


export function AdminLayout() {
    const [ user, setUser ] = useAtom(UserAtom);
    
    const navigate = useNavigate();
    const { pathname } = useLocation();

    useEffect(() => {
        if(user == null) {
            navigate('/auth');
        }
    }, [])

    let pages = {
        "/admin/dashboard": {
            sidebar: true,
            name: "Главная"
        },
        "/admin/users": {
            sidebar: true,
            name: "Пользователи"
        },
        "/admin/messages": {
            sidebar: true,
            name: "Сообщения"
        },
        "/admin/orders": {
            sidebar: true,
            name: "Заказы"
        },
        "/admin/categories": {
            sidebar: true,
            name: "Категории"
        },
        "/admin/products": {
            sidebar: true,
            name: "Продукты"
        },
    };

    function getNavClass({ isActive }) {
        return isActive ? [styles.item, styles.active].join(' ') : styles.item;
    }

    return (
        <div className={markup.wrapper}>
            <div className={markup.content}>
                <Navigation buttons={<NavigationButtons user={user} setUser={setUser} navigate={navigate} />}/>

                <div className={[markup.container, styles.box].join(' ')}>
                    <div className={styles.sidebar}>
                        <h4 className={styles.title}>Панель админа</h4>
                        <div className={styles.list}>
                            {
                                Object.entries(pages).map(([ key, value ]) => {
                                    if(value.sidebar) return (
                                        <NavLink key={"account.sidebar." + key} to={ key } className={getNavClass}>{ value.name }</NavLink>
                                    )
                                })
                            }
                        </div>
                    </div>

                    <div className={styles.content}>
                        <div className={styles.title}>{ pages[pathname]?.name }</div>
                        <div className={styles.wrapper}>
                            <Outlet />
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    )
}

function NavigationButtons({user, setUser, navigate}) {

    const mutation = useMutation({
        mutationFn: () => {
            return Request.post('/api/auth/logout')
        }
    })


    function logoutHandler() {
        setUser(null);
        mutation.mutate();
        setTimeout(() => {
            navigate('/auth');
        }, 500);
    }

    return (
        <>
            <NavigationButton to="/account" name="Профиль" icon="user"/>
            <NavigationButton onClick={logoutHandler} name="Выйти" icon="user"/>
        </>
    )
}