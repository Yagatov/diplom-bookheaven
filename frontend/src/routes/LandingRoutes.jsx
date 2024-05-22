import LandingLayout from '#/layouts/LandingLayout';

import HomePage from '#/pages/landing/HomePage';
import SearchPage from '#/pages/landing/SearchPage';
import ProductPage from '#/pages/landing/ProductPage';
import CategoryPage from '#/pages/landing/CategoryPage';

import AboutPage from '#/pages/landing/AboutPage';
import PaymentPage from '#/pages/landing/PaymentPage';
import NotFoundPage from '#/pages/NotFoundPage';

export default {
    path: "/",
    element: <LandingLayout />,
    // errorElement: <NotFoundPage />,
    children: [
        {
            index: true,
            element: <HomePage />
        },
        {
            path: 'about',
            element: <AboutPage />
        },
        {
            path: 'payment',
            element: <PaymentPage />  
        },
        {
            path: 'search/:message',
            element: <SearchPage />
        },
        {
            path: 'category/:id',
            element: <CategoryPage />
        },
        {
            path: 'product/:id',
            element: <ProductPage />
        },
    ]
}