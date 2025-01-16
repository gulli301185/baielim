import { CustomPagination, DataGridTable } from '@/widgets';
import useTransactionOrderService from '../../model/useTransactionOrderService';
import SearchFilter from '@/widgets/SearchFilter';
import { columnsTransactionOrder } from '@/shared/utils/constants/column';

const TransactionOrder = () => {
  const {
    page,
    count,
    status,
    control,
    onSubmit,
    handleSubmit,
    transactionOrder,
    handleChangePage,
    handleResetFields,
  } = useTransactionOrderService();

  return (
    <div className='w-full h-full'>
      <h1 className='text-xl font-bold pb-4'>Транзакции заказа:</h1>
      <div className='w-full h-full'>
        <SearchFilter
          control={control}
          onSubmit={onSubmit}
          handleSubmit={handleSubmit}
          handleResetFields={handleResetFields}
          filters={{
            store: true,
          }}
        />
        <DataGridTable
          error={status === 'error'}
          nav={false}
          rows={transactionOrder.map((item, index) => ({
            rowNum: (page - 1) * 20 + index + 1,
            ...item,
          }))}
          columns={columnsTransactionOrder}
          loading={status === 'loading'}
        />
        <CustomPagination count={count} handleChangePage={handleChangePage} />
      </div>
    </div>
  );
};

export default TransactionOrder;
