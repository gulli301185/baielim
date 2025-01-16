import {
  useDeleteStoryMutation,
  useGetStoriesQuery,
} from '@/app/slices/storyApi';
import { toastError, toastSuccess } from '@/shared/utils/helpers/toastify';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const useStoryService = () => {
  const navigate = useNavigate();
  const {
    data = [],
    isLoading,
    isSuccess,
    isError,
    isFetching,
  } = useGetStoriesQuery();
  const [deleteStory, { isLoading: isDeleting }] = useDeleteStoryMutation();
  const [storyID, setStoryID] = useState(0);

  const handleDeleteStory = async (storyID: number) => {
    try {
      await deleteStory(storyID).unwrap();
      toastSuccess('Успешно удалено');
    } catch (error: any) {
      toastError(
        error.data?.detail ||
          'Возникла ошибка. Пожалуйста, повторите попытку позже'
      );
    }
  };

  const handleDeleteConfirmModal = (value: number) => {
    setStoryID(value);
  };

  return {
    data,
    isLoading,
    isError,
    isFetching,
    isSuccess,
    isDeleting,
    handleDeleteStory,
    navigate,
    handleDeleteConfirmModal,
    storyID,
  };
};

export default useStoryService;
