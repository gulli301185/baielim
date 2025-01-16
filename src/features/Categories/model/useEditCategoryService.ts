import { useEditCategoryMutation } from '@/app/slices/categoryApi';
import { ICategory, Status } from '@/shared/types';
import { useAxiosRequest } from '@/shared/utils/helpers/axiosRequest';
import { toastError } from '@/shared/utils/helpers/toastify';
import { uploadIMG } from '@/shared/utils/helpers/upload';
import { useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';

const useEditCategoryService = () => {
  const navigate = useNavigate();
  const { catID } = useParams();
  const axiosInstance = useAxiosRequest();

  const [editCategory, { isLoading: loading }] = useEditCategoryMutation();
  const [isLoading, setLoading] = useState<Status>('initial');
  const [imgForShow, setImgForShow] = useState('');

  const {
    control,
    handleSubmit,
    getValues,
    resetField,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: async () => {
      const { success, data } = await fetchData();
      if (success && data !== undefined) {
        return {
          icon: data.icon,
          name: data.name,
          nameKg: data.nameKg,
          nameEn: data.nameEn,
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
      const { data } = await axiosInstance.get<ICategory>(
        `/category/category/${catID}/`
      );
      setLoading('success');
      return { success: true, data };
    } catch (error) {
      setLoading('error');
      return { success: false, data: undefined };
    }
  };

  const onSubmit: SubmitHandler<FieldValues> = async ({
    name,
    nameKg,
    nameEn,
    icon,
  }) => {
    setLoading('loading');

    try {
      let link: any = '';

      if (imgForShow) {
        const { success, data } = await uploadIMG({
          photo: icon,
          axiosInstance,
        });

        if (!success) throw new Error(data);

        link = data;
      }

      const dataToSend = {
        id: values.id || catID,
        name,
        nameKg,
        nameEn,
        icon: link.image || icon,
      };

      await editCategory(dataToSend).unwrap();

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

  const handleRemoveImage = () => {
    setImgForShow('');
    resetField('icon');
    setValue('icon', '');
  };

  return {
    errors,
    values,
    loading,
    control,
    onSubmit,
    isLoading,
    imgForShow,
    handleSubmit,
    setImgForShow,
    handleRemoveImage,
  };
};

export default useEditCategoryService;
