import { useEditStoreMutation } from '@/app/slices/storeApi';
import { IStores, Status } from '@/shared/types';
import { useAxiosRequest } from '@/shared/utils/helpers/axiosRequest';
import { toastError } from '@/shared/utils/helpers/toastify';
import { uploadFILE, uploadIMG } from '@/shared/utils/helpers/upload';
import { useState } from 'react';
import {
  FieldValues,
  SubmitHandler,
  useFieldArray,
  useForm,
} from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';

const useEditStoreService = () => {
  const navigate = useNavigate();
  const { storeID } = useParams();
  const axiosInstance = useAxiosRequest();

  const [editStore, { isLoading: isLoadingA }] = useEditStoreMutation();
  const [loading, setLoading] = useState<Status>('initial');
  const [imgForShow, setImgForShow] = useState('');
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

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
          name: data.name,
          login: data.login,
          store_agent: {
            label: data.store_agent?.name,
            id: data.store_agent?.id,
          },
          region: { label: data.region?.name, id: data.region?.id },
          phoneNumber: data.phoneNumber,
          phoneNumber1: data.phoneNumber1,
          phoneNumber2: data.phoneNumber2,
          phoneNumber3: data.phoneNumber3,
          documents: data.documents,
          address: data.address,
          area: data.area,
          costType: { label: data.costType?.name, id: data.costType?.id },
          lat: data.lat,
          lon: data.lon,
        };
      } else {
        return null;
      }
    },
  });

  const values = getValues();

  const { remove } = useFieldArray({
    control,
    name: 'documents',
  });

  const fetchData = async () => {
    setLoading('loading');
    try {
      const { data } = await axiosInstance.get<IStores>(
        `/user/store/${storeID}/`
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
    login,
    area,
    store_agent,
    region,
    phoneNumber,
    phoneNumber1,
    address,
    costType,
    photo,
    lat,
    lon,
  }: FieldValues) => {
    setLoading('loading');

    try {
      const photoLink = imgForShow ? await uploadPhoto(photo) : photo;
      const fileLinks = selectedFiles ? await uploadFiles(selectedFiles) : [];

      const dataToSend = {
        id: values.id || storeID,
        name,
        login,
        store_agent: store_agent?.id,
        region: region?.id,
        phoneNumber,
        phoneNumber1,
        address,
        costType: costType?.id,
        photo: photoLink,
        area,
        lat,
        lon,
        documents: [...(values.documents ?? []), ...fileLinks],
      };

      await editStore(dataToSend).unwrap();

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

  const handleRemoveImage = () => {
    setImgForShow('');
    resetField('photo');
    setValue('photo', '');
  };

  const handleRemoveFile = (index: number) => {
    setSelectedFiles((prevFiles) =>
      prevFiles.filter((_, idx) => idx !== index)
    );
  };

  return {
    errors,
    values,
    remove,
    control,
    loading,
    onSubmit,
    isLoadingA,
    imgForShow,
    handleSubmit,
    selectedFiles,
    setImgForShow,
    handleRemoveFile,
    setSelectedFiles,
    handleRemoveImage,
  };
};

export default useEditStoreService;
