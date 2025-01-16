import { ContentHeader, CustomPagination, DataGridTable } from '@/widgets';
import useAgentService from '../../model/useAgentService';
import { columnsAgent } from '@/shared/utils/constants/column';
import SearchFilter from '@/widgets/SearchFilter';

const Agents = () => {
  const {
    data,
    page,
    reset,
    isError,
    control,
    refetch,
    register,
    onSubmit,
    isLoading,
    isFetching,
    handleSubmit,
    handleChangePage,
  } = useAgentService();

  return (
    <div className='w-full h-full'>
      <ContentHeader title='Агенты' url='new' />
      <SearchFilter
        control={control}
        register={register}
        onSubmit={onSubmit}
        handleSubmit={handleSubmit}
        placeholder={'Поиск по ФИО и номеру телефона'}
        handleResetFields={() => reset()}
        refetch={refetch}
        filters={{
          search: true,
          agent: false,
          store: false,
          category: false,
          start_date: false,
          end_date: false,
          sync: 'synchronize_agents',
        }}
      />
      <DataGridTable
        error={isError}
        rows={
          data?.results?.map((item, index) => ({
            rowNum: (page - 1) * 20 + index + 1,
            ...item,
          })) || []
        }
        columns={columnsAgent}
        loading={isLoading || isFetching}
        nav={true}
        link={'agents/'}
      />
      <CustomPagination
        count={data?.count || 0}
        handleChangePage={handleChangePage}
      />
    </div>
  );
};

export default Agents;
