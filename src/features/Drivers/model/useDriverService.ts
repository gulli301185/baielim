import { useGetDriversQuery } from '@/app/slices/driverApi';
import { useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useSearchParams } from 'react-router-dom';

const useDriverService = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get('page')) || 1;
  const [value, setValue] = useState('');
  const { data, isLoading, isError, isFetching, refetch } = useGetDriversQuery({
    page,
    search: value,
  });

  const { handleSubmit, register, reset, control } = useForm();

  const onSubmit: SubmitHandler<FieldValues> = async ({
    search,
  }: FieldValues) => {
    handleChangePage(1);
    setValue(search);
  };

  const handleChangePage = (page: number) => {
    setSearchParams({ page: `${page}` });
  };

  return {
    page,
    data,
    reset,
    isError,
    control,
    refetch,
    register,
    onSubmit,
    isLoading,
    isFetching,
    handleSubmit,
    handleChangePage,
  };
};

export default useDriverService;
