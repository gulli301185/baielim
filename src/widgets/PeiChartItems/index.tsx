import { IPieChart } from '@/shared/types';
import { ResponsivePie } from '@nivo/pie';

const PieCharts = ({ data, text }: { data: IPieChart[]; text: string }) => {
  return (
    <div className='w-full h-96 sm:h-[600px]'>
      <p className='text-xl font-semibold text-center mb-4'>{text}:</p>
      <ResponsivePie
        data={data ?? []}
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

export default PieCharts;
