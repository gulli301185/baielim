import { useAddStoryMutation } from '@/app/slices/storyApi';
import { IImage } from '@/shared/types';
import { useAxiosRequest } from '@/shared/utils/helpers/axiosRequest';
import { toastError } from '@/shared/utils/helpers/toastify';
import { uploadIMG } from '@/shared/utils/helpers/upload';
import { useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const useNewStoryService = () => {
  const navigate = useNavigate();
  const axiosInstance = useAxiosRequest();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [addStory, { isLoading }] = useAddStoryMutation();
  const [imgForShow, setImgForShow] = useState('');

  const onSubmit: SubmitHandler<FieldValues> = async ({
    date,
    photo,
  }: FieldValues) => {
    try {
      let link: IImage | any = '';
      if (photo) {
        const { success, data } = await uploadIMG({ photo, axiosInstance });

        if (!success) throw new Error(data);

        link = data;
      }

      const dataToSend = {
        date,
        photo: link.image,
      };

      await addStory(dataToSend).unwrap();

      navigate(-1);
    } catch (error: any) {
      toastError(
        error.data?.detail ||
          'Возникла ошибка. Пожалуйста, повторите попытку позже'
      );
    }
  };

  return {
    control,
    handleSubmit,
    onSubmit,
    setImgForShow,
    imgForShow,
    isLoading,
    errors,
  };
};

export default useNewStoryService;
