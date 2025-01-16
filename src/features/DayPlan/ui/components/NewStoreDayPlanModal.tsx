import CheckOutlined from '@mui/icons-material/CheckOutlined';
import Close from '@mui/icons-material/Close';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Modal from '@mui/material/Modal';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import useNewStoreDayPlan from '../../model/useNewStoreDayPlan';
import { Controller } from 'react-hook-form';
import { planStatus2 } from '@/shared/utils/constants/data';
import { StoreAutocomplete } from '@/shared/utils/ui';

type Props = {
  open: boolean;
  handleClose: () => void;
  setStorePlans: (value: any) => void;
};

const NewStoreDayPlanModal = ({ open, handleClose, setStorePlans }: Props) => {
  const { values, control, onSubmit, handleSubmit } = useNewStoreDayPlan({
    setStorePlans,
    handleClose,
  });

  return (
    <Modal open={open} onClose={handleClose}>
      <div className='absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[60%] sm:w-full min-h-[500px] bg-[#FAFBFD] p-4 rounded-lg flex flex-col gap-6 outline-none'>
        <div className='w-full flex justify-between items-center'>
          <p className='text-lg text-[#333] font-semibold'>
            Добавить план магазина
          </p>
          <div onClick={handleClose} className='cursor-pointer'>
            <Close />
          </div>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='grid grid-cols-1 gap-4'
        >
          <StoreAutocomplete control={control} required={false} />
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
                  {Object.entries(planStatus2).map((plan: any) => (
                    <MenuItem key={plan[0]} value={plan[0]}>
                      {plan[1]}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
          />
          <Controller
            name='comment'
            control={control}
            defaultValue={''}
            rules={{ required: false }}
            render={({ field, fieldState }) => (
              <TextField
                fullWidth
                multiline
                rows={4}
                type='string'
                label='Комментарий'
                error={!!fieldState?.error}
                {...field}
              />
            )}
          />
          <Controller
            name='madeOrder'
            control={control}
            rules={{ required: false }}
            render={({ field }) => {
              return (
                <FormControl
                  className='w-full flex !flex-row justify-start items-center gap-4'
                  variant='outlined'
                >
                  <label
                    htmlFor='madeOrder'
                    className='text-base font-normal text-[#333] leading-6'
                  >
                    Заказано
                  </label>
                  <Checkbox className='w-[20px]' id='madeOrder' {...field} />
                </FormControl>
              );
            }}
          />
          <span className='text-sm text-red-500 font-medium'>
            Пожалуйста, обратите внимание, что максимальный размер фото для
            загрузки составляет 100 МБ
          </span>
          <Controller
            name='photo'
            control={control}
            defaultValue=''
            rules={{ required: false }}
            render={({ field: { onChange } }) => (
              <label
                htmlFor='img'
                className='w-1/2 text-base elim_button tp-center cursor-pointer'
              >
                <input
                  id='img'
                  type='file'
                  className='hidden'
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    if (!e.currentTarget.files) return;
                    onChange(e.currentTarget.files[0]);
                  }}
                />
                Загрузить фото
              </label>
            )}
          />
          {values.photo ? (
            <div className='w-full flex justify-start items-center gap-4'>
              <CheckOutlined className='!text-4xl text-green-500' />
              {values.photo.name}
            </div>
          ) : null}
          <button type='submit' className='elim_button mt-5'>
            Добавить
          </button>
        </form>
      </div>
    </Modal>
  );
};

export default NewStoreDayPlanModal;
