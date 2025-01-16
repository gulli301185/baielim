import { DataGridTable } from '@/widgets';
import useReturnOrderService from '../../model/useReturnOrderService';
import { columnsOrderReturn } from '@/shared/utils/constants/column';

const ReturnOrder = () => {
  const { page, status, returnOrder } = useReturnOrderService();

  return (
    <div className='w-full h-full'>
      <h1 className='text-xl font-bold pb-4'>Возвраты:</h1>
      <div className='w-full h-full'>
        <DataGridTable
          error={status === 'error'}
          getRowHeight={() => 'auto'}
          rows={
            returnOrder.length > 0
              ? [
                  {
                    rowNum: (page - 1) * 20 + 1,
                    ...returnOrder[0],
                  },
                ]
              : []
          }
          columns={columnsOrderReturn}
          loading={status === 'loading'}
          nav={false}
        />
        {/* <CustomPagination count={count} handleChangePage={handleChangePage} /> */}
      </div>
    </div>
  );
};

export default ReturnOrder;
