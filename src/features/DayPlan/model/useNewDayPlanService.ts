import { IDayPlan, IStoreDayPlan } from '@/shared/types';
import { useAxiosRequest } from '@/shared/utils/helpers/axiosRequest';
import { toastError, toastSuccess } from '@/shared/utils/helpers/toastify';
import { useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const useNewDayPlanService = () => {
  const navigate = useNavigate();
  const axiosInstance = useAxiosRequest();

  const [storePlans, setStorePlans] = useState<any[]>([]);
  const [open, setOpen] = useState(false);

  const { control, handleSubmit } = useForm();

  const onSubmit: SubmitHandler<FieldValues> = async ({
    day,
    agent,
    status,
    driver,
    dateCreated,
  }: FieldValues) => {
    try {
      const dataToSend = {
        day,
        agent: agent?.id,
        status,
        driver: driver?.id,
        dateCreated,
        stores_plan: storePlans?.map((plan) => plan?.id),
      };

      await axiosInstance.post<IDayPlan>(`/user/dayPlan/`, dataToSend);

      navigate(-1);
    } catch (error: any) {
      toastError(
        error.data?.detail ||
          'Возникла ошибка. Пожалуйста, повторите попытку позже'
      );
    }
  };

  const handleClose = () => {
    setOpen(!open);
  };

  const handleDeleteStorePlan = async (id: number) => {
    try {
      await axiosInstance.delete<IStoreDayPlan>(`/user/storePlan/${id}/`);
      setStorePlans((prev) => prev.filter((plan) => plan.id !== id));
      toastSuccess('План магазина успешно удален');
    } catch (error: any) {
      toastError(
        error.data?.detail ||
          'Возникла ошибка. Пожалуйста, повторите попытку позже'
      );
    }
  };

  return {
    open,
    control,
    onSubmit,
    storePlans,
    handleClose,
    handleSubmit,
    setStorePlans,
    handleDeleteStorePlan,
  };
};

export default useNewDayPlanService;
