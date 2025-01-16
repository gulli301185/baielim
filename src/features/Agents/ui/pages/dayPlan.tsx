import { CustomPagination, DataGridTable } from '@/widgets';
import useAgentDayPlanService from '../../model/useAgentDayPlanService';
import { columnsDayPlan } from '@/shared/utils/constants/column';

const AgentDayPlan = () => {
  const { dayPlans, status, count, handleChangePage, page } =
    useAgentDayPlanService();

  return (
    <div className='w-full h-full'>
      <h1 className='text-xl font-bold pb-4'>Планы на дни недели:</h1>
      <div className='w-full h-full'>
        <DataGridTable
          getRowHeight={() => 'auto'}
          error={status === 'error'}
          rows={dayPlans.map((item, index) => ({
            rowNum: (page - 1) * 20 + index + 1,
            ...item,
          }))}
          columns={columnsDayPlan}
          loading={status === 'loading'}
          nav={false}
        />
        <CustomPagination count={count} handleChangePage={handleChangePage} />
      </div>
    </div>
  );
};

export default AgentDayPlan;
