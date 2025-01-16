import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import Error from "../Error";

const DataGridTable = ({
  rows,
  columns,
  loading,
  link = "",
  nav,
  checkboxSelection,
  rowSelectionModel,
  setRowSelectionModel,
  getRowHeight,
  hideFooter = true,
  pageSize = 20,
  error = false,
  pageSizeOptions,
}: {
  rows: any[];
  columns: any[];
  loading?: boolean;
  link?: string;
  nav: boolean;
  checkboxSelection?: boolean;
  rowSelectionModel?: any;
  setRowSelectionModel?: any;
  getRowHeight?: any;
  hideFooter?: boolean;
  pageSize?: number;
  error?: boolean;
  pageSizeOptions?: number[];
}) => {
  const navigate = useNavigate();

  return (
    <>
      {error ? (
        <div className="max-h-[600px] h-full bg-slate-100 text-green-500 rounded-md">
          <Error />
        </div>
      ) : (
        <DataGrid
          sx={{
            "& .MuiDataGrid-cell": {
              minHeight: "50px",
            },
          }}
          getRowHeight={getRowHeight}
          checkboxSelection={checkboxSelection}
          onRowSelectionModelChange={(newRowSelectionModel) => {
            setRowSelectionModel(newRowSelectionModel);
          }}
          getRowClassName={(params) => {
            return params.indexRelativeToCurrentPage % 2 === 0
              ? "bg-[rgba(34,197,94,.1)]"
              : "bg-[rgba(255,255,255,1)]";
          }}
          rowSelectionModel={rowSelectionModel}
          disableRowSelectionOnClick
          disableColumnMenu
          disableColumnFilter
          disableColumnSelector
          hideFooter={hideFooter}
          showCellVerticalBorder={true}
          showColumnVerticalBorder={true}
          onRowClick={(params) => {
            if (nav) {
              const url = `${link}${params.row.id}`;
              if (window.innerWidth > 768) {
                window.open(url, "_blank");
              } else {
                navigate(`/${url}`);
              }
            }
          }}
          pageSizeOptions={pageSizeOptions}
          rows={rows}
          getRowId={(row) => row.id}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: pageSize,
              },
            },
          }}
          loading={loading}
          style={{ fontSize: "14px" }}
          autoHeight
          slots={{
            noRowsOverlay: CustomNoRowsOverlay,
          }}
          slotProps={{
            loadingOverlay: {
              variant: "skeleton",
              noRowsVariant: "skeleton",
            },
          }}
        />
      )}
    </>
  );
};

export { DataGridTable };

const CustomNoRowsOverlay = () => {
  return (
    <div className="w-full h-full tp-center text-xl font-medium">
      Ничего не найдено!
    </div>
  );
};
