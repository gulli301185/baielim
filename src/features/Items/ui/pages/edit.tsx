import { Loader } from '@/widgets';
import useEditItemService from '../../model/useEditItemService';
import { Controller } from 'react-hook-form';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import DeleteOutline from '@mui/icons-material/DeleteOutline';
import EditOutlined from '@mui/icons-material/EditOutlined';
import { showPickedImage } from '@/shared/utils/helpers/showPickedImage';
import { ICosts } from '@/shared/types';
import EditCostsModal from '../components/editCostsModal';
import { CategoryAutocomplete } from '@/shared/utils/ui';

const EditItem = () => {
  const {
    open,
    values,
    errors,
    control,
    loading,
    oldCosts,
    onSubmit,
    isLoading,
    imgForShow,
    setOldCosts,
    handleClose,
    handleSubmit,
    setImgForShow,
    costTypeQuery,
    handleRemoveImage,
  } = useEditItemService();

  if (loading === 'loading' || isLoading) return <Loader />;

  return (
    <>
      <form className='w-full h-full' onSubmit={handleSubmit(onSubmit)}>
        <div className='flex justify-between items-center mb-4'>
          <h1 className='text-xl font-bold py-[5.5px]'>Редактировать товар</h1>
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
            name='costIn'
            control={control}
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
            rules={{
              required: false,
            }}
            render={({ field }) => (
              <TextField fullWidth type='number' label='Вес' {...field} />
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
                className='w-full'
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
              {oldCosts?.length &&
                oldCosts.map((cost: ICosts, index: number) => (
                  <div
                    className='grid grid-cols-9 items-center gap-4'
                    key={cost.id}
                  >
                    <span className='col-span-4 truncate'>
                      {cost?.costType?.name}
                    </span>
                    <TextField
                      className='col-span-2'
                      disabled
                      value={cost.cost}
                      placeholder='Цена'
                      label='Цена'
                    />
                    <TextField
                      className='col-span-2'
                      disabled
                      value={cost.bonusAmount}
                      placeholder='Бонус'
                      label='Бонус'
                    />
                    <div className='w-full flex justify-center'>
                      <IconButton
                        className='close-btn'
                        onClick={() => handleClose({ id: cost.id, index })}
                      >
                        <EditOutlined className='text-blue-500 !text-3xl' />
                      </IconButton>
                    </div>
                  </div>
                ))}
              <hr />
              {costTypeQuery.data?.length ? (
                costTypeQuery.data
                  .filter(
                    (costType) => !values.costTypes?.includes(costType.id)
                  )
                  .map((costType) => (
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
          <div className='flex flex-col gap-4'>
            <span className='text-sm text-red-500 font-medium'>
              Пожалуйста, обратите внимание, что максимальный размер фото для
              загрузки составляет 100 МБ
            </span>
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
      </form>
      {open && (
        <EditCostsModal
          open={open}
          handleClose={handleClose}
          setOldCosts={setOldCosts}
        />
      )}
    </>
  );
};

export default EditItem;
