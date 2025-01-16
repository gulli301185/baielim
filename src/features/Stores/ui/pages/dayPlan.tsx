import { columnsStoreDayPlan } from '@/shared/utils/constants/column';
import { CustomPagination, DataGridTable } from '@/widgets';
import useStoreDayPlanService from '../../model/useStoreDayPlanService';

const StoreDayPlan = () => {
  const { dayPlans, status, count, handleChangePage, page } =
    useStoreDayPlanService();

  return (
    <div className='w-full h-full'>
      <h1 className='text-xl font-bold pb-4'>Планы на дни недели:</h1>
      <div className='w-full h-full'>
        <DataGridTable
          error={status === 'error'}
          rows={dayPlans.map((item, index) => ({
            rowNum: (page - 1) * 20 + index + 1,
            ...item,
          }))}
          columns={columnsStoreDayPlan}
          loading={status === 'loading'}
          nav={false}
        />
        <CustomPagination count={count} handleChangePage={handleChangePage} />
      </div>
    </div>
  );
};

export default StoreDayPlan;
