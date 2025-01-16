import { planStatus2 } from '@/shared/utils/constants/data';
import Close from '@mui/icons-material/Close';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Modal from '@mui/material/Modal';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import { Controller } from 'react-hook-form';
import useEditStoreDayPlan from '../../model/useEditStoreDayPlan';
import { Loader } from '@/widgets';
import { StoreAutocomplete } from '@/shared/utils/ui';

type Props = {
  open: string;
  handleClose: (id: string) => void;
  setStorePlans: (value: any) => void;
};

const EditStoreDayPlanModal = ({ open, handleClose, setStorePlans }: Props) => {
  const { control, onSubmit, isLoading, handleSubmit } = useEditStoreDayPlan({
    setStorePlans,
    handleClose,
    open,
  });

  if (isLoading === 'loading') return <Loader />;

  return (
    <Modal open={!!open} onClose={() => handleClose('')}>
      <div className='absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[60%] sm:w-full min-h-[500px] bg-[#FAFBFD] p-4 rounded-lg flex flex-col gap-6 outline-none'>
        <div className='w-full flex justify-between items-center'>
          <p className='text-lg text-[#333] font-semibold'>
            Редактировать план магазина
          </p>
          <div onClick={() => handleClose('')} className='cursor-pointer'>
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
                  <Checkbox
                    checked={field.value}
                    className='w-[20px]'
                    id='madeOrder'
                    {...field}
                  />
                </FormControl>
              );
            }}
          />
          <button type='submit' className='elim_button mt-5'>
            Сохранить
          </button>
        </form>
      </div>
    </Modal>
  );
};

export default EditStoreDayPlanModal;
