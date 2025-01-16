import { IImage } from '@/shared/types';
import { AxiosInstance } from 'axios';
import { toastError } from './toastify';

interface UploadResponse {
  success: boolean;
  data: IImage | any;
}

interface FormDataWithAxiosInstance {
  photo: File;
  axiosInstance: AxiosInstance;
}

const uploadIMG = async ({
  photo,
  axiosInstance,
}: FormDataWithAxiosInstance): Promise<UploadResponse> => {
  try {
    const currentDate = new Date().getTime();
    const formData = new FormData();
    formData.append('image', photo);
    formData.append('title', `${currentDate}`);

    const response = await axiosInstance.post('category/image/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return { success: true, data: response.data };
  } catch (error: any) {
    toastError(
      error.data?.detail ||
        'Возникла ошибка при загрузке фото. Пожалуйста, повторите попытку позже.'
    );
    return { success: false, data: error };
  }
};

const uploadFILE = async ({
  photo,
  axiosInstance,
}: FormDataWithAxiosInstance): Promise<UploadResponse> => {
  try {
    const currentDate = new Date().getTime();
    const formData = new FormData();
    formData.append('file', photo);
    formData.append('title', `${currentDate}`);

    const response = await axiosInstance.post('category/files/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return { success: true, data: response.data };
  } catch (error: any) {
    toastError(
      error.data?.detail ||
        'Возникла ошибка при загрузке файлов. Пожалуйста, повторите попытку позже.'
    );
    return { success: false, data: error };
  }
};

export { uploadIMG, uploadFILE };
