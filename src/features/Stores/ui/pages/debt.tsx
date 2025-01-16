import { CustomPagination, DataGridTable } from '@/widgets';
import useStoreOrderService from '../../model/useStoreOrderService';
import SearchFilter from '@/widgets/SearchFilter';
import { columnsDebtOrder } from '@/shared/utils/constants/column';
import OrderInfo from '@/features/Orders/ui/components/orderInfo';

const StoreDebt = () => {
  const {
    page,
    count,
    orders,
    status,
    control,
    onSubmit,
    countOrders,
    handleSubmit,
    handleChangePage,
    handleResetFields,
  } = useStoreOrderService('debt');

  return (
    <div className='w-full h-full'>
      <h1 className='text-xl font-bold pb-4'>Долги магазина:</h1>
      <div className='w-full h-full'>
        <SearchFilter
          control={control}
          onSubmit={onSubmit}
          handleSubmit={handleSubmit}
          handleResetFields={handleResetFields}
          filters={{
            agent: true,
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
          columns={columnsDebtOrder}
          link={'/archive-orders/'}
          loading={status === 'loading'}
        />
        <CustomPagination count={count} handleChangePage={handleChangePage} />
        <OrderInfo
          count={count}
          itemsCount={countOrders?.itemsCount || 0}
          totalCost={countOrders?.totalCost || 0}
        />
      </div>
    </div>
  );
};

export default StoreDebt;
