import { ContentHeader, CustomPagination, DataGridTable } from '@/widgets';
import useDriverService from '../../model/useDriverService';
import { columnsDriver } from '@/shared/utils/constants/column';
import SearchFilter from '@/widgets/SearchFilter';

const Drivers = () => {
  const {
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
  } = useDriverService();

  return (
    <div className='w-full h-full'>
      <ContentHeader title='Водители' url='new' />
      <SearchFilter
        control={control}
        register={register}
        onSubmit={onSubmit}
        handleSubmit={handleSubmit}
        placeholder={'Поиск по ФИО'}
        handleResetFields={() => reset()}
        refetch={refetch}
        filters={{
          search: true,
          agent: false,
          store: false,
          category: false,
          start_date: false,
          end_date: false,
          sync: 'synchronize_drivers',
        }}
      />
      <DataGridTable
        error={isError}
        rows={
          data?.results?.map((item, index) => ({
            rowNum: (page - 1) * 20 + index + 1,
            ...item,
          })) || []
        }
        columns={columnsDriver}
        loading={isLoading || isFetching}
        nav={true}
        link={'drivers/'}
      />
      <CustomPagination
        count={data?.count || 0}
        handleChangePage={handleChangePage}
      />
    </div>
  );
};

export default Drivers;
