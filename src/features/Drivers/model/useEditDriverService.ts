import { useEditDriverMutation } from '@/app/slices/driverApi';
import { IDrivers, Status } from '@/shared/types';
import { useAxiosRequest } from '@/shared/utils/helpers/axiosRequest';
import { toastError } from '@/shared/utils/helpers/toastify';
import { uploadIMG } from '@/shared/utils/helpers/upload';
import { useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';

const useEditDriverService = () => {
  const navigate = useNavigate();
  const { driverID } = useParams();
  const axiosInstance = useAxiosRequest();

  const [editDriver, { isLoading }] = useEditDriverMutation();
  const [loading, setLoading] = useState<Status>('initial');
  const [imgForShow, setImgForShow] = useState('');

  const {
    control,
    handleSubmit,
    getValues,
    watch,
    resetField,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: async () => {
      const { success, data } = await fetchData();
      if (success && data !== undefined) {
        return {
          name: data?.name,
          login: data?.login,
          phoneNumber: data?.phoneNumber,
          photo: data?.photo,
          is_active: data.is_active,
          passport_back: data?.passport_back,
          passport_front: data?.passport_front,
        };
      } else {
        return null;
      }
    },
  });

  const fetchData = async () => {
    setLoading('loading');

    try {
      const { data } = await axiosInstance.get<IDrivers>(
        `/user/driver/${driverID}/`
      );
      setLoading('success');
      return { success: true, data };
    } catch (error) {
      setLoading('error');
      return { success: false, data: undefined };
    }
  };

  watch('passport_front');
  watch('passport_back');

  const onSubmit: SubmitHandler<FieldValues> = async ({
    name,
    login,
    phoneNumber,
    photo,
  }: FieldValues) => {
    setLoading('loading');

    try {
      const photoLink = imgForShow ? await uploadPhoto(photo) : photo;

      const dataToSend = {
        id: values.id || driverID,
        name,
        login,
        phoneNumber,
        photo: photoLink,
      };

      await editDriver(dataToSend).unwrap();

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

  const uploadPhoto = async (photo: File) => {
    const { success, data } = await uploadIMG({ photo, axiosInstance });
    if (!success) throw new Error(data);
    return data.image;
  };

  const handleRemoveImage = () => {
    setImgForShow('');
    resetField('photo');
    setValue('photo', '');
  };

  const values = getValues();

  return {
    errors,
    values,
    control,
    loading,
    onSubmit,
    isLoading,
    imgForShow,
    handleSubmit,
    setImgForShow,
    handleRemoveImage,
  };
};

export default useEditDriverService;
