import { RouterProvider } from 'react-router-dom';
import { router, routerAdministrator, routerManager } from './router';
import { useAppSelector } from './hook';
import { userInfo } from './slices/userSlice';
import { useCallback } from 'react';

const App = () => {
  const user_type = useAppSelector(userInfo);

  const getRouterBasedOnUserType = useCallback(() => {
    switch (user_type?.user_type) {
      case 'administrator':
        return routerAdministrator;
      case 'manager':
        return routerManager;
      default:
        return router;
    }
  }, [user_type?.user_type]);

  return <RouterProvider router={getRouterBasedOnUserType()} />;
};

export default App;
