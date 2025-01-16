import { Loader } from '@/widgets';
import { Controller } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import DeleteOutline from '@mui/icons-material/DeleteOutline';
import { showPickedImage } from '@/shared/utils/helpers/showPickedImage';
import useNewCategoryService from '../model/useNewCategoryService';

const NewCategory = () => {
  const {
    errors,
    control,
    loading,
    onSubmit,
    isLoading,
    imgForShow,
    setImgForShow,
    handleSubmit,
  } = useNewCategoryService();

  if (isLoading || loading === 'loading') return <Loader />;

  return (
    <form className='w-full h-full' onSubmit={handleSubmit(onSubmit)}>
      <div className='flex justify-between items-center mb-4'>
        <h1 className='text-xl font-bold py-[5.5px]'>Добавить категорию</h1>
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
        <Controller
          name='nameKg'
          control={control}
          defaultValue=''
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
              type='text'
              label='Аталышы'
              helperText={
                (typeof errors.nameKg?.message === 'string' &&
                  errors.nameKg?.message) ||
                fieldState.error?.message
              }
              error={!!fieldState.error}
              {...field}
            />
          )}
        />
        <Controller
          name='nameEn'
          control={control}
          defaultValue=''
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
              type='text'
              label='Name'
              helperText={
                (typeof errors.nameEn?.message === 'string' &&
                  errors.nameEn?.message) ||
                fieldState.error?.message
              }
              error={!!fieldState.error}
              {...field}
            />
          )}
        />
        <span className='text-base text-red-500 font-medium'>
          Пожалуйста, обратите внимание, что максимальный размер фото для
          загрузки составляет 100 МБ
        </span>
        <Controller
          name='icon'
          control={control}
          defaultValue=''
          rules={{ required: false }}
          render={({ field: { onChange } }) => (
            <label
              htmlFor='img'
              className='w-1/2 text-base elim_button tp-center cursor-pointer'
            >
              <input
                id='img'
                type='file'
                className='hidden'
                accept='.jpeg, .jpg, .png'
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  if (!e.currentTarget.files) return;
                  onChange(e.currentTarget.files[0]);
                  showPickedImage({ e, func: setImgForShow });
                }}
              />
              Загрузить иконку
            </label>
          )}
        />
        {imgForShow ? (
          <div className='w-1/2 max-h-[450px] h-full relative'>
            <span
              onClick={() => setImgForShow('')}
              className='absolute right-0 cursor-pointer'
            >
              <DeleteOutline className='!text-4xl text-red-500' />
            </span>
            <img className='h-full' src={imgForShow} alt='IMAGE' />
          </div>
        ) : null}
      </div>
    </form>
  );
};

export default NewCategory;
