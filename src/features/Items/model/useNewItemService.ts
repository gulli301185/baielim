import { useGetCostTypeQuery } from '@/app/slices/costTypeSlice';
import { useAddItemMutation } from '@/app/slices/itemApi';
import { Status } from '@/shared/types';
import { useAxiosRequest } from '@/shared/utils/helpers/axiosRequest';
import { toastError } from '@/shared/utils/helpers/toastify';
import { uploadIMG } from '@/shared/utils/helpers/upload';
import { useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const useNewItemService = () => {
  const navigate = useNavigate();
  const axiosInstance = useAxiosRequest();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const costTypeQuery = useGetCostTypeQuery();
  const [addItem, { isLoading }] = useAddItemMutation();
  const [imgForShow, setImgForShow] = useState('');
  const [status, setStatus] = useState<Status>('initial');

  const onSubmit: SubmitHandler<FieldValues> = async (
    formData: FieldValues
  ) => {
    setStatus('loading');
    const {
      name,
      costIn,
      category,
      quantity,
      weight,
      code,
      photo,
      author,
      ...costInx
    } = formData;

    try {
      const costs = costTypeQuery?.isSuccess
        ? costTypeQuery.data.map((costType) => {
            const bonusAmountKey = `bonus-${costType.id}`;
            const costKey = `cost-${costType.id}`;
            return {
              costType: costType.id,
              cost: costInx[costKey] ?? 0,
              bonusAmount: costInx[bonusAmountKey] ?? 0,
            };
          })
        : [];

      const costResponses = await Promise.all(
        costs.map((cost) => axiosInstance.post('/core/cost/', cost))
      );

      const savedCosts = costResponses.map((res) => res.data);

      const photoLink = photo ? await uploadPhoto(photo) : '';

      const dataToSend = {
        name,
        costIn,
        code,
        quantity,
        weight,
        author,
        costs: savedCosts.map((cost: any) => cost.id),
        category: category.id,
        photo: photoLink,
      };

      await addItem(dataToSend).unwrap();

      setStatus('success');
      navigate(-1);
    } catch (error: any) {
      setStatus('error');
      toastError(
        error.data?.detail ||
          'Возникла ошибка. Пожалуйста, повторите попытку позже'
      );
    }
  };

  const uploadPhoto = async (photo: File) => {
    const { success, data } = await uploadIMG({ photo, axiosInstance });
    if (!success) throw new Error(data);
    return data.image;
  };

  return {
    errors,
    status,
    control,
    onSubmit,
    isLoading,
    imgForShow,
    handleSubmit,
    setImgForShow,
    costTypeQuery,
  };
};

export default useNewItemService;
