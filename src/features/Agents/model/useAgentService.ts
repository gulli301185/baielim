import { useGetAgentsQuery } from '@/app/slices/agentApi';
import { useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useSearchParams } from 'react-router-dom';

const useAgentService = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get('page')) || 1;
  const [value, setValue] = useState('');

  const { data, isError, isFetching, isLoading, refetch } = useGetAgentsQuery({
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
    data,
    page,
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

export default useAgentService;
