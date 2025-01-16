import { useEditStoryMutation } from '@/app/slices/storyApi';
import { IImage, IStories, Status } from '@/shared/types';
import { useAxiosRequest } from '@/shared/utils/helpers/axiosRequest';
import { toastError } from '@/shared/utils/helpers/toastify';
import { uploadIMG } from '@/shared/utils/helpers/upload';
import { useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';

const useEditStoryService = () => {
  const navigate = useNavigate();
  const { storyID } = useParams();
  const axiosInstance = useAxiosRequest();

  const [editStory, { isLoading: loading }] = useEditStoryMutation();
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
          photo: data.photo,
          date: data.date,
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
      const { data } = await axiosInstance.get<IStories>(
        `/category/stories/${storyID}/`
      );
      setLoading('success');
      return { success: true, data };
    } catch (error) {
      setLoading('error');
      return { success: false, data: undefined };
    }
  };

  const onSubmit: SubmitHandler<FieldValues> = async ({ date, photo }) => {
    try {
      let link: IImage | any = '';

      if (imgForShow) {
        const { success, data } = await uploadIMG({ photo, axiosInstance });

        if (!success) throw new Error(data);

        link = data;
      }

      const dataToSend = {
        id: values.id || storyID,
        date,
        photo: link.image || photo,
      };

      await editStory(dataToSend).unwrap();

      navigate('/stories');
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
    errors,
  };
};

export default useEditStoryService;
