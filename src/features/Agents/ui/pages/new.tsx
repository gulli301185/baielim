import Autocomplete from '@mui/material/Autocomplete';
import Chip from '@mui/material/Chip';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import TextField from '@mui/material/TextField';

import { Controller } from 'react-hook-form';
import useNewAgentService from '../../model/useNewAgentService';
import { Loader } from '@/widgets';
import CheckOutlined from '@mui/icons-material/CheckOutlined';
import DeleteOutline from '@mui/icons-material/DeleteOutline';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { showPickedImage } from '@/shared/utils/helpers/showPickedImage';

const NewAgent = () => {
  const {
    data,
    errors,
    status,
    values,
    control,
    onSubmit,
    isLoading,
    isSuccess,
    isLoadingA,
    imgForShow,
    isFetching,
    handleSubmit,
    setImgForShow,
  } = useNewAgentService();

  if (isLoadingA || status === 'loading') return <Loader />;

  return (
    <form className='w-full h-full' onSubmit={handleSubmit(onSubmit)}>
      <div className='flex justify-between items-center mb-4'>
        <h1 className='text-xl font-bold py-[5.5px]'>Добавить агента</h1>
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
        <Controller
          name='birthdate'
          control={control}
          rules={{ required: false }}
          render={({ field: { value, onChange, ...fieldState } }) => (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                sx={{
                  width: '100%',
                }}
                label='День рождения'
                minDate={dayjs('1940-04-01')}
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
          name='address'
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
        <Controller
          name='costTypes'
          control={control}
          rules={{ required: false }}
          defaultValue={[]}
          render={({ field: { onChange }, fieldState }) => (
            <FormControl>
              <Autocomplete
                multiple
                loading={isFetching || isLoading}
                noOptionsText={'Ничего не найдено'}
                options={
                  (isSuccess &&
                    data?.map((type) => ({
                      label: type.name,
                      id: type.id,
                    }))) ||
                  []
                }
                getOptionLabel={(option) => option.label}
                isOptionEqualToValue={(option, value) =>
                  option?.id === value?.id && option?.label === value?.label
                }
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip
                      variant='outlined'
                      {...getTagProps({ index })}
                      key={option.id}
                      label={option.label}
                    />
                  ))
                }
                onChange={(_, value) => {
                  onChange(value);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    value={params.inputProps.value || ''}
                    placeholder={'Типы продаж'}
                    label={'Типы продаж'}
                    error={!!fieldState?.error}
                  />
                )}
              />
              {fieldState?.error && (
                <FormHelperText error>
                  {fieldState?.error.message}
                </FormHelperText>
              )}
            </FormControl>
          )}
        />
        <span className='text-base text-red-500 font-medium'>
          Пожалуйста, обратите внимание, что максимальный размер фото для
          загрузки составляет 100 МБ
        </span>
        <div className='w-full h-full grid grid-cols-3 gap-4'>
          <div className='w-full flex flex-col gap-4'>
            <Controller
              name='passport_front'
              control={control}
              defaultValue=''
              rules={{ required: 'Обязательное поле' }}
              render={({ field: { onChange } }) => (
                <label
                  htmlFor='passport_front'
                  className='w-full text-base elim_button tp-center cursor-pointer'
                >
                  <input
                    id='passport_front'
                    type='file'
                    className='hidden'
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      if (!e.currentTarget.files) return;
                      onChange(e.currentTarget.files[0]);
                    }}
                  />
                  Загрузите фронтальную сторону паспорта
                </label>
              )}
            />
            {errors.passport_front &&
              typeof errors.passport_front.message === 'string' && (
                <p role='alert' className='text-[#ff0000] font-light text-sm'>
                  {errors.passport_front?.message}
                </p>
              )}
            {values.passport_front ? (
              <div className='w-full flex justify-start items-center gap-4'>
                <CheckOutlined className='!text-4xl text-green-500' />
                {values.passport_front.name}
              </div>
            ) : null}
          </div>
          <div className='w-full flex flex-col gap-4'>
            <Controller
              name='passport_back'
              control={control}
              defaultValue=''
              rules={{ required: 'Обязательное поле' }}
              render={({ field: { onChange } }) => (
                <label
                  htmlFor='passport_back'
                  className='w-full text-base elim_button tp-center cursor-pointer'
                >
                  <input
                    id='passport_back'
                    type='file'
                    className='hidden'
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      if (!e.currentTarget.files) return;
                      onChange(e.currentTarget.files[0]);
                    }}
                  />
                  Загрузите обратную сторону паспорта
                </label>
              )}
            />
            {errors.passport_back &&
              typeof errors.passport_back.message === 'string' && (
                <p role='alert' className='text-[#ff0000] font-light text-sm'>
                  {errors.passport_back?.message}
                </p>
              )}
            {values.passport_back ? (
              <div className='w-full flex justify-start items-center gap-4'>
                <CheckOutlined className='!text-4xl text-green-500' />
                {values.passport_back.name}
              </div>
            ) : null}
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
                  Загрузить аватар
                </label>
              )}
            />
            {imgForShow ? (
              <div className='w-full max-h-[450px] h-full relative'>
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

export default NewAgent;
