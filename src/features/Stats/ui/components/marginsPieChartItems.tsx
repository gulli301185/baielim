import { IItemMargins } from '@/shared/types';
import { ResponsivePie } from '@nivo/pie';

const MarginsPieChartItems = ({ stats }: { stats: IItemMargins[] }) => {
  const data = stats.map((stat) => ({
    id: stat.name,
    value: parseFloat(stat.marginality?.toFixed(0)).toLocaleString('ru-RU'),
  }));

  return (
    <div className='w-full min-h-[240px] h-[80%]'>
      <ResponsivePie
        data={data}
        margin={{ top: 10, bottom: 10 }}
        innerRadius={0.2}
        padAngle={1}
        cornerRadius={8}
        startAngle={80}
        endAngle={-355}
        sortByValue={false}
        activeOuterRadiusOffset={8}
        enableArcLinkLabels={false}
        enableArcLabels={true}
        borderWidth={1}
        colors={{ scheme: 'red_yellow_green' }}
        borderColor={{
          from: 'color',
          modifiers: [['darker', 1]],
        }}
        legends={[]}
        arcLabelsTextColor='black'
        arcLabelsSkipAngle={20}
      />
    </div>
  );
};

export default MarginsPieChartItems;
