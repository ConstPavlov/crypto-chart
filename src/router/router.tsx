import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Dashboard from '../pages/dashboard/Dashboard';
import MegaBot from '../pages/megabot/MegaBot';
import NotFound from '../pages/notfound/NotFound';

export const router = createBrowserRouter([
  {
    element: <App />,
    path: '/',
    children: [
      {
        path: 'dashboard',
        element: <Dashboard />,
      },
      {
        path: 'megabot',
        element: <MegaBot />,
      },
      {
        path: '/market',
        element: <MegaBot />,
      },
      {
        path: '/prices',
        element: <MegaBot />,
      },
      {
        path: '/profile',
        element: <MegaBot />,
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
]);
