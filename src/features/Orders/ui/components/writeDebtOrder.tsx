import { Controller } from 'react-hook-form';
import useWriteDebtOrder from '../../model/useWriteDebtOrder';
import CircularProgress from '@mui/material/CircularProgress';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Close from '@mui/icons-material/Close';

type Props = {
  open: number;
  handleClose: (value: number | null) => void;
  fetchData: () => void;
};

const WriteDebtOrder = ({ open, handleClose, fetchData }: Props) => {
  const { handleSubmit, control, onSubmit, status, errors } = useWriteDebtOrder(
    { handleClose, open, fetchData }
  );

  return (
    <Modal open={!!open} onClose={() => handleClose(null)}>
      <div className='absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[60%] sm:w-full min-h-[200px] bg-[#FAFBFD] p-4 rounded-lg flex flex-col gap-6 outline-none'>
        <div className='w-full flex justify-between items-center'>
          <p className='text-lg text-[#333] font-semibold'>Списать долг</p>
          <div onClick={() => handleClose(null)} className='cursor-pointer'>
            <Close />
          </div>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='grid grid-cols-1 gap-4'
        >
          <Controller
            name='sum'
            control={control}
            defaultValue={open}
            rules={{
              required: 'Обязательное поле',
              min: {
                value: 1,
                message: 'Минимальная сумма списания - 1 сом.',
              },
              max: {
                value: open,
                message: `Максимальная сумма списания - ${open} сом.`,
              },
            }}
            render={({ field, fieldState }) => (
              <TextField
                fullWidth
                type='number'
                label='Сумма'
                helperText={
                  (typeof errors.sum?.message === 'string' &&
                    errors.sum?.message) ||
                  fieldState.error?.message
                }
                error={!!fieldState?.error}
                {...field}
              />
            )}
          />
          <Controller
            name='comment'
            control={control}
            defaultValue={'Списать долг'}
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
          <button
            disabled={status === 'loading'}
            type='submit'
            className='elim_button tp-center'
          >
            {status === 'loading' ? (
              <CircularProgress className='!text-white' size={26} />
            ) : (
              'Сохранить'
            )}
          </button>
        </form>
      </div>
    </Modal>
  );
};

export default WriteDebtOrder;
