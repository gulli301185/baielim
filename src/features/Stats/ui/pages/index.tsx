import { Error, Loader } from '@/widgets';
import SearchFilter from '@/widgets/SearchFilter';
import useStatsService from '../../model/useStatsService';
import CountProgressBar from '../components/countProgressBar';
import { CountAndSumOrdersStats } from '../components/countAndSumOrdersStats';
import { CountAndSumItemsStats } from '../components/countAndSumItemsStats';
import { PieChartsItems } from '../components/pieChartsItems';
import CountAndSumTable from '../components/countAndSumTable';
import {
  columnsCountAndSumItems,
  columnsCountAndSumOrders,
  columnsMarginsItem,
} from '@/shared/utils/constants/column';
import { IItemMargins, IStatistic, IStatisticItems } from '@/shared/types';
import { MarginsItemStats } from '../components/marginsItemStats';
import MarginsPieChartItems from '../components/marginsPieChartItems';

const Stats = () => {
  const {
    data,
    stats,
    status,
    control,
    onSubmit,
    itemsStats,
    handleSubmit,
    handleResetFields,
  } = useStatsService();

  if (status === 'loading') return <Loader />;
  if (status === 'error') return <Error />;

  return (
    <div className='w-full h-full'>
      <h1 className='text-xl font-bold pb-4'>Статистика:</h1>
      <CountProgressBar />
      <div className='w-full h-full'>
        <h2 className='text-xl font-bold pb-4'>Статистика по фильтрам:</h2>
        <SearchFilter
          control={control}
          onSubmit={onSubmit}
          handleSubmit={handleSubmit}
          handleResetFields={handleResetFields}
          filters={{
            store: true,
            agent: true,
            start_date: true,
            end_date: true,
            costType: true,
          }}
        />
        <CountAndSumOrdersStats stats={stats} />
        <CountAndSumTable<IStatistic>
          stats={stats}
          text='Таблица заказов'
          columns={columnsCountAndSumOrders}
        />
        <CountAndSumItemsStats stats={itemsStats} />
        <PieChartsItems stats={itemsStats} />
        <CountAndSumTable<IStatisticItems>
          stats={itemsStats}
          text='Таблица товаров'
          columns={columnsCountAndSumItems}
        />
        <MarginsItemStats stats={data} />
        <MarginsPieChartItems stats={data} />
        <CountAndSumTable<IItemMargins>
          stats={data}
          text='Маржинальность'
          columns={columnsMarginsItem}
        />
      </div>
    </div>
  );
};

export default Stats;
