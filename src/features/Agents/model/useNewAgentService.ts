import { useAddAgentMutation } from '@/app/slices/agentApi';
import { useGetCostTypeQuery } from '@/app/slices/costTypeSlice';
import { ICostType, Status } from '@/shared/types';
import { useAxiosRequest } from '@/shared/utils/helpers/axiosRequest';
import { toastError } from '@/shared/utils/helpers/toastify';
import { uploadFILE, uploadIMG } from '@/shared/utils/helpers/upload';
import { useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const useNewAgentService = () => {
  const navigate = useNavigate();
  const axiosInstance = useAxiosRequest();

  const {
    control,
    handleSubmit,
    getValues,
    watch,
    formState: { errors },
  } = useForm();
  const { data = [], isFetching, isLoading, isSuccess } = useGetCostTypeQuery();
  const [addAgent, { isLoading: isLoadingA }] = useAddAgentMutation();
  const [status, setStatus] = useState<Status>('initial');
  const [imgForShow, setImgForShow] = useState('');

  watch('passport_front');
  watch('passport_back');

  const onSubmit: SubmitHandler<FieldValues> = async ({
    name,
    login,
    password,
    birthdate,
    address,
    phoneNumber,
    costTypes,
    passport_front,
    passport_back,
    photo,
  }: FieldValues) => {
    setStatus('loading');

    try {
      let photoLink = '';
      if (photo) {
        const { success, data } = await uploadIMG({ photo, axiosInstance });
        if (!success) throw new Error(data);
        photoLink = data.image;
      }

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
        birthdate,
        address,
        phoneNumber,
        costTypes: costTypes.map((typeID: ICostType) => typeID.id),
        passport_front: passportFrontLink,
        passport_back: passportBackLink,
        photo: photoLink,
      };

      await addAgent(dataToSend).unwrap();

      setStatus('success');
      navigate(-1);
    } catch (error: any) {
      setStatus('error');
      toastError(
        error.data?.detail ||
          'Возникла ошибка. Пожалуйста, повторите попытку позже'
      );
    }
  };

  const values = getValues();

  return {
    data,
    errors,
    status,
    values,
    control,
    onSubmit,
    isLoading,
    isSuccess,
    isLoadingA,
    imgForShow,
    isFetching,
    handleSubmit,
    setImgForShow,
  };
};

export default useNewAgentService;
