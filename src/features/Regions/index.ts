import { lazy } from 'react';

const EditRegion = lazy(() => import('./ui/pages/edit'));
const NewRegion = lazy(() => import('./ui/pages/new'));

export { EditRegion, NewRegion };
