import { useAddDriverMutation } from '@/app/slices/driverApi';
import { Status } from '@/shared/types';
import { useAxiosRequest } from '@/shared/utils/helpers/axiosRequest';
import { toastError } from '@/shared/utils/helpers/toastify';
import { uploadFILE, uploadIMG } from '@/shared/utils/helpers/upload';
import { useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const useNewDriverService = () => {
  const navigate = useNavigate();
  const axiosInstance = useAxiosRequest();

  const {
    control,
    handleSubmit,
    getValues,
    watch,
    formState: { errors },
  } = useForm();
  const [addAgent, { isLoading }] = useAddDriverMutation();
  const [loading, setLoading] = useState<Status>('initial');
  const [imgForShow, setImgForShow] = useState('');

  watch('passport_front');
  watch('passport_back');

  const onSubmit: SubmitHandler<FieldValues> = async ({
    name,
    login,
    password,
    phoneNumber,
    passport_front,
    passport_back,
    photo,
  }: FieldValues) => {
    setLoading('loading');

    try {
      const photoLink = photo ? await uploadPhoto(photo) : '';

      const passportResponses = await Promise.all([
        uploadFILE({ photo: passport_front, axiosInstance }),
        uploadFILE({ photo: passport_back, axiosInstance }),
      ]);

      if (!passportResponses.every((response) => response.success)) {
        throw new Error('Возникла ошибка. Пожалуйста, повторите попытку позже');
      }

      const passportFrontLink = passportResponses[0].data.file;
      const passportBackLink = passportResponses[1].data.file;

      const dataToSend = {
        name,
        login,
        password,
        phoneNumber,
        passport_front: passportFrontLink,
        passport_back: passportBackLink,
        photo: photoLink,
      };

      await addAgent(dataToSend).unwrap();

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
  };
};

export default useNewDriverService;
