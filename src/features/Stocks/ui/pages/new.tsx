import TextField from '@mui/material/TextField';
import DeleteOutline from '@mui/icons-material/DeleteOutline';
import useNewStockService from '../../model/useNewStockService';
import { Controller } from 'react-hook-form';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { showPickedImage } from '@/shared/utils/helpers/showPickedImage';
import { Loader } from '@/widgets';

const NewStock = () => {
  const {
    control,
    handleSubmit,
    onSubmit,
    setImgForShow,
    imgForShow,
    isLoading,
  } = useNewStockService();

  if (isLoading) return <Loader />;

  return (
    <form className='w-full h-full' onSubmit={handleSubmit(onSubmit)}>
      <div className='flex justify-between items-center mb-4'>
        <h1 className='text-xl font-bold py-[5.5px]'>Добавить акцию</h1>
        <button type='submit' className='elim_button w-[20%]'>
          Сохранить
        </button>
      </div>
      <div className='grid grid-cols-1 gap-4'>
        <Controller
          name='title'
          control={control}
          defaultValue=''
          rules={{ required: true }}
          render={({ field, fieldState }) => (
            <TextField
              fullWidth
              type='text'
              label='Заголовок'
              error={!!fieldState.error}
              {...field}
            />
          )}
        />
        <Controller
          name='deadline'
          control={control}
          rules={{ required: false }}
          render={({ field: { value, onChange, ...fieldState } }) => (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                sx={{
                  width: '100%',
                }}
                label='Срок окончания'
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
        <Controller
          name='description'
          control={control}
          defaultValue=''
          rules={{ required: false }}
          render={({ field, fieldState }) => (
            <TextField
              fullWidth
              multiline
              rows={4}
              type='string'
              label='Описание'
              error={!!fieldState?.error}
              {...field}
            />
          )}
        />
        <span className='text-base text-red-500 font-medium'>
          Пожалуйста, обратите внимание, что максимальный размер фото для
          загрузки составляет 100 МБ
        </span>
        <Controller
          name='photo'
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
              Загрузить фото
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

export default NewStock;
