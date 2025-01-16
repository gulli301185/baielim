import { DataGridTable } from '@/widgets';
import useDeletionRequestService from '../model/useDeletionRequestService';
import { columnsDeletionRequest } from '@/shared/utils/constants/column';
import { tableColumnsStockFunction } from '@/shared/utils/helpers/tableColumnsFunction';
import ConfirmModal from '@/widgets/ConfirmModal';

const DeletionRequest = () => {
  const {
    reqID,
    status,
    requests,
    handleDeleteRequest,
    handleDeleteConfirmModal,
  } = useDeletionRequestService();

  return (
    <div className='w-full h-full'>
      <h1 className='text-xl font-bold pb-4'>
        Запросы на удаление персональных данных:
      </h1>
      <DataGridTable
        error={status === 'error'}
        getRowHeight={() => 'auto'}
        rows={
          requests?.map((request, index) => ({
            rowNum: index + 1,
            ...request,
          })) || []
        }
        columns={tableColumnsStockFunction({
          columns: columnsDeletionRequest,
          setValue: handleDeleteConfirmModal,
        })}
        loading={status === 'loading'}
        nav={false}
      />
      {!!reqID && (
        <ConfirmModal
          open={!!reqID}
          onClose={() => handleDeleteConfirmModal('')}
          text={'Вы уверены что хотите удалить запрос'}
          onAccept={() => {
            handleDeleteRequest();
            handleDeleteConfirmModal('');
          }}
        />
      )}
    </div>
  );
};

export default DeletionRequest;
