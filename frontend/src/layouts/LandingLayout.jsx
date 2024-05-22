import markup from '#styles/global/markup.module.scss';

import { Outlet } from 'react-router-dom';

import { useAtomValue } from 'jotai';
import UserAtom from '#atoms/UserAtom.js';

import { Navigation, NavigationButton } from '#ui/blocks/Navigation.jsx';
import { Footer } from '#ui/blocks/Footer.jsx';

export default () => {
    return (
        <div className={markup.wrapper}>
            <div className={markup.content}>
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
            <NavigationButton name="Аккаунт" icon="user" to={ user ? "/account/profile" : "/auth" }/>
            <NavigationButton name="Корзина" icon="shopping-cart" to={ user ? "/account/cart" : "/auth" }/>
        </>
    )
}