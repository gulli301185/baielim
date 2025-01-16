import { lazy } from 'react';

const Stores = lazy(() => import('./ui/pages'));
const Agents = lazy(() => import('./ui/pages'));
const StoreArchiveOrder = lazy(() => import('./ui/pages/archiveOrder'));
const StoreDayPlan = lazy(() => import('./ui/pages/dayPlan'));
const StoreDebt = lazy(() => import('./ui/pages/debt'));
const DetailStore = lazy(() => import('./ui/pages/detail'));
const EditStore = lazy(() => import('./ui/pages/edit'));
const NewStore = lazy(() => import('./ui/pages/new'));
const StoreNewOrders = lazy(() => import('./ui/pages/newOrder'));

export {
  DetailStore,
  Agents,
  StoreNewOrders,
  StoreArchiveOrder,
  Stores,
  StoreDayPlan,
  NewStore,
  EditStore,
  StoreDebt,
};
