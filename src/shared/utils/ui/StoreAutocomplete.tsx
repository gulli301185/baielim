import { useGetStoresQuery } from '@/app/slices/storeApi';
import { IStores } from '@/shared/types';
import Autocomplete from '@mui/material/Autocomplete';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import TextField from '@mui/material/TextField';
import { useEffect, useState } from 'react';
import { Controller } from 'react-hook-form';
import { handleScroll } from '../helpers/autocompleteScroll';
import { AutocompleteProps } from '../constants/data';
import useDebouncedInputChange from '../helpers/useDebouncedInputChange';

const StoreAutocomplete = ({
  control,
  countOrders,
  required,
}: AutocompleteProps) => {
  const [page, setPage] = useState(1);
  const [value, setValue] = useState('');
  const [stores, setStores] = useState<IStores[]>([]);

  const storesQuery = useGetStoresQuery({ page, search: value });

  useEffect(() => {
    if (storesQuery.isSuccess && storesQuery.data?.results) {
      setStores((prevStores) =>
        page === 1
          ? storesQuery.data.results
          : [...prevStores, ...storesQuery.data.results]
      );
    }
  }, [storesQuery.data, page]);

  const handleInputChange = useDebouncedInputChange(setPage, setValue);

  return (
    <Controller
      name='store'
      control={control}
      rules={{ required: required }}
      defaultValue={required ? null : { label: '', id: '' }}
      render={({ field, fieldState }) => (
        <FormControl>
          <Autocomplete
            {...field}
            disabled={storesQuery.isError}
            loading={storesQuery.isFetching || storesQuery.isLoading}
            freeSolo
            noOptionsText={'Ничего не найдено'}
            options={
              stores?.map((store) => ({
                label: store.name,
                id: store.id,
                storeCostType: store.costType?.id,
                disabled: !store.costType?.id || false,
              })) || []
            }
            ListboxProps={{
              onScroll: (event) =>
                handleScroll({
                  page,
                  event,
                  setPage,
                  dataQuery: storesQuery,
                }),
            }}
            onInputChange={(_, val) => {
              handleInputChange(val);
            }}
            getOptionLabel={(option) => option.label || ''}
            isOptionEqualToValue={(option, value) =>
              option?.id === value?.id && option?.label === value?.label
            }
            renderOption={(props, option) => {
              return (
                <span {...props} key={option?.id}>
                  {option?.label}
                </span>
              );
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                value={params.inputProps.value || ''}
                placeholder={'Выберите магазин'}
                label={'Выберите магазин'}
                error={!!fieldState?.error}
              />
            )}
            onChange={(_, value) => {
              field.onChange(value);
            }}
          />
          {!!countOrders?.totalCost ? (
            <FormHelperText disabled className='!text-red-500 pt-2'>
              Общая сумма долгов: {countOrders.totalCost}
            </FormHelperText>
          ) : null}
          {fieldState?.error && (
            <FormHelperText error>{fieldState?.error.message}</FormHelperText>
          )}
        </FormControl>
      )}
    />
  );
};

export default StoreAutocomplete;
