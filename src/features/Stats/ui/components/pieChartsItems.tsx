import { IPieChart, IStatisticItems } from '@/shared/types';
import PieCharts from '@/widgets/PeiChartItems';

export const PieChartsItems = ({ stats }: { stats: IStatisticItems[] }) => {
  let countChartData: IPieChart[] = [];
  let costChartData: IPieChart[] = [];

  if (stats) {
    countChartData = Object?.entries(stats)?.map(([_, stat]) => ({
      id: stat.name,
      value: parseFloat(stat.count?.toFixed(0)).toLocaleString('ru-RU'),
    }));

    costChartData = Object?.entries(stats)?.map(([_, stat]) => ({
      id: stat.name,
      value: parseFloat(stat.totalCost?.toFixed(0)).toLocaleString('ru-RU'),
    }));
  }

  return (
    <div className='w-full grid grid-cols-1 md:grid-cols-2 gap-5 py-10'>
      <PieCharts data={countChartData} text={'Заказанное количество'} />
      <PieCharts data={costChartData} text={'Заказанное сумма'} />
    </div>
  );
};
