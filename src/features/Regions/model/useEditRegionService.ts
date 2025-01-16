import { useEditRegionMutation } from '@/app/slices/regionApi';
import { IRegion, Status } from '@/shared/types';
import { useAxiosRequest } from '@/shared/utils/helpers/axiosRequest';
import { toastError } from '@/shared/utils/helpers/toastify';
import { useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';

const useEditRegionService = () => {
  const navigate = useNavigate();
  const { regionID } = useParams();
  const axiosInstance = useAxiosRequest();

  const [editRegion, { isLoading: loading }] = useEditRegionMutation();
  const [isLoading, setLoading] = useState<Status>('initial');

  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: async () => {
      const { success, data } = await fetchData();
      if (success && data !== undefined) {
        return {
          name: data.name,
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
      const { data } = await axiosInstance.get<IRegion>(
        `/category/region/${regionID}/`
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
  }: FieldValues) => {
    setLoading('loading');

    try {
      const dataToSend = {
        id: values.id || regionID,
        name,
      };

      await editRegion(dataToSend).unwrap();

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

  return {
    errors,
    loading,
    control,
    onSubmit,
    isLoading,
    handleSubmit,
  };
};

export default useEditRegionService;
