import { IDayPlan, IStoreDayPlan, Status } from '@/shared/types';
import { useAxiosRequest } from '@/shared/utils/helpers/axiosRequest';
import { toastError } from '@/shared/utils/helpers/toastify';
import { useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';

const useEditDayPlanService = () => {
  const navigate = useNavigate();
  const { planID } = useParams();
  const axiosInstance = useAxiosRequest();

  const [isLoading, setLoading] = useState<Status>('initial');
  const [storePlans, setStorePlans] = useState<IStoreDayPlan[]>([]);
  const [image, setImage] = useState('');
  const [open, setOpen] = useState('');
  const [add, setAdd] = useState(false);

  const { control, handleSubmit } = useForm({
    defaultValues: async () => {
      const { success, data } = await fetchData();
      if (success && data !== undefined) {
        return {
          day: data.day,
        };
      } else {
        return null;
      }
    },
  });

  const fetchData = async () => {
    setLoading('loading');

    try {
      const { data } = await axiosInstance.get<IDayPlan>(
        `/user/dayPlan/${planID}/`
      );
      setLoading('success');
      setStorePlans(data.stores_plan);
      return { success: true, data };
    } catch (error) {
      setLoading('error');
      return { success: false, data: undefined };
    }
  };

  const onSubmit: SubmitHandler<FieldValues> = async ({ day }) => {
    setLoading('loading');

    try {
      const dataToSend = {
        day,
        stores_plan: storePlans?.map((plan) => plan.id),
      };

      await axiosInstance.patch<Partial<IDayPlan>>(
        `/user/dayPlan/${planID}/`,
        dataToSend
      );

      setLoading('success');

      navigate(-1);
    } catch (error: any) {
      setLoading('error');
      toastError(
        error.data?.detail ||
          'Возникла ошибка. Пожалуйста, повторите попытку позже'
      );
    }
  };

  const handleClose = (id: string) => {
    setOpen(id);
  };

  const handleCloseAdd = () => {
    setAdd(!add);
  };

  return {
    add,
    open,
    image,
    control,
    onSubmit,
    setImage,
    isLoading,
    storePlans,
    handleClose,
    handleSubmit,
    setStorePlans,
    handleCloseAdd,
  };
};

export default useEditDayPlanService;
