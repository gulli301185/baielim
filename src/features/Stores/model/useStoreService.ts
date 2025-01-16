import { useGetStoresQuery } from '@/app/slices/storeApi';
import { IParams } from '@/shared/types';
import { useAxiosRequest } from '@/shared/utils/helpers/axiosRequest';
import { useEffect, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useSearchParams } from 'react-router-dom';

const useStoreService = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get('page')) || 1;
  const axiosReq = useAxiosRequest();

  const [coordinateCount, setCoordinateCount] = useState<number>(0);

  const { handleSubmit, register, reset, control, getValues } = useForm({
    defaultValues: {
      search: '',
      agent: { label: '', id: '' },
      region: { label: '', id: '' },
      costType: { label: '', id: '' },
    },
  });

  const values = getValues();

  const { data, isError, isFetching, isLoading, refetch } = useGetStoresQuery({
    page,
    search: values.search,
    store_agent: values?.agent?.id || '',
    region: values?.region?.id || '',
    costType: values?.costType?.id || '',
  } as IParams);

  const onSubmit: SubmitHandler<FieldValues> = async () => {
    handleChangePage(1);
  };

  const handleChangePage = (page: number) => {
    setSearchParams({ page: `${page}` });
  };

  const getStoresCoordinate = async () => {
    try {
      const response = await axiosReq.get('user/get_stores/');
      setCoordinateCount(response.data?.count || 0);
    } catch (error) {
      setCoordinateCount(0);
    }
  };

  useEffect(() => {
    getStoresCoordinate();
  }, []);

  return {
    page,
    data,
    reset,
    control,
    isError,
    onSubmit,
    refetch,
    register,
    isLoading,
    isFetching,
    handleSubmit,
    coordinateCount,
    handleChangePage,
  };
};

export default useStoreService;
