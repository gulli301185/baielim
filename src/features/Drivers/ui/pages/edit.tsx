import { showPickedImage } from '@/shared/utils/helpers/showPickedImage';
import TextField from '@mui/material/TextField';
import DeleteOutline from '@mui/icons-material/DeleteOutline';
import { Controller } from 'react-hook-form';
import useEditDriverService from '../../model/useEditDriverService';
import { Loader } from '@/widgets';

const EditDriver = () => {
  const {
    errors,
    values,
    control,
    loading,
    onSubmit,
    isLoading,
    imgForShow,
    handleSubmit,
    setImgForShow,
    handleRemoveImage,
  } = useEditDriverService();

  if (isLoading || loading === 'loading') return <Loader />;

  return (
    <form className='w-full h-full' onSubmit={handleSubmit(onSubmit)}>
      <div className='flex justify-between items-center mb-4'>
        <h1 className='text-xl font-bold py-[5.5px]'>Редактировать водителя</h1>
        <button type='submit' className='elim_button w-[20%]'>
          Сохранить
        </button>
      </div>
      <div className='grid grid-cols-2 gap-4'>
        <Controller
          name='name'
          control={control}
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
              label='ФИО'
              error={!!fieldState.error || !!errors.name}
              helperText={
                (typeof errors.name?.message === 'string' &&
                  errors.name?.message) ||
                fieldState.error?.message
              }
              {...field}
            />
          )}
        />
        <Controller
          name='login'
          control={control}
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
              label='Логин'
              error={!!fieldState.error || !!errors.login}
              helperText={
                (typeof errors.login?.message === 'string' &&
                  errors.login?.message) ||
                fieldState.error?.message
              }
              {...field}
            />
          )}
        />
        <Controller
          name='phoneNumber'
          control={control}
          rules={{
            required: false,
            maxLength: {
              value: 200,
              message: 'Должно быть не более 200 символов.',
            },
          }}
          render={({ field, fieldState }) => (
            <TextField
              fullWidth
              className='col-span-2'
              type='number'
              label='Номер телефона'
              error={!!fieldState.error || !!errors.phoneNumber}
              helperText={
                (typeof errors.phoneNumber?.message === 'string' &&
                  errors.phoneNumber?.message) ||
                fieldState.error?.message
              }
              {...field}
            />
          )}
        />
        <div className='col-span-2 grid gap-4'>
          <span className='text-base text-red-500 font-medium'>
            Пожалуйста, обратите внимание, что максимальный размер фото для
            загрузки составляет 100 МБ
          </span>
          <div className='w-1/2 flex flex-col gap-4'>
            <Controller
              name='photo'
              control={control}
              rules={{ required: false }}
              render={({ field: { onChange } }) => (
                <label
                  htmlFor='photo'
                  className='w-full text-base elim_button tp-center cursor-pointer'
                >
                  <input
                    id='photo'
                    type='file'
                    className='hidden'
                    accept='.jpeg, .jpg, .png'
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      if (!e.currentTarget.files) return;
                      onChange(e.currentTarget.files[0]);
                      showPickedImage({ e, func: setImgForShow });
                    }}
                  />
                  {values.photo ? 'Обновить аватар' : 'Загрузить аватар'}
                </label>
              )}
            />
            {imgForShow || values.photo ? (
              <div className='w-full max-h-[450px] h-full relative'>
                <span
                  onClick={handleRemoveImage}
                  className='absolute right-0 cursor-pointer'
                >
                  <DeleteOutline className='!text-4xl text-red-500' />
                </span>
                <img
                  className='h-full'
                  src={imgForShow || values.photo}
                  alt={values.title}
                />
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </form>
  );
};

export default EditDriver;
