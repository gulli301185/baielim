import { useGetAgentsQuery } from '@/app/slices/agentApi';
import { IAgents } from '@/shared/types';
import Autocomplete from '@mui/material/Autocomplete';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import TextField from '@mui/material/TextField';
import { useEffect, useState } from 'react';
import { Controller } from 'react-hook-form';
import { handleScroll } from '../helpers/autocompleteScroll';
import { AutocompleteProps } from '../constants/data';
import useDebouncedInputChange from '../helpers/useDebouncedInputChange';

const AgentAutocomplete = ({
  control,
  required,
  name = 'agent',
}: AutocompleteProps) => {
  const [page, setPage] = useState(1);
  const [value, setValue] = useState('');
  const [agents, setAgents] = useState<IAgents[]>([]);

  const agentsQuery = useGetAgentsQuery({ page, search: value });

  useEffect(() => {
    if (agentsQuery.isSuccess && agentsQuery.data?.results) {
      setAgents((prevAgents) =>
        page === 1
          ? agentsQuery.data.results
          : [...prevAgents, ...agentsQuery.data.results]
      );
    }
  }, [agentsQuery.data, page]);

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
            disabled={agentsQuery.isError}
            loading={agentsQuery.isFetching || agentsQuery.isLoading}
            freeSolo
            noOptionsText={'Ничего не найдено'}
            options={
              agents?.map((agent) => ({
                label: agent.name,
                id: agent.id,
              })) || []
            }
            ListboxProps={{
              onScroll: (event) =>
                handleScroll({
                  page,
                  event,
                  setPage,
                  dataQuery: agentsQuery,
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
            {...field}
            renderInput={(params) => (
              <TextField
                {...params}
                value={params.inputProps.value || ''}
                placeholder={'Выберите агента'}
                label={'Выберите агента'}
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

export default AgentAutocomplete;
