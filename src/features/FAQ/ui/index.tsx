import { ContentHeader, CustomPagination, DataGridTable } from '@/widgets';
import useFAQService from '../model/useFAQService';
import { columnsFAQ } from '@/shared/utils/constants/column';

const FAQ = () => {
  const { data, isLoading, isError, isFetching, handleChangePage, page } =
    useFAQService();

  return (
    <div className='w-full h-full'>
      <ContentHeader title='FAQ' url='new' />
      <DataGridTable
        error={isError}
        getRowHeight={() => 'auto'}
        rows={
          data?.results?.map((item, index) => ({
            rowNum: (page - 1) * 20 + index + 1,
            ...item,
          })) || []
        }
        columns={columnsFAQ}
        loading={isLoading || isFetching}
        nav={true}
        link={'faq/'}
      />
      <CustomPagination
        count={data?.count || 0}
        handleChangePage={handleChangePage}
      />
    </div>
  );
};

export default FAQ;
