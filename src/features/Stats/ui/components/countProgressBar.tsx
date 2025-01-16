import useCountProgressBar from '../../model/useCountProgressBar';
import CircularProgressBar from './circularProgressBar';

const CountProgressBar = () => {
  const { stats } = useCountProgressBar();

  const progressBar = [
    {
      id: 1,
      value: stats?.active_orders?.count || 0,
      subTitle: 'Количество активных заказов',
      pathColor: '#166534',
      textColor: '#166534',
      trailColor: '#4ade80',
    },
    {
      id: 2,
      value: Math.round(stats?.active_orders?.sum?.totalCost__sum || 0),
      subTitle: 'Сумма активных заказов',
      pathColor: '#22c55e',
      textColor: '#22c55e',
      trailColor: '#86efac',
    },
    {
      id: 3,
      value: stats?.archive_orders?.count || 0,
      subTitle: 'Количество архивных заказов',
      pathColor: '#991b1b',
      textColor: '#991b1b',
      trailColor: '#f87171',
    },
    {
      id: 4,
      value: Math.round(stats?.archive_orders?.sum?.totalCost__sum || 0),
      subTitle: 'Сумма архивных заказов',
      pathColor: '#ef4444',
      textColor: '#ef4444',
      trailColor: '#fca5a5',
    },
    {
      id: 5,
      value: stats?.today?.count || 0,
      subTitle: 'Количество заказов за сегодня',
      pathColor: '#1e40af',
      textColor: '#1e40af',
      trailColor: '#60a5fa',
    },
    {
      id: 6,
      value: Math.round(stats?.today?.sum?.totalCost__sum || 0),
      subTitle: 'Сумма заказов за сегодня',
      pathColor: '#3b82f6',
      textColor: '#3b82f6',
      trailColor: '#93c5fd',
    },
  ];

  return (
    <div className='w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6'>
      {progressBar.map((el) => (
        <CircularProgressBar
          key={el.id}
          value={el.value}
          subTitle={el.subTitle}
          pathColor={el.pathColor}
          textColor={el.textColor}
          trailColor={el.trailColor}
        />
      ))}
    </div>
  );
};

export default CountProgressBar;
