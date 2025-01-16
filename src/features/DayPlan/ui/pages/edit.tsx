import { daysWeek } from '@/shared/utils/constants/data';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { Controller } from 'react-hook-form';
import useEditDayPlanService from '../../model/useEditDayPlanService';
import { Loader } from '@/widgets';
import Edit from '@mui/icons-material/Edit';
import EditStoreDayPlanModal from '../components/EditStoreDayPlanModal';
import NewStoreDayPlanModal from '../components/NewStoreDayPlanModal';
import { Lightbox } from 'react-modal-image';

const EditDayPlan = () => {
  const {
    add,
    open,
    image,
    control,
    onSubmit,
    setImage,
    isLoading,
    storePlans,
    handleClose,
    handleSubmit,
    setStorePlans,
    handleCloseAdd,
  } = useEditDayPlanService();

  if (isLoading === 'loading') return <Loader />;

  return (
    <>
      {!!image && (
        <Lightbox
          //@ts-ignore
          onClose={() => setImage('')}
          small={image}
          medium={image}
          large={image}
          showRotate={true}
          hideDownload={true}
          alt='IMAGE'
        />
      )}
      <form className='w-full h-full' onSubmit={handleSubmit(onSubmit)}>
        <div className='flex justify-between items-center mb-4'>
          <h1 className='text-xl font-bold py-[5.5px]'>
            Редактировать план дня
          </h1>
          <button type='submit' className='elim_button w-[20%]'>
            Сохранить
          </button>
        </div>
        <div className='grid grid-cols-1 gap-4'>
          <Controller
            name='day'
            control={control}
            rules={{ required: false }}
            render={({ field }) => (
              <FormControl className='w-full' variant='outlined'>
                <Select
                  displayEmpty
                  className='hello_input'
                  MenuProps={{
                    PaperProps: {
                      style: {
                        maxHeight: 48 * 4.5 + 8,
                        width: 250,
                      },
                    },
                  }}
                  {...field}
                >
                  <MenuItem value=''>
                    <span className='text-base text-[#6D7185]'>
                      Выберите дни недели
                    </span>
                  </MenuItem>
                  {Object.entries(daysWeek).map((day: any) => (
                    <MenuItem key={day[0]} value={day[0]}>
                      {day[1]}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
          />
          <div className='w-full flex flex-col gap-2'>
            Планы магазина:
            <div className='w-full grid grid-cols-4 gap-4'>
              {storePlans.map((plan, index) => (
                <div
                  key={plan.id}
                  className='flex gap-2 p-2 bg-slate-200 rounded'
                >
                  <span>{index + 1})</span>
                  <div className='flex flex-col'>
                    <div>Магазин: {plan?.store?.name}</div>
                    <span>ID: {plan.id}</span>
                    <span>Заказано: {plan.madeOrder ? '✅' : '❌'}</span>
                    <div className='flex items-start gap-2 py-2'>
                      <p>Фото:</p>
                      {plan.photo ? (
                        <div onClick={() => setImage(plan.photo || '')}>
                          <img
                            className='max-w-[40px] w-full max-h-[40px] h-full object-cover cursor-zoom-in'
                            src={plan.photo}
                            alt='Фото'
                          />
                        </div>
                      ) : null}
                    </div>
                    <span>Комментарий: {plan?.comment}</span>
                    <div className='w-full flex items-center mt-2'>
                      <IconButton
                        onClick={() =>
                          handleClose(plan.id as unknown as string)
                        }
                      >
                        <Edit className='text-blue-500 !text-2xl cursor-pointer' />
                      </IconButton>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <span
              onClick={handleCloseAdd}
              className='elim_button w-[20%] h-full flex justify-center items-center cursor-pointer'
            >
              Добавить план магазина
            </span>
          </div>
        </div>
      </form>
      {open && (
        <EditStoreDayPlanModal
          open={open}
          handleClose={handleClose}
          setStorePlans={setStorePlans}
        />
      )}
      {add && (
        <NewStoreDayPlanModal
          open={add}
          handleClose={handleCloseAdd}
          setStorePlans={setStorePlans}
        />
      )}
    </>
  );
};

export default EditDayPlan;
