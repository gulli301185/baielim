import { Filters } from '@/shared/types';
import { useAxiosRequest } from '@/shared/utils/helpers/axiosRequest';
import { synchronizeWithOneC } from '@/shared/utils/helpers/syncWithOneC';
import { GridRowSelectionModel } from '@mui/x-data-grid';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import {
  Control,
  Controller,
  FieldValues,
  SubmitHandler,
  UseFormHandleSubmit,
  UseFormRegister,
} from 'react-hook-form';
import {
  AgentAutocomplete,
  CategoryAutocomplete,
  CostTypeAutocomplete,
  DriverAutocomplete,
  RegionAutocomplete,
  StoreAutocomplete,
} from '@/shared/utils/ui';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

type Props = {
  refetch?: any;
  filters: Filters;
  placeholder?: string;
  control: Control<FieldValues, any> | any;
  onSubmit: SubmitHandler<FieldValues>;
  register?: UseFormRegister<FieldValues> | any;
  handleSubmit: UseFormHandleSubmit<FieldValues, undefined>;
  handleResetFields: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => any;
  rowSelectionModel?: GridRowSelectionModel;
  handleClose?: () => void;
  getOrders?: ({}) => void;
  setWaybill?: (v: string) => void;
};

const SearchFilter = ({
  refetch,
  control,
  filters,
  onSubmit,
  register,
  handleClose,
  placeholder,
  handleSubmit,
  getOrders,
  handleResetFields,
  rowSelectionModel,
  setWaybill,
}: Props) => {
  const axiosReq = useAxiosRequest();
  const currentDay = new Date().getDay();
  const isDisabled = currentDay !== 0 && currentDay !== 1;

  return (
    <form
      className={`w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-2 pb-4`}
      onSubmit={handleSubmit(onSubmit)}
    >
      {filters.search && register && (
        <input
          type='text'
          {...register('search', {
            required: false,
          })}
          className='elim_input h-14'
          placeholder={placeholder || 'Поиск'}
        />
      )}
      {filters.startSum && register && (
        <input
          type='number'
          {...register('startSum', {
            required: false,
          })}
          className='elim_input h-14'
          placeholder={'Стратовая сумма'}
        />
      )}
      {filters.endSum && register && (
        <input
          type='number'
          {...register('endSum', {
            required: false,
          })}
          className='elim_input h-14'
          placeholder={'Конечная сумма'}
        />
      )}
      {filters.agent && (
        <AgentAutocomplete control={control} required={false} />
      )}
      {filters.store && (
        <StoreAutocomplete control={control} required={false} />
      )}
      {filters.driver && (
        <DriverAutocomplete control={control} required={false} />
      )}
      {filters.region && (
        <RegionAutocomplete control={control} required={false} />
      )}
      {filters.costType && (
        <CostTypeAutocomplete control={control} required={false} />
      )}
      {filters.category && (
        <CategoryAutocomplete control={control} required={false} />
      )}
      {filters.start_date && (
        <Controller
          name='start_date'
          control={control}
          rules={{ required: false }}
          render={({ field: { value, onChange, ...fieldState } }) => (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label='Начало'
                minDate={dayjs('2023-01-01')}
                value={value ? dayjs(value) : null}
                onChange={(date) => {
                  onChange(date?.format('YYYY-MM-DD') || null);
                }}
                {...fieldState}
              />
            </LocalizationProvider>
          )}
        />
      )}
      {filters.end_date && (
        <Controller
          name='end_date'
          control={control}
          rules={{ required: false }}
          render={({ field: { value, onChange, ...fieldState } }) => (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label='Конец'
                minDate={dayjs('2023-01-01')}
                value={value ? dayjs(value) : null}
                onChange={(date) => {
                  onChange(date?.format('YYYY-MM-DD') || null);
                }}
                {...fieldState}
              />
            </LocalizationProvider>
          )}
        />
      )}
      {filters.author && (
        <Controller
          name='author'
          control={control}
          rules={{ required: false }}
          render={({ field }) => (
            <FormControl
              id='author-label'
              className='w-full'
              variant='outlined'
            >
              <InputLabel>Выберите автора</InputLabel>
              <Select
                labelId='author-label'
                className='hello_input'
                MenuProps={{
                  PaperProps: {
                    style: {
                      maxHeight: 48 * 4.5 + 8,
                      width: 250,
                    },
                  },
                }}
                label={'Выберите автора'}
                {...field}
              >
                <MenuItem value='Органик'>Органик</MenuItem>
                <MenuItem value='Бай Элим'>Бай Элим</MenuItem>
              </Select>
            </FormControl>
          )}
        />
      )}
      {filters.date && (
        <Controller
          name='date'
          control={control}
          rules={{ required: false }}
          render={({ field: { value, onChange, ...fieldState } }) => (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label='Дата'
                minDate={dayjs('2023-01-01')}
                value={value ? dayjs(value) : null}
                onChange={(date) => {
                  onChange(date?.format('YYYY-MM-DD') || null);
                }}
                {...fieldState}
              />
            </LocalizationProvider>
          )}
        />
      )}
      <div className='grid grid-cols-2 gap-2'>
        <button className='elim_button bg-green-500 h-14' type='submit'>
          Поиск
        </button>
        <button
          className='elim_button bg-red-600 h-14'
          onClick={(event) => handleResetFields(event)}
        >
          Сбросить
        </button>
      </div>
      {filters.day_plan && (
        <div
          className={`elim_button bg-blue-500 h-14 tp-center ${
            isDisabled ? 'pointer-events-none opacity-50' : ''
          }`}
          onClick={!isDisabled ? handleClose : undefined}
        >
          Обновить планы дня
        </div>
      )}
      {filters.sync && (
        <button
          className='elim_button bg-blue-600 h-14'
          onClick={() => {
            if (
              filters.sync === 'synchronize_agents' ||
              filters.sync === 'synchronize_drivers'
            ) {
              synchronizeWithOneC({ link: filters.sync, axiosReq, refetch });
            } else if (filters.sync) {
              synchronizeWithOneC({ link: filters.sync, axiosReq });
            }
          }}
        >
          Синхронизировать с 1с
        </button>
      )}
      <div
        className={`grid col-span-4 overflow-hidden transition-all duration-300 ease-in-out ${
          !!rowSelectionModel?.length
            ? 'grid-rows-[1fr] opacity-100'
            : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className='overflow-hidden grid grid-cols-4 gap-2'>
          <button
            onClick={(e) => {
              e.preventDefault();
              handleClose && handleClose();
            }}
            className='elim_button bg-blue-500 h-14'
          >
            Поменять водителя
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              synchronizeWithOneC &&
                synchronizeWithOneC({
                  link: 'synchronize_orders',
                  axiosReq,
                  getOrders,
                  rowSelectionModel,
                });
            }}
            className='elim_button bg-blue-500 h-14'
          >
            Синхронизация с 1с
          </button>
          <div
            onClick={() => setWaybill && setWaybill('nVAT')} // no VAT
            className='elim_button bg-blue-500 h-14 tp-center'
          >
            Сохранить как PDF
          </div>
          <div
            onClick={() => setWaybill && setWaybill('wVAT')} // with VAT
            className='elim_button bg-blue-500 h-14 tp-center'
          >
            Сохранить как PDF (НДС)
          </div>
        </div>
      </div>
    </form>
  );
};

export default SearchFilter;
