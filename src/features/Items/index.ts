import { lazy } from 'react';

const Items = lazy(() => import('./ui/pages'));
const DetailItem = lazy(() => import('./ui/pages/detail'));
const EditItem = lazy(() => import('./ui/pages/edit'));
const NewItem = lazy(() => import('./ui/pages/new'));

export { Items, EditItem, NewItem, DetailItem };
