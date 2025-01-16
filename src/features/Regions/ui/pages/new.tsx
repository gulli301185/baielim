import { Loader } from '@/widgets';
import { Controller } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import useNewRegionService from '../../model/useNewRegionService';

const NewRegion = () => {
  const { errors, control, loading, onSubmit, isLoading, handleSubmit } =
    useNewRegionService();

  if (isLoading || loading === 'loading') return <Loader />;

  return (
    <form className='w-full h-full' onSubmit={handleSubmit(onSubmit)}>
      <div className='flex justify-between items-center mb-4'>
        <h1 className='text-xl font-bold py-[5.5px]'>Добавить регион</h1>
        <button type='submit' className='elim_button w-[20%]'>
          Сохранить
        </button>
      </div>
      <div className='grid grid-cols-1 gap-4'>
        <Controller
          name='name'
          control={control}
          defaultValue=''
          rules={{
            required: 'Обязательное поле',
            minLength: {
              value: 1,
              message: 'Должно быть не менее 1 символа.',
            },
            maxLength: {
              value: 200,
              message: 'Должно быть не более 200 символов.',
            },
          }}
          render={({ field, fieldState }) => (
            <TextField
              fullWidth
              type='text'
              label='Название'
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

export default NewRegion;
