import { Controller } from 'react-hook-form';
import useNewItemService from '../../model/useNewItemService';
import { showPickedImage } from '@/shared/utils/helpers/showPickedImage';
import DeleteOutline from '@mui/icons-material/DeleteOutline';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import { Loader } from '@/widgets';
import { CategoryAutocomplete } from '@/shared/utils/ui';

const NewItem = () => {
  const {
    errors,
    status,
    control,
    onSubmit,
    isLoading,
    imgForShow,
    handleSubmit,
    setImgForShow,
    costTypeQuery,
  } = useNewItemService();

  if (status === 'loading' || isLoading) return <Loader />;

  return (
    <>
      <form className='w-full h-full mb-80' onSubmit={handleSubmit(onSubmit)}>
        <div className='flex justify-between items-center mb-4'>
          <h1 className='text-xl font-bold py-[5.5px]'>Добавить товар</h1>
          <button type='submit' className='elim_button w-[20%]'>
            Сохранить
          </button>
        </div>
        <div className='grid grid-cols-2 gap-4'>
          <Controller
            name='name'
            control={control}
            defaultValue={''}
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
            name='costIn'
            control={control}
            defaultValue={''}
            rules={{
              required: false,
            }}
            render={({ field }) => (
              <TextField
                fullWidth
                type='number'
                label='Внутренние расходы'
                {...field}
              />
            )}
          />
          <Controller
            name='quantity'
            control={control}
            defaultValue={''}
            rules={{
              required: false,
            }}
            render={({ field }) => (
              <TextField
                fullWidth
                type='number'
                label='Количество'
                {...field}
              />
            )}
          />
          <Controller
            name='weight'
            control={control}
            defaultValue={''}
            rules={{
              required: false,
            }}
            render={({ field }) => (
              <TextField fullWidth type='number' label='Вес' {...field} />
            )}
          />
          <Controller
            name='code'
            control={control}
            defaultValue={''}
            rules={{
              required: false,
            }}
            render={({ field }) => (
              <TextField
                fullWidth
                type='string'
                label='Наименование код'
                {...field}
              />
            )}
          />
          <CategoryAutocomplete control={control} required={false} />
          <Controller
            name='author'
            control={control}
            rules={{ required: false }}
            render={({ field }) => (
              <FormControl
                id='author-label'
                className='w-full col-span-2'
                variant='outlined'
              >
                <InputLabel>Выберите автора</InputLabel>
                <Select
                  labelId='author-label'
                  className='hello_input'
                  MenuProps={{
                    PaperProps: {
                      style: {
                        maxHeight: 48 * 4.5 + 8,
                        width: 250,
                      },
                    },
                  }}
                  label={'Выберите автора'}
                  {...field}
                >
                  <MenuItem value='Органик'>Органик</MenuItem>
                  <MenuItem value='Бай Элим'>Бай Элим</MenuItem>
                </Select>
              </FormControl>
            )}
          />
          <div className='w-full flex flex-col gap-2'>
            Цены:
            <div className='grid gap-4'>
              {costTypeQuery.data?.length ? (
                costTypeQuery.data.map((costType) => (
                  <div
                    className='grid grid-cols-5 gap-2 items-end'
                    key={costType.id}
                  >
                    <span className='w-[90%] col-span-3 pb-3 border-b truncate'>
                      {costType.name}
                    </span>
                    <Controller
                      name={`cost-${costType.id}`}
                      control={control}
                      defaultValue={0}
                      rules={{
                        required: 'Обязательное поле',
                      }}
                      render={({ field, fieldState }) => (
                        <TextField
                          {...field}
                          name={`cost-${costType.id}`}
                          placeholder='Цена'
                          label='Цена'
                          error={
                            !!fieldState.error ||
                            !!errors[`cost-${costType.id}`]
                          }
                        />
                      )}
                    />
                    <Controller
                      name={`bonus-${costType.id}`}
                      control={control}
                      defaultValue={0}
                      rules={{
                        required: false,
                      }}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          name={`bonus-${costType.id}`}
                          placeholder='Бонус'
                          label='Бонус'
                        />
                      )}
                    />
                  </div>
                ))
              ) : (
                <p>Ничего не найдено</p>
              )}
            </div>
          </div>
          <div className='w-full flex flex-col gap-4'>
            <span className='text-base text-red-500 font-medium'>
              Пожалуйста, обратите внимание, что максимальный размер фото для
              загрузки составляет 100 МБ
            </span>
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
    </>
  );
};

export default NewItem;
