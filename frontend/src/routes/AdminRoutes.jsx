import { Navigate } from 'react-router-dom';

import { AdminLayout } from '../layouts/AdminLayout';
import { DashboardPage } from '../pages/admin/DashboardPage';
import { CategoriesPage } from '../pages/admin/CategoriesPage';
import { OrdersPage } from '../pages/admin/OrdersPage';
import { ProductsPage } from '../pages/admin/ProductsPage';
import { OrderPage } from '#/pages/admin/OrderPage';
import { UsersPage } from '#/pages/admin/UsersPage';
import { UserPage } from '#/pages/admin/UserPage';
import { MessagesPage } from '#/pages/admin/MessagesPage';

export default {
    path: "/admin",
    element: <AdminLayout />,
    children: [
        {
            index: true,
            element: <Navigate to="/admin/dashboard" />
        },
        {
            path: 'dashboard',
            element: <DashboardPage />
        },
        {
            path: 'categories',
            element: <CategoriesPage />
        },
        {
            path: 'products',
            element: <ProductsPage />
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
            path: 'users',
            element: <UsersPage />
        },
        {
            path: 'user/:id',
            element: <UserPage />
        },
        {
            path: 'messages',
            element: <MessagesPage />
        }
    ]
}