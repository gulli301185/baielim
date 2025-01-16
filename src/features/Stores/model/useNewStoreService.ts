import { useAddStoreMutation } from '@/app/slices/storeApi';
import { Status } from '@/shared/types';
import { useAxiosRequest } from '@/shared/utils/helpers/axiosRequest';
import { toastError } from '@/shared/utils/helpers/toastify';
import { uploadFILE, uploadIMG } from '@/shared/utils/helpers/upload';
import { useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const useNewStoreService = () => {
  const navigate = useNavigate();
  const axiosInstance = useAxiosRequest();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [addStore, { isLoading: isLoadingA }] = useAddStoreMutation();
  const [imgForShow, setImgForShow] = useState('');
  const [loading, setLoading] = useState<Status>('initial');
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const onSubmit: SubmitHandler<FieldValues> = async ({
    name,
    login,
    password,
    store_agent,
    region,
    phoneNumber,
    phoneNumber1,
    address,
    area,
    costType,
    photo,
    lat,
    lon,
  }: FieldValues) => {
    setLoading('loading');

    try {
      const photoLink = photo ? await uploadPhoto(photo) : '';
      const fileLinks = selectedFiles ? await uploadFiles(selectedFiles) : [];

      const dataToSend = {
        name,
        login,
        password,
        store_agent: store_agent?.id,
        region: region?.id,
        phoneNumber,
        phoneNumber1,
        address,
        area,
        costType: costType?.id,
        photo: photoLink,
        lat,
        lon,
        documents: fileLinks,
      };

      await addStore(dataToSend).unwrap();

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

  const uploadFiles = async (files: File[]) => {
    return await Promise.all(
      files.map(async (file) => {
        const response = await uploadFILE({ photo: file, axiosInstance });
        return response.data.file;
      })
    );
  };

  return {
    errors,
    loading,
    control,
    onSubmit,
    isLoadingA,
    imgForShow,
    handleSubmit,
    setImgForShow,
    selectedFiles,
    setSelectedFiles,
  };
};

export default useNewStoreService;
