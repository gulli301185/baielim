import { Loader } from '@/widgets';
import TextField from '@mui/material/TextField';
import { Controller } from 'react-hook-form';
import useEditFAQService from '../model/useEditFAQService';

const EditFAQ = () => {
  const { isLoading, control, loading, handleSubmit, onSubmit, errors } =
    useEditFAQService();

  if (loading === 'loading' || isLoading) return <Loader />;

  return (
    <form className='w-full h-full' onSubmit={handleSubmit(onSubmit)}>
      <div className='flex justify-between items-center mb-4'>
        <h1 className='text-xl font-bold py-[5.5px]'>
          Редактировать категорию
        </h1>
        <button type='submit' className='elim_button w-[20%]'>
          Сохранить
        </button>
      </div>
      <div className='grid grid-cols-1 gap-4'>
        <Controller
          name='priority'
          control={control}
          rules={{
            required: false,
          }}
          render={({ field }) => (
            <TextField fullWidth type='number' label='Приоритет' {...field} />
          )}
        />
        <Controller
          name='question'
          control={control}
          rules={{
            required: 'Обязательное поле',
            minLength: {
              value: 1,
              message: 'Должно быть не менее 1 символа.',
            },
          }}
          render={({ field, fieldState }) => (
            <TextField
              fullWidth
              multiline
              rows={4}
              type='string'
              label='Вопрос'
              helperText={
                (typeof errors.name?.message === 'string' &&
                  errors.name?.message) ||
                fieldState.error?.message
              }
              error={!!fieldState.error}
              {...field}
            />
          )}
        />
        <Controller
          name='answer'
          control={control}
          rules={{
            required: 'Обязательное поле',
            minLength: {
              value: 1,
              message: 'Должно быть не менее 1 символа.',
            },
          }}
          render={({ field, fieldState }) => (
            <TextField
              fullWidth
              multiline
              rows={4}
              type='string'
              label='Ответ'
              helperText={
                (typeof errors.name?.message === 'string' &&
                  errors.name?.message) ||
                fieldState.error?.message
              }
              error={!!fieldState.error}
              {...field}
            />
          )}
        />
      </div>
    </form>
  );
};

export default EditFAQ;
