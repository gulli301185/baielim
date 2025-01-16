import CircularProgress from '@mui/material/CircularProgress';

const Loader = () => {
  return (
    <div className='w-full h-full tp-center'>
      <CircularProgress className='!text-green-500' size={60} />
    </div>
  );
};

export default Loader;
