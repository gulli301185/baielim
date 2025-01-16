import { useAppSelector } from '@/app/hook';
import { userInfo, userToken } from '@/app/slices/userSlice';
import { Outlet } from 'react-router-dom';
import AdminSidebar from '../AdminSidebar';
import ManagerSidebar from '../ManagerSidebar';
import { Suspense } from 'react';
import Loader from '../Loader';

const Layout = () => {
  const token = useAppSelector(userToken);
  const userType = useAppSelector(userInfo);

  const sidebarByUserType = () => {
    switch (userType?.user_type) {
      case 'administrator':
        return <AdminSidebar />;
      case 'manager':
        return <ManagerSidebar />;
      default:
        return null;
    }
  };

  return (
    <div className='w-full h-screen flex'>
      {token && sidebarByUserType()}
      <main className='w-full h-full px-3 py-5 overflow-y-scroll'>
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      </main>
    </div>
  );
};

export default Layout;
