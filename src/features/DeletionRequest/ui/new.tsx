import useNewDeletionRequestService from '../model/useNewDeletionRequestService';
import CircularProgress from '@mui/material/CircularProgress';
import TextField from '@mui/material/TextField';
import { Controller } from 'react-hook-form';
import Elimlogo from '@/shared/assets/elim.svg';
import Shamallogo from '@/shared/assets/shamal.svg';

const NewDeletionRequest = ({ shamal = false }: { shamal?: boolean }) => {
  const { handleSubmit, control, onSubmit, status, errors } =
    useNewDeletionRequestService({ shamal });

  return (
    <div className='w-full h-full relative'>
      <div className='absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 md:max-w-[50%] w-full p-4 rounded-lg flex flex-col gap-6'>
        <div className='w-64 h-64 mx-auto mb-4'>
          <img
            className='rounded-xl mx-auto w-full h-full'
            src={shamal ? Shamallogo : Elimlogo}
            alt='*'
          />
        </div>
        <div className='w-full flex justify-between items-center'>
          <p className='text-lg text-[#333] font-semibold'>
            Запрос на удаление персональных данных
          </p>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='grid grid-cols-1 gap-4'
        >
          <p>
            Чтобы отправить запрос на удаление персональных данных, заполните
            форму ниже, и наши менеджеры свяжутся с вами в ближайшее время.
          </p>
          <Controller
            name='phone'
            control={control}
            rules={{ required: 'Обязательное поле' }}
            render={({ field, fieldState }) => (
              <TextField
                fullWidth
                type='number'
                label='Номер телефона'
                helperText={
                  (typeof errors.phone?.message === 'string' &&
                    errors.phone?.message) ||
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
              'Отправить'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewDeletionRequest;
