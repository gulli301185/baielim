import { lazy } from 'react';

const DayPlans = lazy(() => import('./ui/pages'));
const EditDayPlan = lazy(() => import('./ui/pages/edit'));
const NewDayPlan = lazy(() => import('./ui/pages/new'));

export { DayPlans, NewDayPlan, EditDayPlan };
