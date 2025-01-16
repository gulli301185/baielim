import { useGetCategoriesQuery } from '@/app/slices/categoryApi';
import { AutocompleteProps } from '../constants/data';
import { Controller } from 'react-hook-form';
import Autocomplete from '@mui/material/Autocomplete';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';
import EditOutlined from '@mui/icons-material/EditOutlined';

const CategoryAutocomplete = ({ control, required }: AutocompleteProps) => {
  const navigate = useNavigate();
  const categoriesQuery = useGetCategoriesQuery();

  const handleNavigate = ({
    event,
    catID,
  }: {
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>;
    catID: any;
  }) => {
    event.stopPropagation();
    navigate(`categories/${catID}/edit`);
  };

  const handleAddRegion = () => {
    navigate('categories');
  };

  return (
    <Controller
      name='category'
      control={control}
      rules={{ required: required }}
      defaultValue={required ? null : { label: '', id: '' }}
      render={({ field, fieldState }) => (
        <FormControl>
          <Autocomplete
            disabled={categoriesQuery.isError}
            loading={categoriesQuery.isFetching || categoriesQuery.isLoading}
            freeSolo
            noOptionsText={'Ничего не найдено'}
            options={
              categoriesQuery.data?.map((category) => ({
                label: category.name,
                id: category.id,
              })) || []
            }
            getOptionLabel={(option) => option.label || ''}
            isOptionEqualToValue={(option, value) =>
              option?.id === value?.id && option?.label === value?.label
            }
            renderOption={(props, option) => {
              return (
                <span className='flex' {...props} key={option?.id}>
                  <p className='flex-1'>{option?.label}</p>
                  <button
                    onClick={(event) =>
                      handleNavigate({ event, catID: option?.id })
                    }
                  >
                    <EditOutlined className='text-green-500' />
                  </button>
                </span>
              );
            }}
            {...field}
            renderInput={(params) => (
              <TextField
                {...params}
                value={params.inputProps.value || ''}
                placeholder={'Выберите категорию'}
                label={'Выберите категорию'}
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
          <div className='flex justify-end mt-2'>
            <button
              type='button'
              className='bg-blue-500 text-white px-4 py-2 rounded'
              onClick={handleAddRegion}
            >
              Добавить категорию
            </button>
          </div>
        </FormControl>
      )}
    />
  );
};

export default CategoryAutocomplete;
