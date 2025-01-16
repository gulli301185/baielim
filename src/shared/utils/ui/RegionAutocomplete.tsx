import { useEffect, useState } from 'react';
import { AutocompleteProps } from '../constants/data';
import { IRegion } from '@/shared/types';
import { useGetRegionsQuery } from '@/app/slices/regionApi';
import { Controller } from 'react-hook-form';
import Autocomplete from '@mui/material/Autocomplete';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import TextField from '@mui/material/TextField';
import { handleScroll } from '../helpers/autocompleteScroll';
import EditOutlined from '@mui/icons-material/EditOutlined';
import { useNavigate } from 'react-router-dom';

const RegionAutocomplete = ({ control, required }: AutocompleteProps) => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [regions, setRegions] = useState<IRegion[]>([]);

  const regionsQuery = useGetRegionsQuery(page);

  useEffect(() => {
    if (regionsQuery.isSuccess && regionsQuery.data?.results) {
      setRegions((prevRegions) =>
        page === 1
          ? regionsQuery.data.results
          : [...prevRegions, ...regionsQuery.data.results]
      );
    }
  }, [regionsQuery.data, page]);

  const handleInputChange = () => {
    setPage(1);
  };

  const handleNavigate = ({
    event,
    regionID,
  }: {
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>;
    regionID: any;
  }) => {
    event.stopPropagation();
    navigate(`regions/${regionID}/edit`);
  };

  const handleAddRegion = () => {
    navigate('regions');
  };

  return (
    <Controller
      name='region'
      control={control}
      rules={{ required: required }}
      defaultValue={required ? null : { label: '', id: '' }}
      render={({ field, fieldState }) => (
        <FormControl>
          <Autocomplete
            disabled={regionsQuery.isError}
            loading={regionsQuery.isFetching || regionsQuery.isLoading}
            freeSolo
            noOptionsText={'Ничего не найдено'}
            options={
              regions.map((region) => ({
                label: region.name,
                id: region.id,
              })) || []
            }
            ListboxProps={{
              onScroll: (event) =>
                handleScroll({
                  page,
                  event,
                  setPage,
                  dataQuery: regionsQuery,
                }),
            }}
            onInputChange={handleInputChange}
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
                      handleNavigate({ event, regionID: option?.id })
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
                placeholder={'Выберите регион'}
                label={'Выберите регион'}
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
              Добавить регион
            </button>
          </div>
        </FormControl>
      )}
    />
  );
};

export default RegionAutocomplete;
