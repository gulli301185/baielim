type Props = {
  count: number;
  itemsCount: number;
  totalCost: number;
};

const OrderInfo = ({ count, itemsCount, totalCost }: Props) => {
  return (
    <div className='w-full flex flex-col items-end py-4'>
      <div className='flex gap-2'>
        <h2>Количество заказов:</h2>
        <p className='font-bold'>
          {parseFloat(count?.toFixed(0)).toLocaleString('ru-RU')}
        </p>
      </div>
      <div className='flex gap-2'>
        <h2>Количество товаров:</h2>
        <p className='font-bold'>
          {parseFloat(itemsCount?.toFixed(0)).toLocaleString('ru-RU')}
        </p>
      </div>
      <div className='flex gap-2'>
        <h2>Общая сумма товаров:</h2>
        <p className='font-bold'>
          {parseFloat(totalCost?.toFixed(0)).toLocaleString('ru-RU')}
        </p>
      </div>
      <div className='flex gap-2'>
        <h2>Средний чек:</h2>
        <p className='font-bold'>
          {(totalCost / count).toFixed(0).toLocaleLowerCase('ru-RU')}
        </p>
      </div>
    </div>
  );
};

export default OrderInfo;
