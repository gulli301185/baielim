import { Loader } from '@/widgets';
import useEditNewOrderService from '../../model/useEditNewOrderService';
import { Controller } from 'react-hook-form';
import Autocomplete from '@mui/material/Autocomplete';
import Chip from '@mui/material/Chip';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import DeleteOutlined from '@mui/icons-material/DeleteOutlined';
import EditOutlined from '@mui/icons-material/EditOutlined';
import { handleScroll } from '@/shared/utils/helpers/autocompleteScroll';
import EditOrderItemOrder from '../components/editOrderItemOrder';
import ConfirmModal from '@/widgets/ConfirmModal';
import { DriverAutocomplete } from '@/shared/utils/ui';

const EditNewOrder = () => {
  const {
    open,
    items,
    values,
    control,
    loading,
    onSubmit,
    totalSum,
    oldItems,
    itemsPage,
    removeItem,
    itemsQuery,
    setOldItems,
    handleClose,
    handleSubmit,
    setItemsPage,
    selectedItems,
    handleDeleteItem,
    handleRemoveItem,
    handleCountChange,
    handleInputChange,
    handleAutocompleteChange,
  } = useEditNewOrderService();

  if (loading === 'loading') return <Loader />;

  return (
    <>
      <form className='w-full h-full mb-80' onSubmit={handleSubmit(onSubmit)}>
        <div className='flex justify-between items-center mb-4'>
          <h1 className='text-xl font-bold py-[5.5px]'>Редактировать заказ</h1>
          <button type='submit' className='elim_button w-[20%]'>
            Сохранить
          </button>
        </div>
        <div className='grid grid-cols-1 gap-4'>
          <Controller
            name='comment'
            control={control}
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
          <DriverAutocomplete
            control={control}
            required={'Обязательное поле'}
          />
          {!!oldItems?.length && (
            <div className='grid gap-2 bg-slate-300 p-4 rounded-md'>
              <h1 className='font-semibold text-lg'>Редактировать товар:</h1>
              {oldItems?.map((item: any, index: number) => (
                <div
                  key={index}
                  className='grid grid-cols-4 gap-2 items-center'
                >
                  <div className='col-span-3'>
                    <div className='flex gap-2'>
                      <span>{index + 1})</span>
                      <div className='flex flex-col'>
                        <p className='font-medium'>{item.item?.name}</p>
                        <span>Стоимость продажи: {item.soldCost}</span>
                        <span>Категория ТТ: {item.costType?.name}</span>
                        <span>
                          Сумма: {item.count} * {item.soldCost} ={' '}
                          {item.count * item.soldCost}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className='flex gap-4'>
                    <TextField
                      disabled
                      className='w-full'
                      name='count'
                      placeholder='Количество'
                      label='Количество'
                      value={item.count}
                    />
                    <IconButton
                      className='close-btn min-w-[56px]'
                      onClick={() => handleClose(item.id)}
                    >
                      <EditOutlined className='text-blue-500 !text-3xl' />
                    </IconButton>
                    <IconButton
                      className='close-btn min-w-[56px]'
                      onClick={() => handleRemoveItem(item.id)}
                    >
                      <DeleteOutlined className='text-red-500 !text-3xl' />
                    </IconButton>
                  </div>
                </div>
              ))}
            </div>
          )}
          <Controller
            name='items'
            control={control}
            rules={{ required: false }}
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
                        (cost: any) => cost.costType?.id === values.costType?.id
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
              </FormControl>
            )}
          />
          {!!selectedItems.length && (
            <div className='grid gap-2 bg-slate-300 p-4 rounded-md'>
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
        </div>
      </form>
      {open && (
        <EditOrderItemOrder
          open={open}
          handleClose={handleClose}
          setOldItems={setOldItems}
        />
      )}
      {removeItem && (
        <ConfirmModal
          open={!!removeItem}
          onClose={() => handleRemoveItem(null)}
          text={'Вы уверены что хотите удалить товар'}
          onAccept={() => {
            handleDeleteItem(removeItem);
            handleRemoveItem(null);
          }}
        />
      )}
    </>
  );
};

export default EditNewOrder;
