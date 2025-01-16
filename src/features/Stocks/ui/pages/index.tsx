import { ContentHeader, DataGridTable } from '@/widgets';
import useStockService from '../../model/useStockService';
import { columnsStock } from '@/shared/utils/constants/column';
import { tableColumnsStockFunction } from '@/shared/utils/helpers/tableColumnsFunction';
import ConfirmModal from '@/widgets/ConfirmModal';

const Stocks = () => {
  const {
    data,
    isError,
    stockID,
    isLoading,
    isFetching,
    isDeleting,
    handleDeleteStock,
    handleDeleteConfirmModal,
  } = useStockService();

  return (
    <div className='w-full h-full'>
      <ContentHeader title='Акции' url='new' />
      <DataGridTable
        error={isError}
        rows={data.map((item, index) => ({ rowNum: index + 1, ...item }))}
        columns={tableColumnsStockFunction({
          columns: columnsStock,
          setValue: handleDeleteConfirmModal,
        })}
        loading={isLoading || isFetching || isDeleting}
        nav={true}
      />
      {!!stockID && (
        <ConfirmModal
          open={!!stockID}
          onClose={() => handleDeleteConfirmModal(0)}
          text={'Вы уверены что хотите удалить акцию'}
          onAccept={() => {
            handleDeleteStock(stockID);
            handleDeleteConfirmModal(0);
          }}
        />
      )}
    </div>
  );
};

export default Stocks;
