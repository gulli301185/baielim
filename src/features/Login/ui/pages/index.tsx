import CircularProgress from '@mui/material/CircularProgress';
import useLogin from '../../model/useLogin';
import RemoveRedEye from '@mui/icons-material/RemoveRedEye';
import logo from '@/shared/assets/elim.svg';

const Login = () => {
  const {
    show,
    errors,
    status,
    setShow,
    onSubmit,
    register,
    navigate,
    handleSubmit,
  } = useLogin();

  return (
    <div className='w-full min-h-[96vh] tp-center flex-col font-roboto p-4 gap-5 relative'>
      {status && (
        <div className='absolute z-10 w-full h-full bg-black/10 backdrop-blur-sm tp-center'>
          <CircularProgress className='!text-green-500' size={60} />
        </div>
      )}
      <div className='w-full absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 tp-center flex-col gap-4'>
        <div className='w-64 h-64'>
          <img
            className='rounded-xl mx-auto w-full h-full'
            src={logo}
            alt='*'
          />
        </div>
        <div className='max-w-[500px] w-full tp-center flex-col h-full sm:border border-solid border-[#b4b4b4] rounded-lg p-3 sm:p-9 gap-4 sm:gap-8'>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className='w-full flex flex-col gap-8'
          >
            <div className='w-full flex flex-col gap-4'>
              <div className='w-full'>
                <label
                  htmlFor='login'
                  className='text-base text-[#333] leading-6'
                >
                  Логин
                </label>
                <input
                  id='login'
                  className='elim_input my-1'
                  {...register('login', {
                    required: 'Обязательное поле',
                    maxLength: {
                      value: 200,
                      message: 'Максимальное количество 200 символов',
                    },
                    minLength: {
                      value: 1,
                      message: 'Минимальное количество 1 символ',
                    },
                  })}
                  placeholder={'Введите логин'}
                />
                {errors.login && typeof errors.login.message === 'string' && (
                  <p role='alert' className='text-[#ff0000] font-light text-sm'>
                    {errors.login?.message}
                  </p>
                )}
              </div>
              <div className='w-full relative'>
                <label
                  htmlFor='password'
                  className='text-base text-[#333] leading-6'
                >
                  Пароль
                </label>
                <input
                  id='password'
                  type={show ? 'text' : 'password'}
                  className='elim_input my-1 pr-11'
                  {...register('password', {
                    required: 'Обязательное поле',
                    maxLength: {
                      value: 128,
                      message: 'Максимальное количество 128 символов',
                    },
                    minLength: {
                      value: 1,
                      message: 'Минимальное количество 1 символ',
                    },
                  })}
                  placeholder={'Введите пароль'}
                />
                <div
                  className='absolute right-3 top-[38px] cursor-pointer'
                  onClick={() => setShow(!show)}
                >
                  <span
                    className={`absolute ${
                      show ? 'block' : 'hidden'
                    } w-6 h-[2px] bg-[#6D7185] rotate-45 top-[11px] transition-transform ease-in-out duration-200`}
                  ></span>
                  <RemoveRedEye className='text-2xl text-[#6D7185]' />
                </div>
                {errors.password &&
                  typeof errors.password.message === 'string' && (
                    <p
                      role='alert'
                      className='text-[#ff0000] font-light text-sm'
                    >
                      {errors.password?.message}
                    </p>
                  )}
              </div>
            </div>
            <button type='submit' className='elim_button'>
              Войти
            </button>
          </form>
        </div>
        <p
          onClick={() => navigate('/deletion-request')}
          className='cursor-pointer text-sm'
        >
          Запрос на удаление
        </p>
      </div>
    </div>
  );
};

export default Login;
