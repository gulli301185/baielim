import { ResponsiveBar } from '@nivo/bar';
import chroma from 'chroma-js';

export const CountAndSumItemsStats = ({ stats }: { stats: any }) => {
  const colors = chroma
    .scale(['#F48120', '#FFCE00', '#15783F'])
    .colors(stats?.length);

  return (
    <div className='w-full grid gap-4'>
      {!!stats.length && (
        <>
          <div className='w-full h-[680px] overflow-x-auto'>
            <ResponsiveBar
              data={stats}
              keys={['totalCost']}
              indexBy={'name'}
              margin={{ top: 10, right: 10, bottom: 280, left: 80 }}
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
              tooltip={({ data, value }) => {
                return (
                  <div className='max-w-48 text-sm bg-white rounded p-2 border border-solid border-orange-500'>
                    <p>{data.name}</p>
                    <span>
                      Сумма товаров:{' '}
                      {new Intl.NumberFormat('ru-RU').format(value as number)}
                    </span>
                  </div>
                );
              }}
              enableLabel={false}
            />
          </div>
          <div className='w-full h-[680px] overflow-x-auto'>
            <ResponsiveBar
              data={stats}
              keys={['count']}
              indexBy={'name'}
              margin={{ top: 10, right: 10, bottom: 280, left: 80 }}
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
              tooltip={({ data, value }) => {
                return (
                  <div className='max-w-48 text-sm bg-white rounded p-2 border border-solid border-orange-500'>
                    <p>{data.name}</p>
                    <span>
                      Сумма товаров:{' '}
                      {new Intl.NumberFormat('ru-RU').format(value as number)}
                    </span>
                  </div>
                );
              }}
              enableLabel={false}
            />
          </div>
        </>
      )}
    </div>
  );
};
