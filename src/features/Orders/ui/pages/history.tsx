import { CustomPagination, DataGridTable } from '@/widgets';
import useOrderHistoryOrderService from '../../model/useOrderHistoryOrderService';
import { columnsOrderHistory } from '@/shared/utils/constants/column';

const OrderHistory = () => {
  const { page, count, status, history, handleChangePage } =
    useOrderHistoryOrderService();

  return (
    <div className='w-full h-full'>
      <h1 className='text-xl font-bold pb-4'>История изменений:</h1>
      <div className='w-full h-full'>
        <DataGridTable
          error={status === 'error'}
          getRowHeight={() => 'auto'}
          rows={history.map((item, index) => ({
            rowNum: (page - 1) * 20 + index + 1,
            ...item,
          }))}
          columns={columnsOrderHistory}
          loading={status === 'loading'}
          nav={false}
        />
        <CustomPagination count={count} handleChangePage={handleChangePage} />
      </div>
    </div>
  );
};

export default OrderHistory;
