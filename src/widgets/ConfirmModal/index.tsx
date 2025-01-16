import Modal from '@mui/material/Modal';

type Props = {
  open: boolean;
  onClose: () => void;
  text: string;
  onAccept: () => void;
};

const ConfirmModal = ({ open, onClose, text, onAccept }: Props) => {
  return (
    <Modal open={open} onClose={onClose}>
      <div className='w-full h-full tp-center'>
        <div className='w-[450px] min-h-[184px] rounded-lg px-4 py-2 gap-4 flex items-center justify-center flex-col bg-white'>
          <span className='text-lg text-[#333] font-medium leading-6 text-center'>
            {text}
          </span>
          <div className='w-full grid grid-cols-2 gap-4'>
            <button onClick={onAccept} className='elim_button bg-green-500'>
              Подтвердить
            </button>
            <button onClick={onClose} className='elim_button bg-red-600'>
              Отмена
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmModal;
