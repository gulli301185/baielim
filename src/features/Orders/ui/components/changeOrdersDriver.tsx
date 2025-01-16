import { GridRowSelectionModel } from '@mui/x-data-grid';
import useChangeOrdersDriver from '../../model/useChangeOrdersDriver';
import { DriverAutocomplete } from '@/shared/utils/ui';
import CircularProgress from '@mui/material/CircularProgress';
import Modal from '@mui/material/Modal';
import Close from '@mui/icons-material/Close';

type Props = {
  open: boolean;
  handleClose: () => void;
  getNewOrders: ({}: any) => void;
  rowSelectionModel: GridRowSelectionModel;
};

const ChangeOrdersDriver = ({
  open,
  handleClose,
  getNewOrders,
  rowSelectionModel,
}: Props) => {
  const { status, control, onSubmit, handleSubmit } = useChangeOrdersDriver({
    rowSelectionModel,
    handleClose,
    getNewOrders,
  });

  return (
    <Modal open={open} onClose={handleClose}>
      <div className='absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[60%] sm:w-full min-h-[200px] bg-[#FAFBFD] p-4 rounded-lg flex flex-col gap-6 outline-none'>
        <div className='w-full flex justify-between items-center'>
          <p className='text-lg text-[#333] font-semibold'>Поменять водителя</p>
          <div onClick={handleClose} className='cursor-pointer'>
            <Close />
          </div>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='grid grid-cols-1 gap-4'
        >
          <DriverAutocomplete
            control={control}
            required={'Обязательное поле'}
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

export default ChangeOrdersDriver;
