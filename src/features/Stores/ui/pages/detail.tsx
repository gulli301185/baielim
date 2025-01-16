import { Error, Loader, Map } from '@/widgets';

import { NavLink } from 'react-router-dom';
import { formatDateToTimestamp } from '@/shared/utils/helpers/formatDateToTimestamp';
import noIMG from '@/shared/assets/noImg.png';
import useDetailStoreService from '../../model/useDetailStoreService';

const DetailStore = () => {
  const { data, isFetching, isError, isLoading } = useDetailStoreService();

  if (isFetching || isLoading) return <Loader />;
  if (isError) return <Error />;

  return (
    <div className='w-full h-full'>
      <h1 className='text-xl font-bold pb-4'>
        Подробная информация о магазине:
      </h1>
      <div className='flex mt-3'>
        <div className='w-[80%] pb-10 grid gap-4'>
          <div className='border border-gray-300'>
            <div className='flex border-b border-gray-300'>
              <div className='w-1/2 flex flex-col border-r border-gray-300'>
                <div className='flex border-slate-300 border-b p-3'>
                  <div className='text-base opacity-60'>Название:</div>
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
              </div>
              <div className='w-1/2 flex flex-col '>
                <div className='flex border-slate-300 p-3'>
                  <div className='text-base opacity-60'>Адрес:</div>
                  <div className='text-base font-medium ml-2 break-all'>
                    {data?.address}
                  </div>
                </div>
                <div className='flex border-slate-300 border-t p-3'>
                  <div className='text-base opacity-60'>ФИО:</div>
                  <div className='text-base font-medium ml-2 break-all'>
                    {data?.contactName}
                  </div>
                </div>
              </div>
            </div>
            <div className='flex border-gray-300'>
              <div className='w-1/2 flex flex-col border-r border-gray-300'>
                <div className='flex border-slate-300 border-b p-3'>
                  <div className='text-base opacity-60'>Агент:</div>
                  <div className='text-base font-medium ml-2 break-all'>
                    {data?.store_agent?.name}
                  </div>
                </div>
              </div>
              <div className='w-1/2 flex flex-col '>
                <div className='flex border-slate-300 border-b p-3'>
                  <div className='text-base opacity-60'>Регион:</div>
                  <div className='text-base font-medium ml-2 break-all'>
                    {data?.region?.name}
                  </div>
                </div>
              </div>
            </div>
            <div className='flex'>
              <div className='w-1/2 flex flex-col border-r border-gray-300'>
                <div className='flex border-slate-300 border-b p-3'>
                  <div className='text-base opacity-60'>Cчет:</div>
                  <div className='text-base font-medium ml-2 break-all'>
                    {data?.score?.toLocaleString('ru-RU')}
                  </div>
                </div>
                <div className='flex border-slate-300 p-3'>
                  <div className='text-base opacity-60'>Категория ТТ:</div>
                  <div className='text-base font-medium ml-2 break-all'>
                    {data?.costType?.name}
                  </div>
                </div>
                <div className='flex flex-col border-slate-300 border-t p-3'>
                  <div className='text-base opacity-60'>Документы:</div>
                  <div className='text-base font-medium'>
                    {data?.documents &&
                      data.documents.map((doc, index) => (
                        <a
                          key={index}
                          href={doc}
                          target='_blank'
                          className='flex gap-1 col-span-1'
                        >
                          <span>{index + 1})</span>
                          <p className='truncate'>{doc}</p>
                        </a>
                      ))}
                  </div>
                </div>
              </div>
              <div className='w-1/2 flex flex-col'>
                <div className='flex border-slate-300 border-b p-3'>
                  <div className='text-base opacity-60'>Площадь:</div>
                  <div className='text-base font-medium ml-2 break-all'>
                    {data?.area?.toLocaleString('ru-RU')}
                  </div>
                </div>
                <div className='flex border-slate-300 p-3'>
                  <div className='text-base opacity-60'>Дата создания:</div>
                  <div className='text-base font-medium ml-2 break-all'>
                    {formatDateToTimestamp(data?.dateCreated)}
                  </div>
                </div>
                <div className='flex border-t border-slate-300 p-3'>
                  <div className='text-base opacity-60'>Номер телефона:</div>
                  <div className='text-base font-medium ml-2 break-all'>
                    {data?.phoneNumber}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {!!data?.lat && !!data?.lon && (
            <Map
              label={'Координаты магазина'}
              storeName={data?.name}
              lat={data?.lat}
              lon={data?.lon}
            />
          )}
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
          <NavLink
            to='new-order?page=1'
            className='border w-full text-center px-3 py-2 text-xs lg:text-base rounded-md mb-2 bg-green-500 text-white'
          >
            Активные заказы
          </NavLink>
          <NavLink
            to='archive-order?page=1'
            className='border w-full text-center px-3 py-2 text-xs lg:text-base rounded-md mb-2 bg-green-500 text-white'
          >
            Архивные заказы
          </NavLink>
          <NavLink
            to='debt?page=1'
            className='border w-full text-center px-3 py-2 text-xs lg:text-base rounded-md mb-2 bg-green-500 text-white'
          >
            Долги
          </NavLink>
          <NavLink
            to='day-plan'
            className='border w-full text-center px-3 py-2 text-xs lg:text-base rounded-md mb-2 bg-green-500 text-white'
          >
            Планы на дни недели
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default DetailStore;
