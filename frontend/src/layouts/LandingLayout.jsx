import styles from '#styles/landing/base.module.scss';

import { Outlet } from 'react-router-dom';

import { Navigation, NavigationButton } from '#ui/blocks/Navigation.jsx';
import { Footer } from '#ui/blocks/Footer.jsx';

import { useAtomValue } from 'jotai';
import UserAtom from '../atoms/UserAtom.js';

export function LandingLayout() {

    return (
        <div className={styles.wrapper}>
            <div className={styles.content}>
                <Navigation buttons={<NavigationButtons />}/>

                <Outlet />
            </div>

            <Footer />
        </div>
    )
}

function NavigationButtons() {
    const user = useAtomValue(UserAtom);

    return (
        <>
            <NavigationButton name="Аккаунт" icon="user" to={user ? "/account/profile" : "/auth" }/>
            {/* <NavigationButton name="Избранное" icon="favorite" to={user ? "/account/favorite" : "/auth" }/> */}
            <NavigationButton name="Корзина" icon="shopping-cart" to={user ? "/account/basket" : "/auth" }/>
        </>
    )
}