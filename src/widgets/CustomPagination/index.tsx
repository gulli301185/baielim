import Pagination from '@mui/material/Pagination';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

type Props = {
  count: number;
  handleChangePage: (page: number) => void;
  itemsCount?: number;
};

const CustomPagination = ({
  count,
  handleChangePage,
  itemsCount = 20,
}: Props) => {
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get('page')) || 1;

  const [inputPage, setInputPage] = useState<number>(page);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputPage(Number(event.target.value));
  };

  const handleButtonClick = () => {
    if (inputPage > 0 && inputPage <= Math.ceil(count / itemsCount)) {
      handleChangePage(inputPage);
    }
  };

  return (
    <div className='w-full flex sm:flex-row flex-col items-center justify-end py-5 gap-4'>
      <Pagination
        variant='outlined'
        shape='rounded'
        size='large'
        count={Math.ceil(count / itemsCount)}
        page={page}
        onChange={(_, number) => handleChangePage(number)}
      />
      <div className='flex sm:flex-row flex-col items-center gap-2'>
        <input
          type='number'
          value={inputPage}
          onChange={handleInputChange}
          className='border rounded px-2 h-10'
        />
        <button
          onClick={handleButtonClick}
          className='bg-blue-500 text-white px-4 h-10 rounded'
        >
          Перейти
        </button>
      </div>
    </div>
  );
};

export default CustomPagination;
