type Props = {
  columns: any;
  setValue: any;
};

export const tableColumnsFunction = ({ columns, setValue }: Props) => {
  const tableColumns = columns.map((fieldConfig: any) => {
    if (fieldConfig.field === 'id') {
      return {
        ...fieldConfig,
        renderCell: (params: any) => {
          return (
            <div
              className='w-full h-full tp-center'
              onClick={(event) => {
                event.stopPropagation();
                setValue(params.row.id);
              }}
            >
              <button className='elim_button bg-red-500'>Отменить</button>
            </div>
          );
        },
      };
    } else {
      return {
        ...fieldConfig,
      };
    }
  });

  return tableColumns;
};

export const tableColumnsStockFunction = ({ columns, setValue }: Props) => {
  const tableColumns = columns.map((fieldConfig: any) => {
    if (fieldConfig.field === 'id') {
      return {
        ...fieldConfig,
        renderCell: (params: any) => {
          return (
            <div
              className='w-full h-full tp-center'
              onClick={(event) => {
                event.stopPropagation();
                setValue(params.row.id);
              }}
            >
              <button className='elim_button bg-red-500'>Удалить</button>
            </div>
          );
        },
      };
    } else {
      return {
        ...fieldConfig,
      };
    }
  });

  return tableColumns;
};
