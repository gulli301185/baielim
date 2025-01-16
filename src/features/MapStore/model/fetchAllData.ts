import { toastError } from '@/shared/utils/helpers/toastify';
import { AxiosInstance } from 'axios';

export interface IStoreCoordinate {
  id: number;
  name: string;
  lat: number;
  lon: number;
}

interface IResult {
  results: IStoreCoordinate[];
  count: number;
}

export const fetchAllStoreCoordinates = async (axiosReq: AxiosInstance) => {
  let allData: IStoreCoordinate[] = [];
  let page = 1;
  let totalCount = 0;
  let data;

  try {
    do {
      const response = await axiosReq.get<IResult>(
        `/user/get_stores/?page=${page}`
      );
      data = response.data;

      if (data) {
        allData = allData.concat(data.results);
        totalCount = data.count;
        page += 1;
      } else {
        break;
      }
    } while (allData.length < totalCount);
  } catch (error) {
    toastError('Возникла ошибка. Пожалуйста, повторите попытку позже');
  }

  return allData;
};
