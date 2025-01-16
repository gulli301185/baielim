import { GridRowSelectionModel } from '@mui/x-data-grid';
import { AxiosInstance } from 'axios';
import { toast } from 'react-toastify';

type Props = {
  link: string;
  axiosReq: AxiosInstance;
  refetch?: () => void;
  getOrders?: ({}) => void;
  rowSelectionModel?: GridRowSelectionModel;
};

export const synchronizeWithOneC = async ({
  link,
  axiosReq,
  refetch,
  getOrders,
  rowSelectionModel,
}: Props) => {
  const syncWithOneC = toast.loading(
    'Синхронизация в процессе. Пожалуйста, подождите.'
  );
  try {
    const requestData =
      link === 'synchronize_orders'
        ? {
            orders: rowSelectionModel,
          }
        : { target: 'synchronize' };

    await axiosReq.post(`/core/${link}/`, requestData);

    if (refetch) refetch();
    if (getOrders) getOrders({});

    toast.update(syncWithOneC, {
      render: 'Синхронизация успешно завершена.',
      type: 'success',
      isLoading: false,
      autoClose: 3000,
    });
  } catch (error) {
    toast.update(syncWithOneC, {
      render: 'Ошибка при синхронизации. Пожалуйста, попробуйте снова.',
      type: 'error',
      isLoading: false,
      autoClose: 3000,
    });
  }
};
