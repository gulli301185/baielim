import { useGetCostTypeQuery } from '@/app/slices/costTypeSlice';
import { useEditItemMutation } from '@/app/slices/itemApi';
import { ICosts, IItem, Status } from '@/shared/types';
import { useAxiosRequest } from '@/shared/utils/helpers/axiosRequest';
import { toastError } from '@/shared/utils/helpers/toastify';
import { uploadIMG } from '@/shared/utils/helpers/upload';
import { useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';

type CloseParams = {
  id: number;
  index: number;
} | null;

const useEditItemService = () => {
  const navigate = useNavigate();
  const { itemID } = useParams();
  const axiosInstance = useAxiosRequest();

  const costTypeQuery = useGetCostTypeQuery();
  const [editItem, { isLoading }] = useEditItemMutation();
  const [loading, setLoading] = useState<Status>('initial');
  const [oldCosts, setOldCosts] = useState<ICosts[]>([]);
  const [open, setOpen] = useState<CloseParams>(null);
  const [imgForShow, setImgForShow] = useState('');

  const {
    control,
    handleSubmit,
    getValues,
    resetField,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: async () => {
      const { success, data } = await fetchData();
      if (success && data !== undefined) {
        setOldCosts(data?.costs ?? []);
        return {
          category: { label: data.category?.name, id: data.category?.id },
          photo: data.photo,
          name: data.name,
          costIn: data.costIn,
          quantity: data.quantity,
          weight: data.weight,
          author: data.author,
          costTypes: data.costs?.map((cost) => cost?.costType?.id),
        };
      } else {
        return null;
      }
    },
  });

  const values = getValues();

  const fetchData = async () => {
    try {
      setLoading('loading');

      const { data } = await axiosInstance.get<IItem>(`/core/item/${itemID}/`);

      setLoading('success');
      return { success: true, data };
    } catch (error) {
      setLoading('error');
      return { success: false, data: undefined };
    }
  };

  const onSubmit: SubmitHandler<FieldValues> = async (
    formData: FieldValues
  ) => {
    setLoading('loading');

    const {
      name,
      costIn,
      category,
      quantity,
      weight,
      photo,
      author,
      ...costData
    } = formData;

    try {
      const photoLink = imgForShow ? await uploadPhoto(photo) : photo;
      const oldCostIds = oldCosts.map((item) => item.id);

      const costs = costTypeQuery?.isSuccess
        ? buildCosts(
            costData,
            costTypeQuery.data.filter(
              (costType) => !values.costTypes?.includes(costType.id)
            )
          )
        : [];

      const costResponses = await Promise.all(
        costs.map((cost) => axiosInstance.post('/core/cost/', cost))
      );
      const savedCosts = costResponses.map((res) => res.data);

      const dataToSend = {
        id: values.id || itemID,
        name,
        costIn,
        quantity,
        weight,
        author,
        costs: [...oldCostIds, ...savedCosts.map((cost) => cost.id)],
        category: category.id,
        photo: photoLink,
      };

      await editItem(dataToSend).unwrap();

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

  const buildCosts = (costData: any, costTypes: any[]) => {
    return costTypes.map((costType) => {
      const bonusAmountKey = `bonus-${costType.id}`;
      const costKey = `cost-${costType.id}`;
      return {
        costType: costType.id,
        cost: costData[costKey] ?? 0,
        bonusAmount: costData[bonusAmountKey] ?? 0,
      };
    });
  };
  const uploadPhoto = async (photo: File) => {
    const { success, data } = await uploadIMG({ photo, axiosInstance });
    if (!success) throw new Error(data);
    return data.image;
  };

  const handleRemoveImage = () => {
    setImgForShow('');
    resetField('photo');
    setValue('photo', '');
  };

  const handleClose = (params: CloseParams) => {
    if (params) {
      const { id, index } = params;
      setOpen({ id, index });
    } else {
      setOpen(null);
    }
  };

  return {
    open,
    values,
    errors,
    control,
    loading,
    oldCosts,
    onSubmit,
    isLoading,
    imgForShow,
    setOldCosts,
    handleClose,
    handleSubmit,
    setImgForShow,
    costTypeQuery,
    handleRemoveImage,
  };
};

export default useEditItemService;
