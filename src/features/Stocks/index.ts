import { lazy } from 'react';

const Stocks = lazy(() => import('./ui/pages'));
const EditStock = lazy(() => import('./ui/pages/edit'));
const NewStock = lazy(() => import('./ui/pages/new'));

export { Stocks, NewStock, EditStock };
