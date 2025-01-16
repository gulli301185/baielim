import { columnsDayPlan } from '@/shared/utils/constants/column';
import { ContentHeader, CustomPagination, DataGridTable } from '@/widgets';
import useDayPlanService from '../../model/useDayPlanService';
import SearchFilter from '@/widgets/SearchFilter';
import ConfirmModal from '@/widgets/ConfirmModal';

const DayPlans = () => {
  const {
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
  } = useDayPlanService();

  return (
    <div className='w-full h-full'>
      <ContentHeader title='Планы дня' url='new' />
      <div className='w-full h-full'>
        <SearchFilter
          control={control}
          onSubmit={onSubmit}
          handleClose={handleClose}
          handleSubmit={handleSubmit}
          handleResetFields={handleResetFields}
          filters={{
            agent: true,
            day_plan: true,
          }}
        />
        <DataGridTable
          error={status === 'error'}
          getRowHeight={() => 'auto'}
          rows={dayPlans.map((item, index) => ({
            rowNum: (page - 1) * 20 + index + 1,
            ...item,
          }))}
          columns={columnsDayPlan}
          loading={status === 'loading'}
          nav={true}
          link={'day-plans/'}
        />
        <CustomPagination count={count} handleChangePage={handleChangePage} />
      </div>
      {open && (
        <ConfirmModal
          open={open}
          onClose={handleClose}
          text={
            'Вы уверены, что хотите обновить планы дня, если да, то все планы будут заархивированы и будут созданы новые.'
          }
          onAccept={() => {
            handleUpdateDayPlans();
            handleClose();
          }}
        />
      )}
    </div>
  );
};

export default DayPlans;
