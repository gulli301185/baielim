import {
  useAddStoreMutation,
  useEditStoreMutation,
} from '@/app/slices/storeApi';
import { useAxiosRequest } from '@/shared/utils/helpers/axiosRequest';
import { uploadIMG } from '@/shared/utils/helpers/upload';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import useDetailStoreService from './useDetailStoreService';

const useNewStoreSecondService = () => {
  const axiosInstance = useAxiosRequest();

  const { getValues, watch } = useForm();
  const { data } = useDetailStoreService();
  const [addStore, { isLoading: isLoadingA }] = useAddStoreMutation();
  const [editStore, { isLoading: isLoadingB }] = useEditStoreMutation();

  const { storeID } = useParams();

  watch('passport_front');
  watch('passport_back');

  const createNew = async (data: any): Promise<void> => {
    await addStore({
      ...data,
      photo: data.photo
        ? (
            await uploadIMG({ photo: data.photo, axiosInstance })
          )?.data?.image
        : '',
    });
  };

  const edit = async (newData: any): Promise<void> => {
    await editStore({
      ...newData,
      photo: newData?.photo
        ? (
            await uploadIMG({ photo: newData.photo, axiosInstance })
          )?.data?.image
        : data?.photo,
      id: values.id || storeID,
    });
  };

  const values = getValues();

  return {
    createNew,
    edit,
    isLoadingA,
    isLoadingB,
    data,
  };
};

export default useNewStoreSecondService;
