import { CustomPagination, DataGridTable } from '@/widgets';
import useOrderService from '../../model/useOrderService';
import { columnsCancelledOrder } from '@/shared/utils/constants/column';
import SearchFilter from '@/widgets/SearchFilter';

const CancelledOrders = () => {
  const {
    page,
    count,
    orders,
    status,
    control,
    onSubmit,
    handleClose,
    handleSubmit,
    handleChangePage,
    handleResetFields,
  } = useOrderService('cancelled');

  return (
    <div className='w-full h-full'>
      <h1 className='text-xl font-bold pb-4'>Отмененные заказы:</h1>
      <div className='w-full h-full'>
        <SearchFilter
          control={control}
          onSubmit={onSubmit}
          handleClose={handleClose}
          handleSubmit={handleSubmit}
          handleResetFields={handleResetFields}
          filters={{
            agent: true,
            store: true,
            driver: true,
            costType: true,
            start_date: true,
            end_date: true,
          }}
        />
        <DataGridTable
          error={status === 'error'}
          getRowHeight={() => 'auto'}
          nav={true}
          rows={orders.map((order, index) => ({
            rowNum: (page - 1) * 20 + index + 1,
            ...order,
          }))}
          link={'cancelled-orders/'}
          columns={columnsCancelledOrder}
          loading={status === 'loading'}
        />
        <CustomPagination count={count} handleChangePage={handleChangePage} />
      </div>
    </div>
  );
};

export default CancelledOrders;
