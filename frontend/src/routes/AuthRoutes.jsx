import { Navigate } from 'react-router-dom';

import { AuthLayout } from '../layouts/AuthLayout';
import { LoginPage } from '../pages/auth/LoginPage';
import { RegisterPage } from '../pages/auth/RegisterPage';

export default {
    path: "/auth",
    element: <AuthLayout />,
    children: [
        {
            index: true,
            element: <Navigate to="/auth/login" />
        },
        {
            path: 'login',
            element: <LoginPage />
        },
        {
            path: 'register',
            element: <RegisterPage />
        },
    ]
}