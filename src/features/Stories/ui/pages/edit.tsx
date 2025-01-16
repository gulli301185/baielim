import useEditStoryService from '../../model/useEditStoryService';
import { Controller } from 'react-hook-form';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { showPickedImage } from '@/shared/utils/helpers/showPickedImage';
import DeleteOutline from '@mui/icons-material/DeleteOutline';
import { Loader } from '@/widgets';

const EditStory = () => {
  const {
    control,
    handleSubmit,
    onSubmit,
    isLoading,
    values,
    setImgForShow,
    imgForShow,
    loading,
    handleRemoveImage,
    errors,
  } = useEditStoryService();

  if (isLoading === 'loading' || loading) return <Loader />;

  return (
    <form className='w-full h-full' onSubmit={handleSubmit(onSubmit)}>
      <div className='flex justify-between items-center mb-4'>
        <h1 className='text-xl font-bold py-[5.5px]'>Редактировать сторис</h1>
        <button type='submit' className='elim_button w-[20%]'>
          Сохранить
        </button>
      </div>
      <div className='grid grid-cols-1 gap-4'>
        <Controller
          name='date'
          control={control}
          rules={{ required: false }}
          render={({ field: { value, onChange, ...fieldState } }) => (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                sx={{
                  width: '100%',
                }}
                label='Дата'
                minDate={dayjs('2024-04-01')}
                value={value ? dayjs(value) : null}
                onChange={(date) => {
                  onChange(date?.format('YYYY-MM-DD') || null);
                }}
                {...fieldState}
              />
            </LocalizationProvider>
          )}
        />
        <span className='text-sm text-red-500 font-medium'>
          Пожалуйста, обратите внимание, что максимальный размер фото для
          загрузки составляет 100 МБ
        </span>
        <Controller
          name='photo'
          control={control}
          rules={{ required: 'Обязательное поле' }}
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
              {values.photo ? 'Обновить фото' : 'Загрузить фото'}
            </label>
          )}
        />
        {errors.photo && typeof errors.photo.message === 'string' && (
          <p role='alert' className='text-[#ff0000] font-light text-sm'>
            {errors.photo?.message}
          </p>
        )}
        {imgForShow || values.photo ? (
          <div className='w-1/2 h-full relative'>
            <span
              onClick={handleRemoveImage}
              className='absolute right-0 cursor-pointer'
            >
              <DeleteOutline className='!text-4xl text-red-500' />
            </span>
            <img
              className='h-[450px]'
              src={imgForShow || values.photo}
              alt={values.date}
            />
          </div>
        ) : null}
      </div>
    </form>
  );
};

export default EditStory;
