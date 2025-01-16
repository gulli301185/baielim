import { ContentHeader, CustomPagination, DataGridTable } from '@/widgets';
import useStoreService from '../../model/useStoreService';
import { columnsStore } from '@/shared/utils/constants/column';
import SearchFilter from '@/widgets/SearchFilter';

const Stores = () => {
  const {
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
  } = useStoreService();

  return (
    <div className='w-full h-full'>
      <ContentHeader title='Магазины' url='new' />
      <SearchFilter
        control={control}
        register={register}
        onSubmit={onSubmit}
        handleSubmit={handleSubmit}
        placeholder={'Поиск по названию'}
        handleResetFields={() => reset()}
        refetch={refetch}
        filters={{
          search: true,
          agent: true,
          region: true,
          costType: true,
        }}
      />
      <div className='mb-4'>
        <p className='text-base leading-5 font-semibold'>
          Количество магазинов с координатами:{' '}
          {parseFloat(coordinateCount?.toFixed(0)).toLocaleString('ru-RU')}
        </p>
      </div>
      <DataGridTable
        error={isError}
        rows={
          data?.results?.map((item, index) => ({
            rowNum: (page - 1) * 20 + index + 1,
            ...item,
          })) || []
        }
        columns={columnsStore}
        loading={isLoading || isFetching}
        nav={true}
        link={'stores/'}
      />
      <CustomPagination
        count={data?.count || 0}
        handleChangePage={handleChangePage}
      />
    </div>
  );
};

export default Stores;
