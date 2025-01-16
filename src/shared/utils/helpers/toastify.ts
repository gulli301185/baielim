import { toast, ToastOptions } from 'react-toastify';

const toastConfig: ToastOptions = {
  autoClose: 5000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: false,
  draggable: false,
  isLoading: false,
  progress: undefined,
};

export const toastSuccess = (message: string) => {
  toast.success(message, toastConfig);
};
export const toastError = (message: string) => {
  toast.error(message, toastConfig);
};
export const toastInfo = (message: string) => {
  toast.info(message, toastConfig);
};
