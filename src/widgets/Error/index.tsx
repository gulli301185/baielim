import { useNavigate } from 'react-router-dom';

const Error = () => {
  const navigate = useNavigate();

  return (
    <div className='w-full h-full tp-center flex-col gap-2'>
      <h2 className='text-6xl'>404</h2>
      <p className='text-xl'>Что-то пошло не так</p>
      <span onClick={() => navigate('/')} className='text-blue-500 underline'>
        На главную
      </span>
    </div>
  );
};

export default Error;
