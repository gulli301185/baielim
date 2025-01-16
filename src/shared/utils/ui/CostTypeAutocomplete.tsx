import { useGetCostTypeQuery } from '@/app/slices/costTypeSlice';
import { AutocompleteProps } from '../constants/data';
import { Controller } from 'react-hook-form';
import Autocomplete from '@mui/material/Autocomplete';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import TextField from '@mui/material/TextField';

const CostTypeAutocomplete = ({
  control,
  col,
  required,
}: AutocompleteProps) => {
  const costTypesQuery = useGetCostTypeQuery();

  return (
    <Controller
      name='costType'
      control={control}
      rules={{ required: required }}
      defaultValue={required ? null : { label: '', id: '' }}
      render={({ field, fieldState }) => (
        <FormControl className={`${col}`}>
          <Autocomplete
            disabled={costTypesQuery.isError}
            loading={costTypesQuery.isFetching || costTypesQuery.isLoading}
            freeSolo
            noOptionsText={'Ничего не найдено'}
            options={
              costTypesQuery.data?.map((costType) => ({
                label: costType.name,
                id: costType.id,
              })) || []
            }
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
            {...field}
            renderInput={(params) => (
              <TextField
                {...params}
                value={params.inputProps.value || ''}
                placeholder={'Выберите категорию ТТ'}
                label={'Выберите категорию ТТ'}
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

export default CostTypeAutocomplete;
