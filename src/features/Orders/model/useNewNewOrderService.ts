import { useGetItemsQuery } from '@/app/slices/itemApi';
import { ICount, IItem, IOrders, Status } from '@/shared/types';
import { useAxiosRequest } from '@/shared/utils/helpers/axiosRequest';
import { toastError } from '@/shared/utils/helpers/toastify';
import { uploadIMG } from '@/shared/utils/helpers/upload';
import useDebouncedInputChange from '@/shared/utils/helpers/useDebouncedInputChange';
import { useEffect, useMemo, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const useNewNewOrderService = () => {
  const navigate = useNavigate();
  const axiosReq = useAxiosRequest();

  const {
    control,
    handleSubmit,
    getValues,
    setValue,
    watch,
    formState: { errors },
  } = useForm();

  const watchStore = watch('store');
  watch('items');
  const values = getValues();

  const [status, setStatus] = useState<Status>('initial');
  const [imgForShow, setImgForShow] = useState('');
  const [search, setSearch] = useState('');
  const [itemsPage, setItemsPage] = useState(1);
  const [items, setItems] = useState<IItem[]>([]);
  const [countOrders, setCountOrders] = useState<ICount | null>(null);

  const itemsQuery = useGetItemsQuery({ page: itemsPage, search });
  const [selectedItems, setSelectedItems] = useState<any>([]);

  const handleCountChange = (itemId: string, newCount: number) => {
    setSelectedItems((prevItems: any) =>
      prevItems.map((item: any) =>
        item.id === itemId
          ? { ...item, count: newCount, totalCost: newCount * item.cost }
          : item
      )
    );
  };

  const handleAutocompleteChange = (_: React.ChangeEvent<{}>, value: any) => {
    setSelectedItems((prevItems: any) => {
      const updatedItems = value.map((newItem: any) => {
        const existingItem = prevItems.find(
          (item: any) => item.id === newItem.id
        );
        return existingItem ? { ...existingItem } : { ...newItem };
      });
      return updatedItems;
    });
  };

  const totalSum = useMemo(() => {
    return selectedItems.reduce(
      (sum: number, item: any) => sum + item.totalCost,
      0
    );
  }, [selectedItems]);

  useEffect(() => {
    if (itemsQuery.isSuccess && itemsQuery.data?.results) {
      setItems((prevItems) =>
        itemsPage === 1
          ? itemsQuery.data.results
          : [...prevItems, ...itemsQuery.data.results]
      );
    }
  }, [itemsQuery.data, itemsPage]);

  const handleInputChange = useDebouncedInputChange(setItemsPage, setSearch);

  const getStoreDebts = async () => {
    try {
      const responseCount = await axiosReq.post('/core/count_orders/', {
        status: 'new',
        store: values.store?.id || null,
        agent: null,
        driver: null,
        paymentStatuses: 'half,not_paid',
        costType: null,
        start_date: null,
        end_date: null,
      });

      setCountOrders(responseCount.data);
    } catch (error) {
      setCountOrders(null);
    }
  };

  const onSubmit: SubmitHandler<FieldValues> = async ({
    store,
    agent,
    driver,
    comment,
    lat,
    lon,
    photo,
  }: FieldValues) => {
    setStatus('loading');

    try {
      let photoLink = '';
      if (photo) {
        const { success, data } = await uploadIMG({
          photo,
          axiosInstance: axiosReq,
        });
        if (!success) throw new Error(data);
        photoLink = data.image;
      }

      const dataToSend = {
        store: store.id,
        agent: agent.id,
        driver: driver.id,
        items: selectedItems.map((item: any) => ({
          item: item.id,
          count: item.count,
          soldCost: item.cost,
          costType: store.storeCostType,
        })),
        totalCost: totalSum || 0,
        amountLeft: totalSum || 0,
        comment,
        lat,
        lon,
        costType: store.storeCostType,
        photo: photoLink,
      };

      await axiosReq.post<IOrders>(`/core/order/`, dataToSend);

      setStatus('success');
      navigate(-1);
    } catch (error: any) {
      setStatus('error');
      toastError(
        error.data?.detail ||
          'Возникла ошибка. Пожалуйста, повторите попытку позже'
      );
    }
  };

  useEffect(() => {
    setValue('items', selectedItems);
  }, [selectedItems, setValue]);

  useEffect(() => {
    if (values.store?.id) {
      getStoreDebts();
    }
  }, [watchStore]);

  return {
    items,
    errors,
    values,
    status,
    control,
    totalSum,
    onSubmit,
    itemsPage,
    imgForShow,
    itemsQuery,
    countOrders,
    setItemsPage,
    handleSubmit,
    selectedItems,
    setImgForShow,
    handleInputChange,
    handleCountChange,
    handleAutocompleteChange,
  };
};

export default useNewNewOrderService;
