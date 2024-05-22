import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import '#styles/global.scss';

import LandingRoutes from './routes/LandingRoutes';
import AuthRoutes from './routes/AuthRoutes';
import AccountRoutes from './routes/AccountRoutes';
import AdminRoutes from './routes/AdminRoutes';

const router = createBrowserRouter([
    LandingRoutes,
    AuthRoutes,
    AccountRoutes,
    AdminRoutes
]);

function App() {
    return (
        <RouterProvider router={router} />
    )
}

export default App;
