import { useEditStockMutation } from '@/app/slices/stockApi';
import { IImage, IStocks, Status } from '@/shared/types';
import { useAxiosRequest } from '@/shared/utils/helpers/axiosRequest';
import { toastError } from '@/shared/utils/helpers/toastify';
import { uploadIMG } from '@/shared/utils/helpers/upload';
import { useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';

const useEditStockService = () => {
  const navigate = useNavigate();
  const { stockID } = useParams();
  const axiosInstance = useAxiosRequest();

  const [editStock, { isLoading: loading }] = useEditStockMutation();
  const [isLoading, setLoading] = useState<Status>('initial');
  const [imgForShow, setImgForShow] = useState('');

  const { control, handleSubmit, getValues, resetField, setValue } = useForm({
    defaultValues: async () => {
      const { success, data } = await fetchData();
      if (success && data !== undefined) {
        return {
          photo: data.photo,
          deadline: data.deadline,
          description: data.description,
          title: data.title,
        };
      } else {
        return null;
      }
    },
  });

  const values = getValues();

  const fetchData = async () => {
    setLoading('loading');
    try {
      const { data } = await axiosInstance.get<IStocks>(
        `/category/aksiya/${stockID}/`
      );
      setLoading('success');
      return { success: true, data };
    } catch (error) {
      setLoading('error');
      return { success: false, data: undefined };
    }
  };

  const onSubmit: SubmitHandler<FieldValues> = async ({
    title,
    deadline,
    description,
    photo,
  }) => {
    try {
      let link: IImage | any = '';

      if (imgForShow) {
        const { success, data } = await uploadIMG({ photo, axiosInstance });

        if (!success) throw new Error(data);

        link = data;
      }

      const dataToSend = {
        id: values.id || stockID,
        title,
        deadline,
        description,
        photo: link.image || photo,
      };

      await editStock(dataToSend).unwrap();

      navigate(-1);
    } catch (error: any) {
      toastError(
        error.data?.detail ||
          'Возникла ошибка. Пожалуйста, повторите попытку позже'
      );
    }
  };

  const handleRemoveImage = () => {
    setImgForShow('');
    resetField('photo');
    setValue('photo', '');
  };

  return {
    control,
    handleSubmit,
    onSubmit,
    isLoading,
    values,
    setImgForShow,
    imgForShow,
    loading,
    handleRemoveImage,
  };
};

export default useEditStockService;
