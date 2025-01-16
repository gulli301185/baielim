import Autocomplete from '@mui/material/Autocomplete';
import Chip from '@mui/material/Chip';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import TextField from '@mui/material/TextField';
import DeleteOutline from '@mui/icons-material/DeleteOutline';
import { Controller } from 'react-hook-form';
import useNewNewOrderService from '../../model/useNewNewOrderService';
import { showPickedImage } from '@/shared/utils/helpers/showPickedImage';
import { Loader } from '@/widgets';
import { handleScroll } from '@/shared/utils/helpers/autocompleteScroll';
import {
  AgentAutocomplete,
  DriverAutocomplete,
  StoreAutocomplete,
} from '@/shared/utils/ui';

const NewNewOrder = () => {
  const {
    items,
    errors,
    values,
    status,
    control,
    totalSum,
    onSubmit,
    itemsPage,
    imgForShow,
    itemsQuery,
    countOrders,
    setItemsPage,
    handleSubmit,
    selectedItems,
    setImgForShow,
    handleInputChange,
    handleCountChange,
    handleAutocompleteChange,
  } = useNewNewOrderService();

  if (status === 'loading') return <Loader />;

  return (
    <form className='w-full h-full mb-20' onSubmit={handleSubmit(onSubmit)}>
      <div className='flex justify-between items-center mb-4'>
        <h1 className='text-xl font-bold py-[5.5px]'>Добавить заказ</h1>
        <button type='submit' className='elim_button w-[20%]'>
          Сохранить
        </button>
      </div>
      <div className='grid grid-cols-2 gap-4'>
        <AgentAutocomplete control={control} required={'Обязательное поле'} />
        <DriverAutocomplete control={control} required={'Обязательное поле'} />
        <StoreAutocomplete
          control={control}
          countOrders={countOrders}
          required={'Обязательное поле'}
        />
        <Controller
          name='items'
          control={control}
          rules={{ required: 'Обязательное поле' }}
          defaultValue={[]}
          render={({ field, fieldState }) => (
            <FormControl>
              <Autocomplete
                multiple
                disabled={itemsQuery.isError}
                loading={itemsQuery.isFetching || itemsQuery.isLoading}
                noOptionsText={'Ничего не найдено'}
                disableCloseOnSelect={true}
                options={
                  items.map((item: any) => {
                    const hasValidCostType = item.costs?.find(
                      (cost: any) =>
                        cost.costType?.id === values.store?.storeCostType
                    );

                    return {
                      label: item.name,
                      id: item.id,
                      cost: hasValidCostType?.cost || 0,
                      count: 1,
                      quantity: item.quantity,
                      totalCost: hasValidCostType?.cost || 0,
                      disabled: !item.costs?.length || !hasValidCostType,
                    };
                  }) || []
                }
                ListboxProps={{
                  onScroll: (event) =>
                    handleScroll({
                      page: itemsPage,
                      event,
                      setPage: setItemsPage,
                      dataQuery: itemsQuery,
                    }),
                }}
                onInputChange={(_, val) => {
                  handleInputChange(val);
                }}
                getOptionLabel={(option) => option.label}
                isOptionEqualToValue={(option, value) =>
                  option?.id === value?.id && option?.label === value?.label
                }
                getOptionDisabled={(option) => option.disabled}
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
                {...field}
                onChange={handleAutocompleteChange}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    value={params.inputProps.value || ''}
                    placeholder={'Выберите товар'}
                    label={'Выберите товар'}
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
        <Controller
          name='weight'
          control={control}
          defaultValue={''}
          rules={{
            required: 'Обязательное поле',
          }}
          render={({ field, fieldState }) => (
            <TextField
              className='col-start-1 col-end-3'
              fullWidth
              type='number'
              label='Укажите вес (кг)'
              error={!!fieldState.error || !!errors.weight}
              helperText={
                (typeof errors.weight?.message === 'string' &&
                  errors.weight?.message) ||
                fieldState.error?.message
              }
              {...field}
            />
          )}
        />
        {!!selectedItems.length && (
          <div className='grid col-span-2 gap-2 bg-slate-300 p-4 rounded-md'>
            {selectedItems.map((item: any, index: number) => (
              <div key={index} className='grid grid-cols-3 gap-2'>
                <div className='col-span-2'>
                  <div className='flex gap-2'>
                    <span>{index + 1})</span>
                    <div className='flex flex-col'>
                      <p className='font-medium'>{item.label}</p>
                      <span>Общее количество товара: {item.quantity}</span>
                      <span>Стоимость продажи: {item.cost}</span>
                      <span>
                        Сумма: {item.count} * {item.cost} = {item.totalCost}
                      </span>
                    </div>
                  </div>
                </div>
                <TextField
                  name='count'
                  type='number'
                  defaultValue={1}
                  placeholder='Количество'
                  label='Количество'
                  onChange={(e) =>
                    handleCountChange(item.id, parseInt(e.target.value, 10))
                  }
                />
              </div>
            ))}
            <div className='w-full flex justify-end'>
              <span className='font-bold'>Общая сумма: {totalSum}</span>
            </div>
          </div>
        )}
        <div className='w-full col-span-2'>
          <p className='text-base text-red-500 font-medium'>
            Не знаете координаты (Latitude и Longitude)? Узнайте их на
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
        <Controller
          name='comment'
          control={control}
          defaultValue={''}
          rules={{ required: false }}
          render={({ field, fieldState }) => (
            <TextField
              fullWidth
              multiline
              rows={4}
              type='string'
              label='Комментарий'
              error={!!fieldState?.error}
              {...field}
            />
          )}
        />
        <div className='w-full h-full flex flex-col gap-4'>
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
  );
};

export default NewNewOrder;
