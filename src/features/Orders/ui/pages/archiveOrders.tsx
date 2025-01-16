import { columnsArchiveOrder } from '@/shared/utils/constants/column';
import { CustomPagination, DataGridTable } from '@/widgets';
import SearchFilter from '@/widgets/SearchFilter';
import useOrderService from '../../model/useOrderService';
import OrderInfo from '../components/orderInfo';

const ArchiveOrders = () => {
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
    rowSelectionModel,
    handleResetFields,
    getOrdersAfterOneC,
    setRowSelectionModel,
  } = useOrderService('archive');

  return (
    <div className='w-full h-full'>
      <h1 className='text-xl font-bold pb-4'>Архивные заказы:</h1>
      <div className='w-full h-full'>
        <SearchFilter
          control={control}
          onSubmit={onSubmit}
          handleSubmit={handleSubmit}
          handleResetFields={handleResetFields}
          rowSelectionModel={rowSelectionModel}
          getOrders={getOrdersAfterOneC}
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
          columns={columnsArchiveOrder}
          nav={true}
          link={'archive-orders/'}
          loading={status === 'loading'}
          checkboxSelection={true}
          rowSelectionModel={rowSelectionModel}
          setRowSelectionModel={setRowSelectionModel}
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

export default ArchiveOrders;
