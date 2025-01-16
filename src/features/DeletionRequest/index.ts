import { lazy } from 'react';

const DeletionRequest = lazy(() => import('./ui/index'));
const NewDeletionRequest = lazy(() => import('./ui/new'));

export { DeletionRequest, NewDeletionRequest };
