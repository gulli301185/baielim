import { useCallback } from 'react';

type UseDebouncedInputChange = (
  setPage: (page: number) => void,
  setValue: (value: string) => void,
  delay?: number
) => (inputValue: string) => void;

const debounce = (func: (...args: any[]) => void, delay: number) => {
  let timeoutId: NodeJS.Timeout;
  return (...args: any[]) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

const useDebouncedInputChange: UseDebouncedInputChange = (
  setPage,
  setValue,
  delay = 300
) => {
  const debouncedCallback = useCallback(
    debounce((inputValue: string) => {
      setPage(1);
      setValue(inputValue);
    }, delay),
    [setPage, setValue, delay]
  );

  return debouncedCallback;
};

export default useDebouncedInputChange;
