import {
  AgentAutocomplete,
  CostTypeAutocomplete,
  RegionAutocomplete,
} from '@/shared/utils/ui';

import CheckOutlined from '@mui/icons-material/CheckOutlined';
import { Controller } from 'react-hook-form';
import DeleteOutline from '@mui/icons-material/DeleteOutline';
import { Loader } from '@/widgets';
import TextField from '@mui/material/TextField';
import { showPickedImage } from '@/shared/utils/helpers/showPickedImage';
import useEditStoreService from '../../model/useEditStoreService';

const EditStore = () => {
  const {
    errors,
    values,
    remove,
    control,
    loading,
    onSubmit,
    isLoadingA,
    imgForShow,
    handleSubmit,
    selectedFiles,
    setImgForShow,
    handleRemoveFile,
    setSelectedFiles,
    handleRemoveImage,
  } = useEditStoreService();

  if (loading === 'loading' || isLoadingA) return <Loader />;

  return (
    <form className='w-full h-full mb-80' onSubmit={handleSubmit(onSubmit)}>
      <div className='flex justify-between items-center mb-4'>
        <h1 className='text-xl font-bold py-[5.5px]'>Редактировать магазин</h1>
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
        <AgentAutocomplete
          control={control}
          required={'Обязательное поле'}
          name={'store_agent'}
        />
        <RegionAutocomplete control={control} required={'Обязательное поле'} />
        <Controller
          name='address'
          control={control}
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
          name='contactName'
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
              type='number'
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
          name='area'
          control={control}
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
          col={'col-span-2'}
          required={false}
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
            {!!values.documents?.length && (
              <div className='grid grid-cols-1 gap-2'>
                {values.documents.map((file: string, index: number) => (
                  <div
                    key={index}
                    className='w-full flex justify-between bg-slate-200 rounded p-2'
                  >
                    <span key={index} className='w-[90%] col-span-3'>
                      {index + 1}) {file}
                    </span>
                    <DeleteOutline
                      onClick={() => remove(index)}
                      className='text-red-500 cursor-pointer'
                    />
                  </div>
                ))}
              </div>
            )}
            {!!selectedFiles.length && (
              <>
                Новый документы:
                <div className='grid grid-cols-1 gap-2'>
                  {selectedFiles.map((file, index) => (
                    <div
                      key={index}
                      className='w-full flex justify-between items-center bg-slate-200 rounded p-2'
                    >
                      <span key={index} className='w-[90%] col-span-3'>
                        <CheckOutlined className='!text-4xl text-green-500' />{' '}
                        {file.name}
                      </span>
                      <DeleteOutline
                        onClick={() => handleRemoveFile(index)}
                        className='text-red-500 cursor-pointer'
                      />
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
          <div className='w-full flex flex-col gap-4'>
            <Controller
              name='photo'
              control={control}
              rules={{ required: false }}
              render={({ field: { onChange } }) => (
                <label
                  htmlFor='img'
                  className='w-full text-base elim_button tp-center cursor-pointer'
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
            {imgForShow || values.photo ? (
              <div className='w-full h-full relative'>
                <span
                  onClick={handleRemoveImage}
                  className='absolute right-0 cursor-pointer'
                >
                  <DeleteOutline className='!text-4xl text-red-500' />
                </span>
                <img
                  className='h-[450px]'
                  src={imgForShow || values.photo}
                  alt={values.name}
                />
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </form>
  );
};

export default EditStore;
