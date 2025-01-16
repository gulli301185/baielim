import { IDayPlan, IFilter, Status } from '@/shared/types';
import { useAxiosRequest } from '@/shared/utils/helpers/axiosRequest';
import { useEffect, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useSearchParams } from 'react-router-dom';

const useDayPlanService = () => {
  const axiosReq = useAxiosRequest();

  const [dayPlans, setDayPlans] = useState<IDayPlan[]>([]);
  const [status, setStatus] = useState<Status>('initial');
  const [count, setCount] = useState(0);
  const [open, setOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get('page')) || 1;

  const { handleSubmit, reset, control, getValues } = useForm();
  const values = getValues();

  const onSubmit: SubmitHandler<FieldValues> = async ({
    agent,
  }: FieldValues) => {
    handleChangePage(1);
    getDayPlans({
      agent: agent?.id,
    });
  };

  const getDayPlans = async ({ agent = '' }: IFilter) => {
    try {
      setStatus('loading');

      const response = await axiosReq.get<{
        results: IDayPlan[];
        count: number;
      }>(`/user/dayPlan/?ordering=-dateCreated&agent=${agent}&page=${page}`);

      setCount(response.data.count);
      setDayPlans(response.data.results);
      setStatus('success');
    } catch (error) {
      setDayPlans([]);
      setStatus('error');
    }
  };

  const handleChangePage = (page: number) => {
    setSearchParams({ page: `${page}` });
  };

  const handleResetFields = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    reset({
      agent: { label: '', id: '' },
    });
    getDayPlans({});
  };

  const handleClose = () => {
    setOpen((prev) => !prev);
  };

  const handleUpdateDayPlans = async () => {
    setStatus('loading');

    try {
      await axiosReq.get('user/new_day_plans/');
      await getDayPlans({
        agent: values.agent?.id || '',
      });
      setStatus('success');
    } catch (error) {
      setStatus('error');
      handleClose();
    }
  };

  useEffect(() => {
    getDayPlans({
      agent: values.agent?.id || '',
    });
  }, [page]);

  return {
    page,
    open,
    count,
    status,
    control,
    dayPlans,
    onSubmit,
    handleClose,
    handleSubmit,
    handleChangePage,
    handleResetFields,
    handleUpdateDayPlans,
  };
};

export default useDayPlanService;
