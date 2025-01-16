import { DataGridTable } from '@/widgets';
import useStoreSalesService from '../model/useStoreSalesService';
import SearchFilter from '@/widgets/SearchFilter';
import { columnsStoreSales } from '@/shared/utils/constants/column';

const StoreSales = () => {
  const {
    stats,
    status,
    control,
    onSubmit,
    register,
    handleSubmit,
    handleResetFields,
  } = useStoreSalesService();

  return (
    <div className='w-full h-full'>
      <h1 className='text-xl font-bold pb-4'>Продажи по магазинам:</h1>
      <SearchFilter
        control={control}
        onSubmit={onSubmit}
        register={register}
        handleSubmit={handleSubmit}
        handleResetFields={handleResetFields}
        filters={{
          start_date: true,
          end_date: true,
          endSum: true,
          startSum: true,
        }}
      />
      <div className='pb-20'>
        <DataGridTable
          error={status === 'error'}
          rows={
            stats?.map((item, index) => ({
              rowNum: index + 1,
              ...item,
            })) || []
          }
          columns={columnsStoreSales}
          loading={status === 'loading'}
          nav={true}
          pageSizeOptions={[20, 50, 100]}
          hideFooter={false}
          link={'stores/'}
        />
      </div>
    </div>
  );
};

export default StoreSales;
