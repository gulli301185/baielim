import useDetailDriverService from '../../model/useDetailDriverService';
import { Error, Loader } from '@/widgets';
import noIMG from '@/shared/assets/noImg.png';
import { NavLink } from 'react-router-dom';

const DetailDriver = () => {
  const { data, isFetching, isError, isLoading } = useDetailDriverService();

  if (isFetching || isLoading) return <Loader />;
  if (isError) return <Error />;

  return (
    <div className='w-full h-full'>
      <h1 className='text-xl font-bold pb-4'>
        Подробная информация о водителе:
      </h1>
      <div className='flex mt-3'>
        <div className='w-[80%]'>
          <div className='border border-gray-300'>
            <div className='flex'>
              <div className='w-1/2 flex flex-col border-r border-gray-300'>
                <div className='flex border-slate-300 border-b p-3'>
                  <div className='text-base opacity-60'>ФИО:</div>
                  <div className='text-base font-medium ml-2 break-all'>
                    {data?.name}
                  </div>
                </div>
                <div className='flex border-slate-300 p-3'>
                  <div className='text-base opacity-60'>Логин:</div>
                  <div className='text-base font-medium ml-2 break-all'>
                    {data?.login}
                  </div>
                </div>
                <div className='flex border-slate-300 border-t p-3'>
                  <div className='text-base opacity-60'>Is Active:</div>
                  <div className='text-base font-medium ml-2 break-all'>
                    {data?.is_active ? '✅' : '❌'}
                  </div>
                </div>
                <div className='flex flex-col border-slate-300 border-t p-3'>
                  <div className='text-base opacity-60'>Паспорт:</div>
                  <div className='w-full max-h-[250px] mb-5 overflow-hidden rounded-md'>
                    {data?.passport_front ? (
                      <img
                        src={data.passport_front}
                        className='w-full h-full object-contain  rounded-md'
                        alt='*'
                        onError={(e) => {
                          (e.target as HTMLImageElement).onerror = null;
                          (e.target as HTMLImageElement).src = noIMG;
                        }}
                      />
                    ) : (
                      <img
                        src={noIMG}
                        className='w-full h-full object-contain  rounded-md'
                        alt='*'
                      />
                    )}
                  </div>
                </div>
              </div>
              <div className='w-1/2 flex flex-col'>
                <div className='flex border-slate-300 border-b p-3'>
                  <div className='text-base opacity-60'>Номер телефона:</div>
                  <div className='text-base font-medium ml-2 break-all'>
                    {data?.phoneNumber}
                  </div>
                </div>
                <div className='flex border-slate-300 p-3'>
                  <div className='text-base opacity-60'>Баланс:</div>
                  <div className='text-base font-medium ml-2 break-all'>
                    {data?.balance?.toLocaleString('ru-RU')}
                  </div>
                </div>
                <div className='flex border-slate-300 border-t p-3'>
                  <div className='text-base opacity-60'>1С код:</div>
                  <div className='text-base font-medium ml-2 break-all'>
                    {data?.oneC_code}
                  </div>
                </div>
                <div className='flex flex-col border-slate-300 border-t p-3'>
                  <div className='text-base opacity-60'>Паспорт:</div>
                  <div className='w-full max-h-[250px] mb-5 overflow-hidden rounded-md'>
                    {data?.passport_back ? (
                      <img
                        src={data.passport_back}
                        className='w-full h-full object-contain  rounded-md'
                        alt='*'
                        onError={(e) => {
                          (e.target as HTMLImageElement).onerror = null;
                          (e.target as HTMLImageElement).src = noIMG;
                        }}
                      />
                    ) : (
                      <img
                        src={noIMG}
                        className='w-full h-full object-contain  rounded-md'
                        alt='*'
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='w-[20%] flex flex-col items-end ml-3'>
          <div className='w-full max-h-[250px] mb-5 overflow-hidden rounded-md'>
            {data?.photo ? (
              <img
                src={data.photo}
                className='w-full h-full object-contain bg-green-200 border border-gray-300 rounded-md'
                alt='*'
                onError={(e) => {
                  (e.target as HTMLImageElement).onerror = null;
                  (e.target as HTMLImageElement).src = noIMG;
                }}
              />
            ) : (
              <img
                src={noIMG}
                className='w-full h-full object-contain bg-green-200 border border-gray-300 rounded-md'
                alt='*'
              />
            )}
          </div>
          <NavLink
            to='edit'
            className='border w-full text-center px-3 py-2 text-xs lg:text-base rounded-md mb-2 bg-green-500 text-white'
          >
            Редактировать
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default DetailDriver;