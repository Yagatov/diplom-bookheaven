import { Routes, Route, Navigate } from 'react-router-dom';

import '#styles/global.scss';

import { LandingLayout } from './layouts/LandingLayout';
import { HomePage } from './pages/landing/HomePage';
import { AboutPage } from './pages/landing/AboutPage';

import { AuthLayout } from './layouts/AuthLayout';
import { LoginPage } from './pages/auth/LoginPage';
import { RegisterPage } from './pages/auth/RegisterPage';

import { AccountLayout } from './layouts/AccountLayout';
import { ProfilePage } from './pages/account/ProfilePage';


function App() {
  return (
    <Routes>
        <Route path="/" element={<LandingLayout />}>
            <Route index element={<HomePage />}/>
            <Route path="about" element={<AboutPage />}/>
        </Route>
        <Route path="/auth" element={<AuthLayout />}>
            <Route index element={<Navigate to="/auth/login" />}/>
            <Route path="login" element={<LoginPage />}/>
            <Route path="register" element={<RegisterPage />}/>
        </Route>
        <Route path="/account" element={<AccountLayout />}>
            <Route index element={<Navigate to="/account/profile" />} />
            <Route path="profile" element={<ProfilePage />} />
        </Route>
        <Route path="*" element={<Navigate to="/" />}/>
    </Routes>
  )
}

export default App;
