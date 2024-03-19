import { Routes, Route, Navigate } from 'react-router-dom';

import '#styles/global.scss';

import { LandingLayout } from './layouts/LandingLayout';
import { HomePage } from './pages/landing/HomePage';
import { AboutPage } from './pages/landing/AboutPage';
import { CategoryPage } from './pages/landing/CategoryPage';
import { SearchPage } from './pages/landing/SearchPage';

import { AuthLayout } from './layouts/AuthLayout';
import { LoginPage } from './pages/auth/LoginPage';
import { RegisterPage } from './pages/auth/RegisterPage';

import { AccountLayout } from './layouts/AccountLayout';
import { ProfilePage } from './pages/account/ProfilePage';
import { OrdersPage as AccountOrdersPage } from './pages/account/OrdersPage';
import { BasketPage } from './pages/account/BasketPage';
import { FavoritePage } from './pages/account/FavoritePage';
import { SupportPage } from './pages/account/SupportPage';
import { SettingsPage } from './pages/account/SettingsPages';


import { AdminLayout } from './layouts/AdminLayout';
import { DashboardPage } from './pages/admin/DashboardPage';
import { CategoriesPage } from './pages/admin/CategoriesPage';
import { OrdersPage as AdminOrdersPage } from './pages/admin/OrdersPage';
import { ProductsPage } from './pages/admin/ProductsPage';
import { PaymentPage } from './pages/landing/PaymentPage';

function App() {
  return (
    <Routes>
        <Route path="/" element={<LandingLayout />}>
            <Route index element={<HomePage />}/>
            <Route path="about" element={<AboutPage />}/>
            <Route path="payment" element={<PaymentPage />}/>
            <Route path="category/:id" element={<CategoryPage />}/>
            <Route path="search/:message" element={<SearchPage />}/>
        </Route>
        <Route path="/auth" element={<AuthLayout />}>
            <Route index element={<Navigate to="/auth/login" />}/>
            <Route path="login" element={<LoginPage />}/>
            <Route path="register" element={<RegisterPage />}/>
        </Route>
        <Route path="/account" element={<AccountLayout />}>
            <Route index element={<Navigate to="/account/profile" />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="orders" element={<AccountOrdersPage />} />
            <Route path="basket" element={<BasketPage />} />
            <Route path="favorite" element={<FavoritePage />} />
            <Route path="support" element={<SupportPage />} />
            <Route path="settings" element={<SettingsPage />} />
        </Route>
        <Route path='/admin' element={<AdminLayout />}>
            <Route index element={<Navigate to="/admin/dashboard" />} />
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="categories" element={<CategoriesPage />} />
            <Route path="orders" element={<AdminOrdersPage />} />
            <Route path="products" element={<ProductsPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/" />}/>
    </Routes>
  )
}

export default App;
