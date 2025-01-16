import { Error, Loader } from '@/widgets';
import { NavLink } from 'react-router-dom';
import useDetailFAQService from '../model/useDetailFAQService';
import ConfirmModal from '@/widgets/ConfirmModal';

const DetailFAQ = () => {
  const {
    data,
    open,
    isError,
    loading,
    isLoading,
    isFetching,
    handleClose,
    handleDeleteFAQ,
  } = useDetailFAQService();

  if (isFetching || isLoading || loading) return <Loader />;
  if (isError) return <Error />;

  return (
    <div className='w-full h-full'>
      <h1 className='text-xl font-bold pb-4'>Подробная информация о FAQ:</h1>
      <div className='flex mt-3'>
        <div className='w-[80%]'>
          <div className='border border-gray-300'>
            <div className='w-full flex flex-col border-gray-300'>
              <div className='flex border-slate-300 border-b p-3'>
                <div className='text-base opacity-60'>Приоритет:</div>
                <div className='text-base font-medium ml-2 break-all'>
                  {data?.priority}
                </div>
              </div>
              <div className='flex border-slate-300 p-3'>
                <div className='text-base opacity-60'>Вопрос:</div>
                <div className='text-base font-medium ml-2 break-all'>
                  {data?.question}
                </div>
              </div>
              <div className='flex border-slate-300 border-t p-3'>
                <div className='text-base opacity-60'>Ответ:</div>
                <div className='text-base font-medium ml-2 break-all'>
                  {data?.answer}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='w-[20%] flex flex-col items-end ml-3'>
          <NavLink
            to='edit'
            className='border w-full text-center px-3 py-2 text-xs lg:text-base rounded-md mb-2 bg-green-500 text-white'
          >
            Редактировать
          </NavLink>
          <button
            onClick={handleClose}
            className='border w-full text-center px-3 py-2 text-xs lg:text-base rounded-md mb-2 bg-red-500 text-white'
          >
            Удалить
          </button>
        </div>
      </div>
      {open && (
        <ConfirmModal
          open={open}
          onClose={handleClose}
          text={'Вы уверены, что хотите удалить FAQ'}
          onAccept={() => {
            handleDeleteFAQ();
            handleClose();
          }}
        />
      )}
    </div>
  );
};

export default DetailFAQ;
