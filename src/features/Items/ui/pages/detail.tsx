import { NavLink } from 'react-router-dom';
import { Error, Loader } from '@/widgets';
import noIMG from '@/shared/assets/noImg.png';
import useDetailItemService from '../../model/useDetailItemService';

const DetailItem = () => {
  const { item, isFetching, isError, isLoading } = useDetailItemService();

  if (isFetching || isLoading) return <Loader />;
  if (isError) return <Error />;

  return (
    <div className='w-full h-full'>
      <h1 className='text-xl font-bold pb-4'>Подробная информация о товаре:</h1>
      <div className='flex mt-3'>
        <div className='w-[80%]'>
          <div className='border border-gray-300'>
            <div className='flex'>
              <div className='w-1/2 flex flex-col border-r border-gray-300'>
                <div className='flex border-slate-300 border-b p-3'>
                  <div className='text-base opacity-60'>Название:</div>
                  <div className='text-base font-medium ml-2 break-all'>
                    {item?.name}
                  </div>
                </div>
                <div className='flex border-slate-300 p-3'>
                  <div className='text-base opacity-60'>
                    Внутренние расходы:
                  </div>
                  <div className='text-base font-medium ml-2 break-all'>
                    {item?.costIn?.toLocaleString('ru-RU')}
                  </div>
                </div>
                <div className='flex border-slate-300 border-t p-3'>
                  <div className='text-base opacity-60'>Автор:</div>
                  <div className='text-base font-medium ml-2 break-all'>
                    {item?.author}
                  </div>
                </div>
                <div className='flex flex-col border-slate-300 border-t p-3'>
                  <div className='text-base opacity-60 mb-2'>Цены:</div>
                  <div className='text-base font-medium grid gap-1'>
                    {item?.costs?.map((cost) => (
                      <div
                        key={cost.id}
                        className='grid grid-cols-5 gap-2 p-2 bg-slate-200 rounded'
                      >
                        <span className='col-span-3 line-clamp-1'>
                          {cost.costType?.name}
                        </span>
                        <span>Цена: {cost.cost?.toLocaleString('ru-RU')}</span>
                        <span>
                          Бонус: {cost.bonusAmount?.toLocaleString('ru-RU')}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className='w-1/2 flex flex-col'>
                <div className='flex border-slate-300 border-b p-3'>
                  <div className='text-base opacity-60'>Количество:</div>
                  <div className='text-base font-medium ml-2 break-all'>
                    {item?.quantity?.toLocaleString('ru-RU')}
                  </div>
                </div>
                <div className='flex border-slate-300 p-3'>
                  <div className='text-base opacity-60'>Наименование код:</div>
                  <div className='text-base font-medium ml-2 break-all'>
                    {item?.code}
                  </div>
                </div>
                <div className='flex border-slate-300 border-t p-3'>
                  <div className='text-base opacity-60'>Категория:</div>
                  <div className='text-base font-medium ml-2 break-all'>
                    {item?.category?.name}
                  </div>
                </div>
                <div className='flex border-slate-300 border-t p-3'>
                  <div className='text-base opacity-60'>Вес:</div>
                  <div className='text-base font-medium ml-2 break-all'>
                    {item?.weight?.toLocaleString('ru-RU')}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='w-[20%] flex flex-col items-end ml-3'>
          <div className='w-full max-h-[250px] mb-5 overflow-hidden rounded-md'>
            {item?.photo ? (
              <img
                src={item.photo}
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

export default DetailItem;
