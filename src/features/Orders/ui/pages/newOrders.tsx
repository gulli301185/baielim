import { DataGridTable, ContentHeader, CustomPagination } from "@/widgets";
import useNewOrderService from "../../model/useNewOrderService";
import {
  columnsOrder,
  columnsOrderManager,
} from "@/shared/utils/constants/column";
import ChangeOrdersDriver from "../components/changeOrdersDriver";
import SearchFilter from "@/widgets/SearchFilter";
import { tableColumnsFunction } from "@/shared/utils/helpers/tableColumnsFunction";
import ConfirmModal from "@/widgets/ConfirmModal";
import OrderInfo from "../components/orderInfo";
import ConvertToPDF from "../components/convertToPDF";
import MapCoordinates from "../components/mapCoordinates";

const NewOrders = ({ manager = false }: { manager?: boolean }) => {
  const {
    map,
    page,
    open,
    count,
    orders,
    status,
    control,
    waybill,
    orderID,
    onSubmit,
    handleMap,
    setWaybill,
    handleClose,
    countOrders,
    handleSubmit,
    handleWaybill,
    handleChangePage,
    rowSelectionModel,
    handleCancelOrder,
    handleResetFields,
    getOrdersAfterOneC,
    setRowSelectionModel,
    handleCloseOrderModal,
  } = useNewOrderService();

  return (
    <div className="w-full h-full">
      {manager ? (
        <h1 className="text-xl font-bold pb-4">Активные заказы:</h1>
      ) : (
        <ContentHeader title="Активные заказы" url="new" />
      )}
      <div className="w-full h-full">
        <SearchFilter
          control={control}
          onSubmit={onSubmit}
          handleClose={handleClose}
          handleSubmit={handleSubmit}
          handleResetFields={handleResetFields}
          rowSelectionModel={rowSelectionModel}
          getOrders={getOrdersAfterOneC}
          setWaybill={setWaybill}
          filters={{
            agent: true,
            store: true,
            driver: true,
            costType: true,
            start_date: true,
            end_date: true,
          }}
        />
        <div className="w-full mb-6 flex justify-start items-center">
          <button className="elim_button w-80" onClick={handleMap}>
            Карта магазинов
          </button>
        </div>
        <DataGridTable
          error={status === "error"}
          getRowHeight={() => "auto"}
          nav={true}
          rows={orders.map((order, index) => ({
            rowNum: (page - 1) * 80 + index + 1,
            ...order,
          }))}
          columns={tableColumnsFunction({
            columns: manager ? columnsOrderManager : columnsOrder,
            setValue: handleCloseOrderModal,
          })}
          hideFooter={true}
          pageSize={80}
          link={manager ? "" : "new-orders/"}
          checkboxSelection={!manager}
          loading={status === "loading"}
          rowSelectionModel={rowSelectionModel}
          setRowSelectionModel={setRowSelectionModel}
        />
        <CustomPagination
          count={count}
          itemsCount={80}
          handleChangePage={handleChangePage}
        />
        <OrderInfo
          count={count}
          itemsCount={countOrders?.itemsCount || 0}
          totalCost={countOrders?.totalCost || 0}
        />
      </div>
      {!!waybill && (
        <ConvertToPDF
          waybill={waybill}
          handleWaybill={handleWaybill}
          orders={orders}
          rowSelectionModel={rowSelectionModel}
        />
      )}
      {map && (
        <MapCoordinates map={map} handleMap={handleMap} orders={orders} />
      )}
      {open && (
        <ChangeOrdersDriver
          open={open}
          handleClose={handleClose}
          getNewOrders={getOrdersAfterOneC}
          rowSelectionModel={rowSelectionModel}
        />
      )}
      {orderID && (
        <ConfirmModal
          open={!!orderID}
          onClose={() => handleCloseOrderModal(null)}
          text={"Вы уверены что хотите отменить заказ"}
          onAccept={() => {
            handleCancelOrder(orderID);
            handleCloseOrderModal(null);
          }}
        />
      )}
    </div>
  );
};

export default NewOrders;
