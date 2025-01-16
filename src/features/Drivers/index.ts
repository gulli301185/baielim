import { lazy } from 'react';

const Drivers = lazy(() => import('./ui/pages'));
const DetailDriver = lazy(() => import('./ui/pages/detail'));
const EditDriver = lazy(() => import('./ui/pages/edit'));
const NewDriver = lazy(() => import('./ui/pages/new'));
const DriversSalaries = lazy(() => import('./ui/pages/driversSalaries'));

export { DriversSalaries, Drivers, DetailDriver, EditDriver, NewDriver };
