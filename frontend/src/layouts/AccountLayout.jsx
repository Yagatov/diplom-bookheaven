import markup from '#styles/global/markup.module.scss';
import styles from '#styles/layouts/account.module.scss';

import Request from '../Request.js';

import { NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';

import { useAtom } from 'jotai';
import UserAtom from '#atoms/UserAtom.js';

import { Navigation, NavigationButton } from '#ui/blocks/Navigation.jsx';
import { Footer } from '#ui/blocks/Footer.jsx';

import { useEffect } from 'react';


export function AccountLayout() {
    const [ user, setUser ] = useAtom(UserAtom);
    
    const navigate = useNavigate();
    const { pathname } = useLocation();

    useEffect(() => {
        if(user == null) return navigate('/auth/login');
    }, []);

    let pages = {
        "/account/profile": {
            sidebar: true,
            name: "Профиль"
        },
        "/account/orders": {
            sidebar: true,
            name: "Заказы"
        },
        "/account/cart": {
            sidebar: true,
            name: "Корзина"
        },
        "/account/support": {
            sidebar: true,
            name: "Связаться"
        },
        "/account/settings": {
            sidebar: false,
            name: "Настройка профиля"
        },
        "/account/checkout": {
            sidebar: false,
            name: "Оформление заказа"
        },
        "/account/order": {
            sidebar: false,
            name: "Заказ"
        }
    };

    function getNavClass({ isActive }) {
        return isActive ? [ styles.item, styles.active ].join(' ') : styles.item;
    }

    return (
        <div className={markup.wrapper}>
            <div className={markup.content}>
                <Navigation buttons={<NavigationButtons user={user} setUser={setUser} navigate={navigate} />}/>

                <div className={[ markup.container, styles.box ].join(' ')}>
                    <div className={styles.sidebar}>
                        <h4 className={styles.title}>Книжный рай</h4>
                        <div className={styles.list}>
                            {/* <NavLink to="/account/profile" className={getNavClass}>Профиль</NavLink>
                            <NavLink to="/account/orders" className={getNavClass}>Заказы</NavLink>
                            <NavLink to="/account/basket" className={getNavClass}>Корзина</NavLink> */}
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

function NavigationButtons({ setUser, navigate }) {
    const mutation = useMutation({
        mutationFn: () => {
            return Request.post('/api/auth/logout')
        }
    })


    function logoutHandler() {
        setUser(null);
        navigate('/auth/login');
        mutation.mutate();
    }

    return (
        <>
            <NavigationButton onClick={logoutHandler} name="Выйти" icon="user"/>
        </>
    )
}