import { lazy } from 'react';

const Stories = lazy(() => import('./ui/pages'));
const EditStory = lazy(() => import('./ui/pages/edit'));
const NewStory = lazy(() => import('./ui/pages/new'));

export { NewStory, Stories, EditStory };
