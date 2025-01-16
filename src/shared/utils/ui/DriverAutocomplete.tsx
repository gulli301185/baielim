import { useEffect, useState } from 'react';
import { AutocompleteProps } from '../constants/data';
import { IDrivers } from '@/shared/types';
import { useGetDriversQuery } from '@/app/slices/driverApi';
import useDebouncedInputChange from '../helpers/useDebouncedInputChange';
import { Controller } from 'react-hook-form';
import Autocomplete from '@mui/material/Autocomplete';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import TextField from '@mui/material/TextField';
import { handleScroll } from '../helpers/autocompleteScroll';

const DriverAutocomplete = ({
  control,
  required,
  name = 'driver',
}: AutocompleteProps) => {
  const [page, setPage] = useState(1);
  const [value, setValue] = useState('');
  const [drivers, setDrivers] = useState<IDrivers[]>([]);

  const driversQuery = useGetDriversQuery({ page, search: value });

  useEffect(() => {
    if (driversQuery.isSuccess && driversQuery.data?.results) {
      setDrivers((prevDrivers) =>
        page === 1
          ? driversQuery.data.results
          : [...prevDrivers, ...driversQuery.data.results]
      );
    }
  }, [driversQuery.data, page]);

  const handleInputChange = useDebouncedInputChange(setPage, setValue);

  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: required }}
      defaultValue={required ? null : { label: '', id: '' }}
      render={({ field, fieldState }) => (
        <FormControl>
          <Autocomplete
            {...field}
            disabled={driversQuery.isError}
            loading={driversQuery.isFetching || driversQuery.isLoading}
            freeSolo
            noOptionsText={'Ничего не найдено'}
            options={
              drivers?.map((driver) => ({
                label: driver.name,
                id: driver.id,
              })) || []
            }
            ListboxProps={{
              onScroll: (event) =>
                handleScroll({
                  page,
                  event,
                  setPage,
                  dataQuery: driversQuery,
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
                placeholder={'Выберите водителя'}
                label={'Выберите водителя'}
                error={!!fieldState?.error}
              />
            )}
            onChange={(_, value) => {
              field.onChange(value);
            }}
          />
          {fieldState?.error && (
            <FormHelperText error>{fieldState?.error.message}</FormHelperText>
          )}
        </FormControl>
      )}
    />
  );
};

export default DriverAutocomplete;
