import { IStoreDayPlan } from '@/shared/types';
import { useAxiosRequest } from '@/shared/utils/helpers/axiosRequest';
import { toastError } from '@/shared/utils/helpers/toastify';
import { uploadIMG } from '@/shared/utils/helpers/upload';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';

const useNewStoreDayPlan = ({
  setStorePlans,
  handleClose,
}: {
  setStorePlans: (value: any) => void;
  handleClose: () => void;
}) => {
  const axiosInstance = useAxiosRequest();

  const { control, handleSubmit, watch, getValues, reset } = useForm();

  const onSubmit: SubmitHandler<FieldValues> = async ({
    comment,
    madeOrder,
    photo,
    status,
    store,
  }: FieldValues) => {
    try {
      let photoLink = '';
      if (photo) {
        const { success, data } = await uploadIMG({ photo, axiosInstance });
        if (!success) throw new Error(data);
        photoLink = data.image;
      }

      const dataToSend = {
        comment,
        madeOrder,
        status,
        store: `${store.id}`,
        photo: photoLink,
      };

      const response = await axiosInstance.post<IStoreDayPlan>(
        `/user/storePlan/`,
        dataToSend
      );

      setStorePlans((prevPlans: IStoreDayPlan[]) => [
        ...prevPlans,
        { label: store.label, id: response.data.id },
      ]);

      reset({
        comment: '',
        madeOrder: false,
        photo: '',
        status: 'new',
        store: { label: '', id: '' },
      });
      handleClose();
    } catch (error: any) {
      toastError(
        error.data?.detail ||
          'Возникла ошибка. Пожалуйста, повторите попытку позже'
      );
    }
  };

  watch('photo');

  const values = getValues();

  return {
    values,
    control,
    onSubmit,
    handleSubmit,
  };
};

export default useNewStoreDayPlan;
