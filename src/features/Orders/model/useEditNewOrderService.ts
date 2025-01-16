import { useAppSelector } from '@/app/hook';
import { useGetItemsQuery } from '@/app/slices/itemApi';
import { userInfo } from '@/app/slices/userSlice';
import { IItem, IOrders, Status } from '@/shared/types';
import { useAxiosRequest } from '@/shared/utils/helpers/axiosRequest';
import { toastError } from '@/shared/utils/helpers/toastify';
import useDebouncedInputChange from '@/shared/utils/helpers/useDebouncedInputChange';
import { useEffect, useMemo, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';

const useEditNewOrderService = () => {
  const navigate = useNavigate();
  const { orderID } = useParams();
  const user = useAppSelector(userInfo);
  const axiosInstance = useAxiosRequest();

  const [open, setOpen] = useState<number | null>(null);
  const [removeItem, setRemoveItem] = useState<number | null>(null);
  const [itemsPage, setItemsPage] = useState(1);
  const [search, setSearch] = useState('');
  const [items, setItems] = useState<IItem[]>([]);
  const [oldItems, setOldItems] = useState<any[]>([]);
  const [loading, setLoading] = useState<Status>('initial');
  const [deletedIds, setDeletedIds] = useState<any>([]);

  const itemsQuery = useGetItemsQuery({ page: itemsPage, search });
  const [selectedItems, setSelectedItems] = useState<any>([]);

  const { control, handleSubmit, watch, getValues, setValue } = useForm({
    defaultValues: async () => {
      const { success, data } = await fetchData();

      if (success && data !== undefined) {
        setOldItems(data.items);
        return {
          comment: data.comment,
          driver: {
            label: data.driver?.name ?? '',
            id: data.driver?.id ?? '',
          },
          costType: data.costType,
        };
      } else {
        return null;
      }
    },
  });

  watch('items');
  const values = getValues();

  const handleCountChange = (itemId: string, newCount: number) => {
    setSelectedItems((prevItems: any) =>
      prevItems.map((item: any) =>
        item.id === itemId
          ? {
              ...item,
              count: newCount || 1,
              totalCost: newCount * item.cost,
            }
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

  const fetchData = async () => {
    try {
      setLoading('loading');

      const { data } = await axiosInstance.get<IOrders>(
        `/core/order/${orderID}/`
      );

      setLoading('success');
      return { success: true, data };
    } catch (error) {
      setLoading('error');
      return { success: false, data: undefined };
    }
  };

  const orderHistory = async (newItemResponses: any) => {
    const url = '/core/orderHistory/';

    const body = {
      order: orderID,
      description: 'Изменено детали заказа',
      addedItems: newItemResponses.map((item: any) => item.id),
      removeItems: deletedIds,
      admin: user?.user_id,
    };

    await axiosInstance.post(url, body);
  };

  const onSubmit: SubmitHandler<FieldValues> = async ({ comment, driver }) => {
    setLoading('loading');

    try {
      const oldItemIds = oldItems.map((item) => item.id);
      const newItemResponses = await sendPostRequests(selectedItems);

      const totalCost = [...oldItems, ...newItemResponses].reduce(
        (sum: number, item: any) => sum + item.count * item.soldCost,
        0
      );

      const dataToSend = {
        comment,
        driver: driver.id.toString(),
        totalCost,
        items: [...oldItemIds, ...newItemResponses.map((res: any) => res.id)],
      };

      await axiosInstance.patch<Partial<IOrders>>(
        `/core/order/${orderID}/`,
        dataToSend
      );

      await orderHistory(newItemResponses);

      setLoading('success');
      navigate(-1);
    } catch (error: any) {
      setLoading('error');
      toastError(
        error.data?.detail ||
          'Возникла ошибка. Пожалуйста, повторите попытку позже'
      );
    }
  };

  const sendPostRequests = async (items: any) => {
    const url = '/core/orderItem/';
    const responses: any = [];

    if (items.length === 0 || !values.costType?.id) {
      return responses;
    }

    const requests = items.map((item: any) => {
      const body = {
        item: item.id,
        count: item.count,
        soldCost: item.cost,
        costType: values.costType?.id,
      };
      return axiosInstance.post(url, body);
    });

    const results = await Promise.all(requests);
    return results.map((res) => res.data);
  };

  const handleInputChange = useDebouncedInputChange(setItemsPage, setSearch);

  useEffect(() => {
    if (itemsQuery.isSuccess && itemsQuery.data?.results) {
      setItems((prevItems) =>
        itemsPage === 1
          ? itemsQuery.data.results
          : [...prevItems, ...itemsQuery.data.results]
      );
    }
  }, [itemsQuery.data, itemsPage]);

  useEffect(() => {
    setValue('items', selectedItems);
  }, [selectedItems, setValue]);

  const handleClose = (value: number | null) => {
    setOpen(value);
  };

  const handleRemoveItem = (value: number | null) => {
    setRemoveItem(value);
  };

  const handleDeleteItem = (itemID: number) => {
    setOldItems((prevItems) => prevItems.filter((item) => item.id !== itemID));
    setDeletedIds([...deletedIds, itemID]);
  };

  return {
    open,
    items,
    values,
    control,
    loading,
    onSubmit,
    totalSum,
    oldItems,
    itemsPage,
    removeItem,
    itemsQuery,
    setOldItems,
    handleClose,
    handleSubmit,
    setItemsPage,
    selectedItems,
    handleDeleteItem,
    handleRemoveItem,
    handleCountChange,
    handleInputChange,
    handleAutocompleteChange,
  };
};

export default useEditNewOrderService;
