import styles from '#styles/landing/base.module.scss';
import footerStyles from '#styles/account/base.module.scss';

import Request from '../Request.js';

import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useMutation, useQuery } from '@tanstack/react-query';

import { useAtom } from 'jotai';
import UserAtom from '../atoms/UserAtom.js';
import { useEffect } from 'react';

import { Navigation, NavigationButton } from '#ui/blocks/Navigation.jsx';
import { Footer } from '#ui/blocks/Footer.jsx';


export function AdminLayout() {
    const [ user, setUser ] = useAtom(UserAtom);
    
    const navigate = useNavigate();

    useEffect(() => {
        if(user == null) {
            navigate('/auth');
        }
    }, [])

    function getNavClass({ isActive }) {
        return isActive ? [footerStyles.item, footerStyles.active].join(' ') : footerStyles.item;
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.content}>
                <Navigation buttons={<NavigationButtons user={user} setUser={setUser} navigate={navigate} />}/>

                <div className={[styles.container, footerStyles.box].join(' ')}>
                    <div className={footerStyles.sidebar}>
                        <h4 className={footerStyles.title}>Панель админа</h4>
                        <div className={footerStyles.list}>
                            <NavLink to="/admin/dashboard" className={getNavClass}>Профиль</NavLink>
                            <NavLink to="/admin/orders" className={getNavClass}>Заказы</NavLink>
                            <NavLink to="/admin/categories" className={getNavClass}>Категории</NavLink>
                            <NavLink to="/admin/products" className={getNavClass}>Продукты</NavLink>
                        </div>
                    </div>

                    <Outlet />
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