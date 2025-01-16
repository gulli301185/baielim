import { ResponsiveBar } from '@nivo/bar';
import chroma from 'chroma-js';

export const CountAndSumOrdersStats = ({ stats }: { stats: any }) => {
  const colors = chroma
    .scale(['#F48120', '#FFCE00', '#15783F'])
    .colors(stats?.length);

  return (
    <div className='w-full grid gap-4'>
      {!!stats.length && (
        <>
          <div className='w-full h-[480px] overflow-x-auto'>
            <ResponsiveBar
              data={stats}
              keys={['total_cost']}
              indexBy={'date'}
              margin={{ top: 10, right: 10, bottom: 80, left: 80 }}
              padding={0.2}
              innerPadding={6}
              groupMode='grouped'
              valueScale={{ type: 'linear' }}
              indexScale={{ type: 'band', round: true }}
              //@ts-ignore
              colors={({ index }) => colors[index % colors.length]}
              axisBottom={{
                tickSize: 8,
                tickPadding: 6,
                tickRotation: -60,
                legendPosition: 'middle',
                truncateTickAt: -20,
              }}
              totalsOffset={16}
              labelSkipWidth={16}
              labelSkipHeight={9}
              labelTextColor={{
                from: 'color',
                modifiers: [['darker', 2]],
              }}
              animate={true}
              tooltip={({ value }) => (
                <div className='max-w-48 text-sm bg-white rounded p-2 border border-solid border-orange-500'>
                  <p>
                    Сумма заказов:{' '}
                    {new Intl.NumberFormat('ru-RU').format(value as number)}
                  </p>
                </div>
              )}
              enableLabel={false}
            />
          </div>
          <div className='w-full h-[480px] overflow-x-auto'>
            <ResponsiveBar
              data={stats}
              keys={['count']}
              indexBy={'date'}
              margin={{ top: 10, right: 10, bottom: 80, left: 80 }}
              padding={0.2}
              innerPadding={6}
              groupMode='grouped'
              valueScale={{ type: 'linear' }}
              indexScale={{ type: 'band', round: true }}
              //@ts-ignore
              colors={({ index }) => colors[index % colors.length]}
              axisBottom={{
                tickSize: 8,
                tickPadding: 6,
                tickRotation: -60,
                legendPosition: 'middle',
                truncateTickAt: -20,
              }}
              totalsOffset={16}
              labelSkipWidth={16}
              labelSkipHeight={9}
              labelTextColor={{
                from: 'color',
                modifiers: [['darker', 2]],
              }}
              animate={true}
              tooltip={({ value }) => (
                <div className='max-w-48 text-sm bg-white rounded p-2 border border-solid border-orange-500'>
                  <p>
                    Количество заказов:{' '}
                    {new Intl.NumberFormat('ru-RU').format(value as number)}
                  </p>
                </div>
              )}
              enableLabel={false}
            />
          </div>
        </>
      )}
    </div>
  );
};
