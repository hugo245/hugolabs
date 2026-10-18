import { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { SiteLayout } from './components/layout/SiteLayout';
import { Home } from './pages/Home';

const Pricing = lazy(() => import('./pages/Pricing').then((module) => ({ default: module.Pricing })));
const Contact = lazy(() => import('./pages/Contact').then((module) => ({ default: module.Contact })));

const router = createBrowserRouter([
  {
    element: <SiteLayout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/pricing', element: <Suspense fallback={<div className="route-loader">Loading pricing…</div>}><Pricing /></Suspense> },
      { path: '/contact', element: <Suspense fallback={<div className="route-loader">Loading contact…</div>}><Contact /></Suspense> },
      { path: '*', element: <Home /> },
    ],
  },
]);

export function App() { return <RouterProvider router={router} />; }
