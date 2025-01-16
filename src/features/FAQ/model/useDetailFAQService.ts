import { useDeleteFAQMutation, useGetFAQbyIDQuery } from '@/app/slices/faqApi';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const useDetailFAQService = () => {
  const { faqID } = useParams();
  const navigate = useNavigate();

  const { data, isFetching, isError, isLoading } = useGetFAQbyIDQuery(faqID);
  const [deleteFAQ, { isLoading: loading }] = useDeleteFAQMutation();

  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen((prev) => !prev);
  };

  const handleDeleteFAQ = async () => {
    await deleteFAQ(faqID as unknown as string).unwrap();
    navigate(-1);
  };

  return {
    data,
    open,
    isError,
    loading,
    isLoading,
    isFetching,
    handleClose,
    handleDeleteFAQ,
  };
};

export default useDetailFAQService;
