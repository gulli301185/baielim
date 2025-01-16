import { Login } from '@/features/Login';
import { DetailOrder, Layout, Loader, PrivateRoute } from '@/widgets';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
} from 'react-router-dom';
import Main from '@/features/Main/Main';
import { EditStock, NewStock, Stocks } from '@/features/Stocks';
import { EditStory, NewStory, Stories } from '@/features/Stories';
import {
  AgentArchiveOrder,
  AgentDayPlan,
  AgentNewOrder,
  Agents,
  AgentsSalaries,
  DetailAgent,
  NewAgent,
} from '@/features/Agents';
import {
  CancelledOrders,
  Debt,
  EditNewOrder,
  NewNewOrder,
  NewOrders,
  OrderHistory,
  TransactionOrder,
  ArchiveOrders,
  ReturnOrder,
} from '@/features/Orders';
import {
  DetailStore,
  EditStore,
  NewStore,
  StoreArchiveOrder,
  StoreDayPlan,
  StoreDebt,
  StoreNewOrders,
  Stores,
} from '@/features/Stores';
import { DayPlans, EditDayPlan, NewDayPlan } from '@/features/DayPlan';
import { DetailItem, EditItem, Items, NewItem } from '@/features/Items';
import {
  DetailDriver,
  Drivers,
  DriversSalaries,
  EditDriver,
  NewDriver,
} from '@/features/Drivers';
import { MapStore } from '@/features/MapStore';
import { MapAgent } from '@/features/MapAgent';
import { EditRegion, NewRegion } from '@/features/Regions';
import { Stats } from '@/features/Stats';
import { Suspense } from 'react';
import { DetailFAQ, EditFAQ, FAQ, NewFAQ } from '@/features/FAQ';
import {
  DeletionRequest,
  NewDeletionRequest,
} from '@/features/DeletionRequest';
import { EditCategory, NewCategory } from '@/features/Categories';
import { StoreSales } from '@/features/StoreSales';

export const routerAdministrator = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      <Route path='*' element={<Navigate to='/' />} />
      <Route element={<PrivateRoute />}>
        <Route index element={<Main />} />
        <Route path='agents-salaries' element={<AgentsSalaries />} />
        <Route path='drivers-salaries' element={<DriversSalaries />} />
        <Route path='agents'>
          <Route index element={<Agents />} />
          <Route path='new' element={<NewAgent />} />
          <Route path=':agentID'>
            <Route index element={<DetailAgent />} />
            <Route path='new-order' element={<AgentNewOrder />} />
            <Route path='archive-order' element={<AgentArchiveOrder />} />
            <Route path='day-plan' element={<AgentDayPlan />} />
          </Route>
        </Route>
        <Route path='new-orders'>
          <Route path='new' element={<NewNewOrder />} />
          <Route index element={<NewOrders />} />
          <Route path=':orderID'>
            <Route index element={<DetailOrder edit={true} />} />
            <Route path='edit' element={<EditNewOrder />} />
            <Route path='transactions' element={<TransactionOrder />} />
            <Route path='order-history' element={<OrderHistory />} />
            <Route path='return-order' element={<ReturnOrder />} />
          </Route>
        </Route>
        <Route path='archive-orders'>
          <Route index element={<ArchiveOrders />} />
          <Route path=':orderID'>
            <Route
              index
              element={<DetailOrder delivery={true} edit={false} />}
            />
            <Route path='transactions' element={<TransactionOrder />} />
            <Route path='order-history' element={<OrderHistory />} />
          </Route>
        </Route>
        <Route path='cancelled-orders'>
          <Route index element={<CancelledOrders />} />
          <Route path=':orderID'>
            <Route
              index
              element={<DetailOrder delivery={true} edit={false} />}
            />
            <Route path='transactions' element={<TransactionOrder />} />
            <Route path='order-history' element={<OrderHistory />} />
          </Route>
        </Route>
        <Route path='debts'>
          <Route index element={<Debt />} />
          <Route path=':orderID'>
            <Route index element={<DetailOrder edit={true} />} />
            <Route path='edit' element={<EditNewOrder />} />
            <Route path='transactions' element={<TransactionOrder />} />
            <Route path='order-history' element={<OrderHistory />} />
          </Route>
        </Route>
        <Route path='stocks'>
          <Route index element={<Stocks />} />
          <Route path='new' element={<NewStock />} />
          <Route path=':stockID' element={<EditStock />} />
        </Route>
        <Route path='drivers'>
          <Route index element={<Drivers />} />
          <Route path='new' element={<NewDriver />} />
          <Route path=':driverID'>
            <Route index element={<DetailDriver />} />
            <Route path='edit' element={<EditDriver />} />
          </Route>
        </Route>
        <Route path='stories'>
          <Route index element={<Stories />} />
          <Route path='new' element={<NewStory />} />
          <Route path=':storyID' element={<EditStory />} />
        </Route>
        <Route path='stores'>
          <Route index element={<Stores />} />
          <Route path='new' element={<NewStore />} />
          <Route path=':storeID'>
            <Route index element={<DetailStore />} />
            <Route path='new-order' element={<StoreNewOrders />} />
            <Route path='archive-order' element={<StoreArchiveOrder />} />
            <Route path='debt' element={<StoreDebt />} />
            <Route path='day-plan' element={<StoreDayPlan />} />
            <Route path='edit' element={<EditStore />} />
          </Route>
          <Route path='regions'>
            <Route index element={<NewRegion />} />
            <Route path=':regionID/edit' element={<EditRegion />} />
          </Route>
        </Route>
        <Route path='items'>
          <Route index element={<Items />} />
          <Route path='new' element={<NewItem />} />
          <Route path=':itemID'>
            <Route index element={<DetailItem />} />
            <Route path='edit' element={<EditItem />} />
          </Route>
          <Route path='categories'>
            <Route index element={<NewCategory />} />
            <Route path=':catID/edit' element={<EditCategory />} />
          </Route>
        </Route>
        <Route path='store-map' element={<MapStore />} />
        <Route path='agent-map' element={<MapAgent />} />
        <Route path='stats' element={<Stats />} />
        <Route path='store-sales' element={<StoreSales />} />
        <Route path='day-plans'>
          <Route index element={<DayPlans />} />
          <Route path='new' element={<NewDayPlan />} />
          <Route path=':planID' element={<EditDayPlan />} />
        </Route>
        <Route path='faq'>
          <Route index element={<FAQ />} />
          <Route path='new' element={<NewFAQ />} />
          <Route path=':faqID'>
            <Route index element={<DetailFAQ />} />
            <Route path='edit' element={<EditFAQ />} />
          </Route>
        </Route>
        <Route path='deletion-requests' element={<DeletionRequest />} />
      </Route>
    </Route>
  )
);

export const routerManager = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<PrivateRoute />}>
      <Route path='/' element={<Layout />}>
        <Route index element={<NewOrders manager={true} />} />
        <Route
          path=':orderID'
          element={<DetailOrder edit={false} manager={true} />}
        />
        <Route path='*' element={<Navigate to={'/'} />} />
      </Route>
    </Route>
  )
);

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path='/'
      element={
        <Suspense fallback={<Loader />}>
          <Layout />
        </Suspense>
      }
    >
      <Route index element={<Login />} />
      <Route path='deletion-request' element={<NewDeletionRequest />} />
      <Route
        path='deletion-request/shamal'
        element={<NewDeletionRequest shamal={true} />}
      />
      <Route path='*' element={<Navigate to='/' />} />
    </Route>
  )
);
