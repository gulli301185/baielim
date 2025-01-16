import { DataGridTable } from '@/widgets';

interface Stat {
  [key: string]: any;
}

interface CountAndSumTableProps<T> {
  stats: T[];
  text: string;
  columns: any[];
}

const CountAndSumTable = <T extends Stat>({
  stats,
  text,
  columns,
}: CountAndSumTableProps<T>) => {
  return (
    <div className='px-2 pb-10'>
      <p className='text-xl font-semibold mb-4'>{text}:</p>
      <DataGridTable
        rows={stats.map((stat, index) => ({
          rowNum: index + 1,
          id: index + 1,
          ...stat,
        }))}
        columns={columns}
        nav={false}
        hideFooter={false}
      />
    </div>
  );
};

export default CountAndSumTable;
