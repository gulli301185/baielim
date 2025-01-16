import {
  useDeleteStockMutation,
  useGetStocksQuery,
} from '@/app/slices/stockApi';
import { toastError, toastSuccess } from '@/shared/utils/helpers/toastify';
import { useState } from 'react';

const useStockService = () => {
  const { data = [], isLoading, isError, isFetching } = useGetStocksQuery();
  const [deleteStock, { isLoading: isDeleting }] = useDeleteStockMutation();
  const [stockID, setStockID] = useState(0);

  const handleDeleteStock = async (stockID: number) => {
    try {
      await deleteStock(stockID).unwrap();
      toastSuccess('Успешно удалено');
    } catch (error: any) {
      toastError(
        error.data?.detail ||
          'Возникла ошибка. Пожалуйста, повторите попытку позже'
      );
    }
  };

  const handleDeleteConfirmModal = (value: number) => {
    setStockID(value);
  };

  return {
    data,
    isError,
    stockID,
    isLoading,
    isFetching,
    isDeleting,
    handleDeleteStock,
    handleDeleteConfirmModal,
  };
};

export default useStockService;
