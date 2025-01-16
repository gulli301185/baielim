import useNewDayPlanService from '../../model/useNewDayPlanService';
import { Controller } from 'react-hook-form';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { daysWeek, planStatus } from '@/shared/utils/constants/data';
import NewStoreDayPlanModal from '../components/NewStoreDayPlanModal';
import { AgentAutocomplete, DriverAutocomplete } from '@/shared/utils/ui';
import DeleteIcon from '@mui/icons-material/Delete';

const NewDayPlan = () => {
  const {
    open,
    control,
    onSubmit,
    storePlans,
    handleClose,
    handleSubmit,
    setStorePlans,
    handleDeleteStorePlan,
  } = useNewDayPlanService();

  return (
    <>
      <form className='w-full h-full' onSubmit={handleSubmit(onSubmit)}>
        <div className='flex justify-between items-center mb-4'>
          <h1 className='text-xl font-bold py-[5.5px]'>Добавить план дня</h1>
          <button type='submit' className='elim_button w-[20%]'>
            Сохранить
          </button>
        </div>
        <div className='grid grid-cols-1 gap-4'>
          <Controller
            name='day'
            control={control}
            defaultValue={'monday'}
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
          <Controller
            name='status'
            control={control}
            defaultValue={'new'}
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
                      Выберите статус
                    </span>
                  </MenuItem>
                  {Object.entries(planStatus).map((plan: any) => (
                    <MenuItem key={plan[0]} value={plan[0]}>
                      {plan[1]}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
          />
          <AgentAutocomplete control={control} required={'Обязательное поле'} />
          <DriverAutocomplete
            control={control}
            required={'Обязательное поле'}
          />
          <Controller
            name='dateCreated'
            control={control}
            rules={{ required: false }}
            render={({ field: { value, onChange, ...fieldState } }) => (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                  sx={{
                    width: '100%',
                  }}
                  ampm={false}
                  label='Дата создания'
                  minDate={dayjs('2023-01-01T00:00')}
                  value={value ? dayjs(value) : null}
                  onChange={(date) => {
                    onChange(date?.format('YYYY-MM-DD HH:mm:ss') || null);
                  }}
                  {...fieldState}
                />
              </LocalizationProvider>
            )}
          />
          <div className='w-full flex flex-col gap-2'>
            Планы магазина:
            <div className='w-full flex gap-4'>
              {storePlans.map((plan, index) => (
                <div
                  key={plan.id}
                  className='flex gap-2 p-2 bg-slate-200 rounded'
                >
                  <span>{index + 1})</span>
                  <div>
                    <div>Магазин: {plan.label}</div>
                    <span>ID: {plan.id}</span>
                  </div>
                  <span
                    onClick={() => handleDeleteStorePlan(plan.id)}
                    className='elim_button bg-red-600 w-[20%] h-full flex justify-center items-center cursor-pointer'
                  >
                    <DeleteIcon />
                  </span>
                </div>
              ))}
            </div>
            <span
              onClick={handleClose}
              className='elim_button w-[20%] h-full flex justify-center items-center cursor-pointer'
            >
              Добавить план магазина
            </span>
          </div>
        </div>
      </form>
      {open && (
        <NewStoreDayPlanModal
          open={open}
          handleClose={handleClose}
          setStorePlans={setStorePlans}
        />
      )}
    </>
  );
};

export default NewDayPlan;
