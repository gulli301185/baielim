import { useAppSelector } from '@/app/hook';
import { userToken } from '@/app/slices/userSlice';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
  const token = useAppSelector(userToken);

  return token ? <Outlet /> : <Navigate to='/login' />;
};

export default PrivateRoute;
