import { lazy } from 'react';

const Agents = lazy(() => import('./ui/pages'));
const AgentArchiveOrder = lazy(() => import('./ui/pages/archiveOrder'));
const AgentDayPlan = lazy(() => import('./ui/pages/dayPlan'));
const DetailAgent = lazy(() => import('./ui/pages/detail'));
const NewAgent = lazy(() => import('./ui/pages/new'));
const AgentNewOrder = lazy(() => import('./ui/pages/newOrder'));
const AgentsSalaries = lazy(() => import('./ui/pages/agentsSalaries'));

export {
  Agents,
  NewAgent,
  DetailAgent,
  AgentDayPlan,
  AgentNewOrder,
  AgentsSalaries,
  AgentArchiveOrder,
};
