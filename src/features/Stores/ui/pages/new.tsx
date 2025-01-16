import {
  AgentAutocomplete,
  CostTypeAutocomplete,
  RegionAutocomplete,
} from '@/shared/utils/ui';

import { Controller } from 'react-hook-form';
import DeleteOutline from '@mui/icons-material/DeleteOutline';
import { Loader } from '@/widgets';
import TextField from '@mui/material/TextField';
import { showPickedImage } from '@/shared/utils/helpers/showPickedImage';
import useNewStoreService from '../../model/useNewStoreService';

const NewStore = () => {
  const {
    errors,
    loading,
    control,
    onSubmit,
    isLoadingA,
    imgForShow,
    handleSubmit,
    setImgForShow,
    selectedFiles,
    setSelectedFiles,
  } = useNewStoreService();

  if (isLoadingA || loading === 'loading') return <Loader />;

  return (
    <form className='w-full h-full mb-80' onSubmit={handleSubmit(onSubmit)}>
      <div className='flex justify-between items-center mb-4'>
        <h1 className='text-xl font-bold py-[5.5px]'>Добавить магазин</h1>
        <button type='submit' className='elim_button w-[20%]'>
          Сохранить
        </button>
      </div>
      <div className='grid grid-cols-2 gap-4'>
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
          name='password'
          control={control}
          defaultValue=''
          rules={{
            required: 'Обязательное поле',
            minLength: {
              value: 1,
              message: 'Должно быть не менее 1 символа.',
            },
            maxLength: {
              value: 128,
              message: 'Должно быть не более 128 символов.',
            },
          }}
          render={({ field, fieldState }) => (
            <TextField
              fullWidth
              type='text'
              label='Пароль'
              error={!!fieldState.error || !!errors.password}
              helperText={
                (typeof errors.password?.message === 'string' &&
                  errors.password?.message) ||
                fieldState.error?.message
              }
              {...field}
            />
          )}
        />
        <AgentAutocomplete
          control={control}
          required={'Обязательное поле'}
          name={'store_agent'}
        />
        <RegionAutocomplete control={control} required={'Обязательное поле'} />
        <Controller
          name='contactName'
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
              type='string'
              label='ФИО'
              error={!!fieldState.error || !!errors.contactName}
              helperText={
                (typeof errors.contactName?.message === 'string' &&
                  errors.contactName?.message) ||
                fieldState.error?.message
              }
              {...field}
            />
          )}
        />
        <Controller
          name='phoneNumber'
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
              type='string'
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
        <Controller
          name='address'
          control={control}
          defaultValue=''
          rules={{
            required: 'Обязательное поле',
            maxLength: {
              value: 200,
              message: 'Должно быть не более 200 символов.',
            },
          }}
          render={({ field, fieldState }) => (
            <TextField
              fullWidth
              type='text'
              label='Адрес'
              error={!!fieldState.error || !!errors.address}
              helperText={
                (typeof errors.address?.message === 'string' &&
                  errors.address?.message) ||
                fieldState.error?.message
              }
              {...field}
            />
          )}
        />
        <Controller
          name='area'
          control={control}
          defaultValue=''
          rules={{ required: 'Обязательное поле' }}
          render={({ field, fieldState }) => (
            <TextField
              fullWidth
              type='number'
              label='Площадь'
              error={!!fieldState.error || !!errors.area}
              helperText={
                (typeof errors.area?.message === 'string' &&
                  errors.area?.message) ||
                fieldState.error?.message
              }
              {...field}
            />
          )}
        />
        <CostTypeAutocomplete
          control={control}
          required={'Обязательное поле'}
        />
        <div className='w-full col-span-2'>
          <p className='text-base text-red-500 font-medium'>
            Не знаете координаты (Latitude и Longitude) вашего магазина? Узнайте
            их на
            <a
              href='https://www.latlong.net/'
              target='_blank'
              className='ml-2 text-blue-500 underline'
            >
              latlong.net
            </a>
          </p>
        </div>
        <Controller
          name='lat'
          control={control}
          defaultValue={''}
          rules={{
            required: 'Обязательное поле',
          }}
          render={({ field, fieldState }) => (
            <TextField
              fullWidth
              type='number'
              label='Latitude'
              error={!!fieldState.error || !!errors.lat}
              helperText={
                (typeof errors.lat?.message === 'string' &&
                  errors.lat?.message) ||
                fieldState.error?.message
              }
              {...field}
            />
          )}
        />
        <Controller
          name='lon'
          control={control}
          defaultValue={''}
          rules={{
            required: 'Обязательное поле',
          }}
          render={({ field, fieldState }) => (
            <TextField
              fullWidth
              type='number'
              label='Longitude'
              error={!!fieldState.error || !!errors.lon}
              helperText={
                (typeof errors.lon?.message === 'string' &&
                  errors.lon?.message) ||
                fieldState.error?.message
              }
              {...field}
            />
          )}
        />
        <span className='col-span-2 text-base text-red-500 font-medium'>
          Пожалуйста, обратите внимание, что максимальный размер фото для
          загрузки составляет 100 МБ
        </span>
        <div className='w-full h-full grid grid-cols-2 col-span-2 gap-4'>
          <div className='flex flex-col gap-4'>
            <label
              htmlFor='documents'
              className='w-full text-base elim_button tp-center cursor-pointer'
            >
              <input
                id='documents'
                type='file'
                multiple
                className='hidden'
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  if (!e.currentTarget.files) return;
                  const newFiles = Array.from(e.currentTarget.files);
                  setSelectedFiles((prevFiles) => [...prevFiles, ...newFiles]);
                }}
              />
              Загрузите документы
            </label>
            Документы:
            {!!selectedFiles.length && (
              <div className='grid grid-cols-2 gap-2'>
                {selectedFiles.map((file, index) => (
                  <span key={index}>
                    {index + 1}) {file.name}
                  </span>
                ))}
              </div>
            )}
          </div>
          <div className='w-full flex flex-col gap-4'>
            <Controller
              name='photo'
              control={control}
              defaultValue=''
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
                  Загрузить фото
                </label>
              )}
            />
            {imgForShow ? (
              <div className='w-full h-full relative'>
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
        </div>
      </div>
    </form>
  );
};

export default NewStore;
