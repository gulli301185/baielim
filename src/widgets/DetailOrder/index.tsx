import { Link, NavLink } from 'react-router-dom';
import useDetailOrderService from './model/useDetailOrderService';
import {
  translatePaymentStatus,
  translateStatus,
} from '@/shared/utils/helpers/translateStatus';
import Loader from '../Loader';
import Error from '../Error';
import { formatDateToTimestamp } from '@/shared/utils/helpers/formatDateToTimestamp';
import noIMG from '@/shared/assets/noImg.png';
import Map from '../Map';
import WriteDebtOrder from '@/features/Orders/ui/components/writeDebtOrder';

const DetailOrder = ({
  edit,
  delivery = false,
  manager = false,
}: {
  edit: boolean;
  delivery?: boolean;
  manager?: boolean;
}) => {
  const {
    open,
    order,
    status,
    fetchData,
    captureRef,
    handleClose,
    handlePrintClick,
  } = useDetailOrderService();

  if (status === 'loading') return <Loader />;
  if (status === 'error') return <Error />;

  return (
    <div className='w-full h-full'>
      <h1 className='text-xl font-bold pb-4'>Подробная информация о заказе:</h1>
      <div className='flex mt-3'>
        <div
          className={`${manager ? 'w-full' : 'w-[80%]'} grid gap-4 pb-10`}
          ref={captureRef}
        >
          <div className='border border-gray-300'>
            <div className='flex'>
              <div className='w-1/2 flex flex-col border-r border-gray-300'>
                <div className='flex border-slate-300 p-3 break-keep'>
                  <div className='text-base opacity-60'>Агент:</div>
                  <div className='text-base font-medium ml-2 break-all'>
                    {order?.agent?.name}
                  </div>
                </div>
                <div className='flex border-slate-300 border-t p-3'>
                  <div className='text-base opacity-60'>Магазин:</div>
                  {manager ? (
                    <div className='text-base font-medium ml-2 break-all'>
                      {order?.store?.name}
                    </div>
                  ) : (
                    <Link
                      to={`/stores/${order?.store?.id}`}
                      className='text-base font-medium ml-2 break-all underline text-blue-500'
                    >
                      {order?.store?.name}
                    </Link>
                  )}
                </div>
                <div className='flex border-slate-300 border-t p-3'>
                  <div className='text-base opacity-60'>
                    Дата и время создания:
                  </div>
                  <div className='text-base font-medium ml-2 break-all'>
                    {formatDateToTimestamp(order?.dateCreated)}
                  </div>
                </div>
                <div className='flex border-slate-300 border-t p-3'>
                  <div className='text-base opacity-60'>Статус оплаты:</div>
                  <div className='text-base font-medium ml-2 break-all'>
                    {translatePaymentStatus(order?.paymentStatus || '')}
                  </div>
                </div>
                <div className='flex border-slate-300 border-t p-3'>
                  <div className='text-base opacity-60'>Комментарий:</div>
                  <div className='text-base font-medium ml-2 break-all'>
                    {order?.comment}
                  </div>
                </div>
              </div>
              <div className='w-1/2 flex flex-col'>
                <div className='flex border-slate-300 border-b p-3'>
                  <div className='text-base opacity-60'>Статус:</div>
                  <div className='text-base font-medium ml-2 break-all'>
                    {translateStatus(order?.status || '')}
                  </div>
                </div>
                <div className='flex border-slate-300 border-b p-3'>
                  <div className='text-base opacity-60'>Водитель:</div>
                  <div className='text-base font-medium ml-2 break-all'>
                    {order?.driver?.name}
                  </div>
                </div>
                <div className='flex border-slate-300 p-3'>
                  <div className='text-base opacity-60'>Общая сумма:</div>
                  <div className='text-base font-medium ml-2 break-all'>
                    {order?.totalCost?.toLocaleString('ru-RU')}
                  </div>
                </div>
                <div className='flex border-slate-300 border-t p-3'>
                  <div className='text-base opacity-60'>Вес:</div>
                  <div className='text-base font-medium ml-2 break-all'>
                    {order?.weight?.toLocaleString('ru-RU')}
                  </div>
                </div>
                <div className='flex border-slate-300 border-t p-3'>
                  <div className='text-base opacity-60'>Остаток суммы:</div>
                  <div className='text-base font-medium ml-2 break-all'>
                    {order?.amountLeft?.toLocaleString('ru-RU')}
                  </div>
                </div>
                {order?.status === 'archive' && (
                  <div className='flex border-slate-300 border-t p-3'>
                    <div className='text-base opacity-60'>
                      Комментарий доставщика:
                    </div>
                    <div className='text-base font-medium ml-2 break-all'>
                      {order?.delComment}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          {order?.items?.length ? (
            <>
              <h1 className='text-base opacity-60'>Список позиций:</h1>
              <table className='w-full border-none'>
                <thead>
                  <tr className='grid gap-1 items-start grid-cols-[repeat(auto-fit,_minmax(100px,_1fr))] mb-1'>
                    <th className='border-[1px] border-solid border-[#ccc] p-2 col-span-2'>
                      Товар
                    </th>
                    <th className='border-[1px] border-solid border-[#ccc] p-2'>
                      Количество
                    </th>
                    <th className='border-[1px] border-solid border-[#ccc] p-2'>
                      Стоимость продажи
                    </th>
                    <th className='border-[1px] border-solid border-[#ccc] p-2 col-span-2'>
                      Категория ТТ
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {order.items?.map((item, index) => (
                    <tr
                      key={index}
                      className='w-full mb-[2px] grid gap-1 grid-cols-[repeat(auto-fit,_minmax(100px,_1fr))]'
                    >
                      {manager ? (
                        <td className='border-[1px] border-solid border-[#ccc] p-[6px] flex col-span-2 line-clamp-1'>
                          {item.item?.name}
                        </td>
                      ) : (
                        <td className='border-[1px] border-solid text-blue-500 underline border-[#ccc] p-[6px] flex col-span-2 line-clamp-1'>
                          <Link to={`/items/${item.item.id}`}>
                            {item.item?.name}
                          </Link>
                        </td>
                      )}
                      <td className='border-[1px] border-solid border-[#ccc] p-[6px] flex line-clamp-1'>
                        {item.count?.toLocaleString('ru-RU')}
                      </td>
                      <td className='border-[1px] border-solid border-[#ccc] p-[6px]'>
                        {item.soldCost?.toLocaleString('ru-RU')}
                      </td>
                      <td className='border-[1px] border-solid border-[#ccc]  p-[6px] col-span-2 line-clamp-1'>
                        {item.costType?.name}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          ) : null}
          {delivery && (
            <div className='w-full h-full mt-4'>
              <h2 className='text-xl font-bold py-[5.5px]'>
                Информация о доставке:
              </h2>
              <div className='border border-gray-300'>
                <div className='flex'>
                  <div className='w-1/2 flex flex-col border-r border-gray-300'>
                    <div className='flex border-slate-300 p-3'>
                      <div className='text-base opacity-60'>Дата доставки:</div>
                      <div className='text-base font-medium ml-2 break-all'>
                        {formatDateToTimestamp(order?.dateDelivered || '')}
                      </div>
                    </div>
                  </div>
                  <div className='w-1/2 flex flex-col'>
                    <div className='flex border-slate-300 p-3'>
                      <div className='text-base opacity-60'>
                        Комментарий доставщика:
                      </div>
                      <div className='text-base font-medium ml-2 break-all'>
                        {order?.delComment}
                      </div>
                    </div>
                  </div>
                </div>
                <div className='w-full flex border-t border-gray-300'>
                  <div className='w-full grid grid-cols-2 gap-3 p-3'>
                    <div className='w-full h-96'>
                      {order?.photo ? (
                        <img
                          src={order.photo}
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
                    <div className='w-full h-96'>
                      {order?.signature ? (
                        <img
                          src={order.signature}
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
                  </div>
                </div>
              </div>
            </div>
          )}
          {((!!order?.lat && !!order?.lon) ||
            (!!order?.store?.lat && !!order?.store?.lon)) && (
            <Map
              label={'Координаты заказа'}
              orderID={order?.id}
              lat={order.store?.lat}
              lon={order.store?.lon}
              orderLat={order?.lat}
              orderLon={order?.lon}
              storeName={order?.store?.name}
            />
          )}
        </div>
        {!manager && (
          <div className='w-[20%] flex flex-col items-end ml-3'>
            {edit && (
              <NavLink
                to='edit'
                className='border w-full text-center px-3 py-2 text-xs lg:text-base rounded-md mb-2 bg-green-500 text-white'
              >
                Редактирвать
              </NavLink>
            )}
            <NavLink
              to='transactions?page=1'
              className='border w-full text-center px-3 py-2 text-xs lg:text-base rounded-md mb-2 bg-green-500 text-white'
            >
              Транзакции
            </NavLink>
            <NavLink
              to='return-order'
              className='border w-full text-center px-3 py-2 text-xs lg:text-base rounded-md mb-2 bg-green-500 text-white'
            >
              Возвраты
            </NavLink>
            <NavLink
              to='order-history'
              className='border w-full text-center px-3 py-2 text-xs lg:text-base rounded-md mb-2 bg-green-500 text-white'
            >
              История изменений
            </NavLink>
            {!!order?.amountLeft && order.amountLeft > 0 && (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  handleClose(order.amountLeft ?? null);
                }}
                className='border w-full text-center px-3 py-2 text-xs lg:text-base rounded-md mb-2 bg-blue-500 text-white'
              >
                Списать долг
              </button>
            )}
            <button
              onClick={(e) => {
                e.preventDefault();
                handlePrintClick();
              }}
              className='border w-full text-center px-3 py-2 text-xs lg:text-base rounded-md mb-2 bg-blue-500 text-white'
            >
              Распечатать
            </button>
          </div>
        )}
      </div>
      {!!open && (
        <WriteDebtOrder
          open={open}
          fetchData={fetchData}
          handleClose={handleClose}
        />
      )}
    </div>
  );
};

export default DetailOrder;
