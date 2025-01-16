import { useGetItemsQuery } from '@/app/slices/itemApi';
import { IParams } from '@/shared/types';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useSearchParams } from 'react-router-dom';

const useItemService = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get('page')) || 1;
  const catName = searchParams.get('catName') || '';
  const catID = searchParams.get('catID') || '';

  const { handleSubmit, reset, control, register, getValues } = useForm({
    defaultValues: {
      search: '',
      author: '',
      category: { label: catName, id: catID },
    },
  });

  const values = getValues();

  const { data, isError, isFetching, isLoading } = useGetItemsQuery({
    page,
    search: values.search,
    author: values.author,
    category: values.category?.id,
  } as IParams);

  const onSubmit: SubmitHandler<FieldValues> = async () => {
    handleChangePage(1);
  };

  const handleChangePage = (page: number) => {
    setSearchParams({ page: `${page}` });
  };

  const handleResetFields = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    reset({
      search: '',
      author: '',
      category: { label: '', id: '' },
    });
  };

  return {
    page,
    data,
    isError,
    control,
    register,
    onSubmit,
    isLoading,
    isFetching,
    handleSubmit,
    handleChangePage,
    handleResetFields,
  };
};

export default useItemService;
