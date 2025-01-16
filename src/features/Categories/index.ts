import { lazy } from 'react';

const EditCategory = lazy(() => import('./ui/edit'));
const NewCategory = lazy(() => import('./ui/new'));

export { EditCategory, NewCategory };
