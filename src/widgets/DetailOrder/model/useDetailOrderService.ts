import { IOrders, Status } from '@/shared/types';
import { useAxiosRequest } from '@/shared/utils/helpers/axiosRequest';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import html2canvas from 'html2canvas';
import { toastError } from '@/shared/utils/helpers/toastify';

const useDetailOrderService = () => {
  const { orderID } = useParams();
  const axiosInstance = useAxiosRequest();
  const captureRef = useRef<HTMLDivElement>(null);

  const [status, setStatus] = useState<Status>('initial');
  const [open, setOpen] = useState<number | null>(null);
  const [order, setOrder] = useState<IOrders | undefined>(undefined);

  const handlePrintClick = async () => {
    try {
      if (captureRef.current) {
        const canvas = await html2canvas(captureRef.current, {
          allowTaint: false,
          useCORS: true,
        });
        const dataURL = canvas.toDataURL('image/png');

        const printWindow = window.open('', '_blank');
        if (printWindow) {
          printWindow.document.write(`<img src="${dataURL}" />`);
          printWindow.document.close();
          printWindow.print();
        }
      }
    } catch (error: any) {
      toastError(
        error.message ||
          'Возникла ошибка при создании или печати скриншота. Пожалуйста, повторите попытку позже.'
      );
    }
  };

  const fetchData = async () => {
    setStatus('loading');
    try {
      const { data } = await axiosInstance.get<IOrders>(
        `/core/order/${orderID}/`
      );
      setStatus('success');
      setOrder(data);
    } catch (error) {
      setStatus('error');
      setOrder(undefined);
    }
  };

  useEffect(() => {
    fetchData();
  }, [orderID]);

  const handleClose = (value: number | null) => {
    setOpen(value);
  };

  return {
    open,
    order,
    status,
    fetchData,
    captureRef,
    handleClose,
    handlePrintClick,
  };
};

export default useDetailOrderService;
