import { useAppDispatch, useAppSelector } from '@/app/hook';
import {
  authLoading,
  loginFailure,
  loginStart,
  loginSuccess,
} from '@/app/slices/userSlice';
import { ILoginRequest } from '@/shared/types';
import { axiosRequest } from '@/shared/utils/helpers/axiosRequest';
import { toastError } from '@/shared/utils/helpers/toastify';
import { jwtDecode } from 'jwt-decode';
import { useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const useLogin = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const status = useAppSelector(authLoading);

  const [show, setShow] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit: SubmitHandler<FieldValues> = async ({
    login,
    password,
  }: FieldValues) => {
    try {
      dispatch(loginStart());

      const { data } = await axiosRequest.post<ILoginRequest>('user/login/', {
        login,
        password,
      });

      const decoded = jwtDecode(data.access) as {
        user_type: string;
        user_id: number;
      };

      if (
        decoded.user_type !== 'administrator' &&
        decoded.user_type !== 'manager'
      ) {
        throw new Error('Неверный логин или пароль');
      }

      dispatch(
        loginSuccess({
          token: data,
          userInfo: {
            user_type: decoded.user_type,
            user_id: decoded.user_id,
          },
        })
      );

      navigate('/', { replace: true });
    } catch (error: any) {
      const errMessage =
        error.response?.data?.detail ||
        error?.message ||
        'Неверный логин или пароль';
      toastError(errMessage);
      dispatch(loginFailure(errMessage));
    }
  };

  return {
    show,
    errors,
    status,
    setShow,
    onSubmit,
    register,
    navigate,
    handleSubmit,
  };
};

export default useLogin;
