import { CustomPagination, DataGridTable } from '@/widgets';
import useOrderService from '../../model/useOrderService';
import { columnsDebtOrder } from '@/shared/utils/constants/column';
import SearchFilter from '@/widgets/SearchFilter';
import OrderInfo from '../components/orderInfo';

const Debt = () => {
  const {
    page,
    count,
    status,
    control,
    onSubmit,
    orders,
    countOrders,
    handleClose,
    handleSubmit,
    handleChangePage,
    handleResetFields,
  } = useOrderService('debt');

  return (
    <div className='w-full h-full'>
      <h1 className='text-xl font-bold pb-4'>Долги:</h1>
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
          rows={orders.map((order, index) => ({
            rowNum: (page - 1) * 20 + index + 1,
            ...order,
          }))}
          columns={columnsDebtOrder}
          nav={true}
          link={'debts/'}
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

export default Debt;
