import CircularProgress from '@mui/material/CircularProgress';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Close from '@mui/icons-material/Close';
import { Controller } from 'react-hook-form';
import useEditOrderItemService from '../../model/useEditOrderItemService';

type Props = {
  open: number;
  handleClose: (value: number | null) => void;
  setOldItems: any;
};

const EditOrderItemOrder = ({ open, handleClose, setOldItems }: Props) => {
  const { status, handleSubmit, control, errors, onSubmit } =
    useEditOrderItemService({
      open,
      handleClose,
      setOldItems,
    });

  return (
    <Modal open={!!open} onClose={() => handleClose(null)}>
      <div className='absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[60%] sm:w-full min-h-[200px] bg-[#FAFBFD] p-4 rounded-lg flex flex-col gap-6 outline-none'>
        <div className='w-full flex justify-between items-center'>
          <p className='text-lg text-[#333] font-semibold'>
            Редактировать товар
          </p>
          <div onClick={() => handleClose(null)} className='cursor-pointer'>
            <Close />
          </div>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='grid grid-cols-1 gap-4'
        >
          <Controller
            name='count'
            control={control}
            rules={{
              required: 'Обязательное поле',
            }}
            defaultValue={''}
            render={({ field, fieldState }) => (
              <TextField
                disabled={status === 'loading'}
                fullWidth
                type='number'
                label='Количество'
                helperText={
                  (typeof errors.count?.message === 'string' &&
                    errors.count?.message) ||
                  fieldState.error?.message
                }
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

export default EditOrderItemOrder;
