import { ContentHeader, CustomPagination, DataGridTable } from '@/widgets';
import useItemService from '../../model/useItemService';
import { columnsItem } from '@/shared/utils/constants/column';
import SearchFilter from '@/widgets/SearchFilter';

const Items = () => {
  const {
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
  } = useItemService();

  return (
    <div className='w-full h-full'>
      <ContentHeader title='Товары' url='new' />
      <div className='w-full h-full'>
        <SearchFilter
          control={control}
          register={register}
          onSubmit={onSubmit}
          handleSubmit={handleSubmit}
          placeholder={'Поиск по названию'}
          handleResetFields={(e) => handleResetFields(e)}
          filters={{
            search: true,
            category: true,
            author: true,
            sync: 'synchronize_items',
          }}
        />
        <DataGridTable
          error={isError}
          rows={
            data?.results?.map((item, index) => ({
              rowNum: (page - 1) * 50 + index + 1,
              ...item,
            })) || []
          }
          pageSize={50}
          columns={columnsItem}
          loading={isLoading || isFetching}
          nav={true}
          link={'/items/'}
        />
        <CustomPagination
          itemsCount={50}
          count={data?.count || 0}
          handleChangePage={handleChangePage}
        />
      </div>
    </div>
  );
};

export default Items;
