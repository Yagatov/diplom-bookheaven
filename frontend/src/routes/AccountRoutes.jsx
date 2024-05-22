import { Navigate } from 'react-router-dom';

import { AccountLayout } from '../layouts/AccountLayout';
import { ProfilePage } from '../pages/account/ProfilePage';
import { OrdersPage } from '../pages/account/OrdersPage';
import { OrderPage } from '../pages/account/OrderPage';
import { CartPage } from '../pages/account/CartPage';
import { SupportPage } from '../pages/account/SupportPage';
import { SettingsPage } from '../pages/account/SettingsPages';
import { CheckoutPage } from '#/pages/account/CheckoutPage';
import NotFoundPage from '../pages/NotFoundPage.jsx';

export default {
    path: "/account",
    element: <AccountLayout />,
    // errorElement: <NotFoundPage />,
    children: [
        {
            index: true,
            element: <Navigate to="/account/profile" />
        },
        {
            path: 'profile',
            element: <ProfilePage />
        },
        {
            path: 'orders',
            element: <OrdersPage />
        },
        {
            path: 'order/:id',
            element: <OrderPage />
        },
        {
            path: 'cart',
            element: <CartPage />
        },
        {
            path: 'support',
            element: <SupportPage />
        },
        {
            path: 'settings',
            element: <SettingsPage />
        },
        {
            path: 'checkout',
            element: <CheckoutPage />
        }
    ]
}