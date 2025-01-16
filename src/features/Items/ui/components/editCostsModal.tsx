import Close from '@mui/icons-material/Close';
import CircularProgress from '@mui/material/CircularProgress';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import { Controller } from 'react-hook-form';
import useEditCostService from '../../model/useEditCostService';

type Props = {
  open: { id: number; index: number } | null;
  handleClose: (params: { id: number; index: number } | null) => void;
  setOldCosts: any;
};

const EditCostsModal = ({ open, handleClose, setOldCosts }: Props) => {
  const { status, control, onSubmit, handleSubmit } = useEditCostService({
    handleClose,
    setOldCosts,
    open,
  });

  return (
    <Modal open={!!open} onClose={() => handleClose(null)}>
      <div className='absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[60%] sm:w-full min-h-[200px] bg-[#FAFBFD] p-4 rounded-lg flex flex-col gap-6 outline-none'>
        <div className='w-full flex justify-between items-center'>
          <p className='text-lg text-[#333] font-semibold'>
            Редактировать цену
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
            disabled={status === 'loading'}
            name='cost'
            control={control}
            defaultValue={''}
            rules={{ required: false }}
            render={({ field, fieldState }) => (
              <TextField
                fullWidth
                type='number'
                label='Цена'
                error={!!fieldState?.error}
                {...field}
              />
            )}
          />
          <Controller
            disabled={status === 'loading'}
            name='bonusAmount'
            control={control}
            rules={{
              required: false,
            }}
            defaultValue={''}
            render={({ field }) => (
              <TextField
                {...field}
                name='bonusAmount'
                placeholder='Бонус'
                label='Бонус'
              />
            )}
          />
          <button
            type='submit'
            className='elim_button mt-5'
            disabled={status === 'loading'}
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

export default EditCostsModal;
