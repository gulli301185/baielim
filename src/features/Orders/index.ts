import { lazy } from 'react';

const NewOrders = lazy(() => import('./ui/pages/newOrders'));
const ArchiveOrders = lazy(() => import('./ui/pages/archiveOrders'));
const CancelledOrders = lazy(() => import('./ui/pages/cancelled'));
const Debt = lazy(() => import('./ui/pages/debt'));
const EditNewOrder = lazy(() => import('./ui/pages/edit'));
const OrderHistory = lazy(() => import('./ui/pages/history'));
const NewNewOrder = lazy(() => import('./ui/pages/new'));
const TransactionOrder = lazy(() => import('./ui/pages/transaction'));
const ReturnOrder = lazy(() => import('./ui/pages/returnOrder'));

export {
  Debt,
  NewOrders,
  NewNewOrder,
  EditNewOrder,
  OrderHistory,
  CancelledOrders,
  TransactionOrder,
  ArchiveOrders,
  ReturnOrder,
};
