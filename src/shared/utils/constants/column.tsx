import {
  IAgents,
  IDayPlan,
  IDeletionRequest,
  IDrivers,
  IFAQ,
  IItem,
  IItemMargins,
  IOrderHistory,
  IOrderReturn,
  IOrders,
  IStatistic,
  IStatisticItems,
  IStocks,
  IStoreDayPlan,
  IStoreSales,
  IStores,
  ITransactionOrder,
} from "@/shared/types";

import { GridColDef } from "@mui/x-data-grid";
import KeyboardDoubleArrowDownOutlined from "@mui/icons-material/KeyboardDoubleArrowRightOutlined";
import KeyboardDoubleArrowRightOutlined from "@mui/icons-material/KeyboardDoubleArrowRightOutlined";
import { formatDateToTimestamp } from "../helpers/formatDateToTimestamp";
import noIMG from "@/shared/assets/noImg.png";
import { translateDayOfWeek } from "../helpers/translateDayOfWeek";
import { translateStatus } from "../helpers/translateStatus";
import { useState } from "react";

export const columnsStock: GridColDef<IStocks>[] = [
  {
    field: "rowNum",
    headerName: "#",
    width: 50,
  },
  {
    field: "photo",
    headerName: "Фото",
    width: 100,
    sortable: false,
    renderCell: ({ row }) => {
      return (
        <img
          className="w-full h-full object-cover py-1"
          src={row.photo || noIMG}
          alt="*"
          loading="lazy"
          onError={(e) => {
            (e.target as HTMLImageElement).onerror = null;
            (e.target as HTMLImageElement).src = noIMG;
          }}
        />
      );
    },
  },
  {
    field: "title",
    headerName: "Заголовок",
    width: 350,
    sortable: false,
  },
  {
    field: "description",
    headerName: "Описание",
    minWidth: 300,
    flex: 1,
    sortable: false,
  },
  {
    field: "deadline",
    headerName: "Срок окончания",
    width: 170,
    sortable: false,
  },
  {
    field: "id",
    headerName: "Удалить",
    width: 140,
    sortable: false,
  },
];

export const columnsAgent: GridColDef<IAgents>[] = [
  {
    field: "rowNum",
    headerName: "#",
    width: 50,
  },

  {
    field: "photo",
    headerName: "Аватар",
    width: 100,
    sortable: false,
    renderCell: ({ row }) => {
      return (
        <img
          className="w-full h-full object-cover py-1"
          src={row.photo || noIMG}
          alt="*"
          loading="lazy"
          onError={(e) => {
            (e.target as HTMLImageElement).onerror = null;
            (e.target as HTMLImageElement).src = noIMG;
          }}
        />
      );
    },
  },
  {
    field: "name",
    headerName: "ФИО",
    minWidth: 200,
    flex: 1,
    sortable: false,
  },
  {
    field: "login",
    headerName: "Логин",
    minWidth: 200,
    flex: 1,
    sortable: false,
  },
  {
    field: "birthdate",
    headerName: "День рождения",
    width: 170,
    sortable: false,
  },
  {
    field: "address",
    headerName: "Адрес",
    width: 170,
    sortable: false,
  },
  {
    field: "phoneNumber",
    headerName: "Номер телефона",
    width: 170,
    sortable: false,
  },
  {
    field: "passport_front",
    headerName: "П.фронт",
    width: 100,
    sortable: false,
    renderCell: ({ row }) => {
      return (
        <img
          className="w-full h-full object-cover py-1"
          src={row.passport_front || noIMG}
          alt="*"
          loading="lazy"
          onError={(e) => {
            (e.target as HTMLImageElement).onerror = null;
            (e.target as HTMLImageElement).src = noIMG;
          }}
        />
      );
    },
  },
  {
    field: "passport_back",
    headerName: "П.обрат",
    width: 100,
    sortable: false,
    renderCell: ({ row }) => {
      return (
        <img
          className="w-full h-full object-cover py-1"
          src={row.passport_back || noIMG}
          alt="*"
          loading="lazy"
          onError={(e) => {
            (e.target as HTMLImageElement).onerror = null;
            (e.target as HTMLImageElement).src = noIMG;
          }}
        />
      );
    },
  },
  {
    field: "costTypes",
    headerName: "Категория ТТ",
    width: 180,
    sortable: false,
    renderCell: ({ row }) => {
      return (
        <div className="w-full h-full flex flex-col gap-2 truncate !overflow-y-scroll">
          {row?.costTypes?.map((type) => (
            <span className="h-4" key={type.id}>
              {type.name}
            </span>
          ))}
        </div>
      );
    },
  },
];

export const columnsOrder: GridColDef<IOrders>[] = [
  {
    field: "rowNum",
    headerName: "#",
    width: 50,
  },
  {
    field: "is_sync_oneC",
    headerName: "1С",
    width: 50,
    sortable: false,
    renderCell: ({ row }) => {
      return <div>{row?.is_sync_oneC ? "✅" : "❌"}</div>;
    },
  },
  {
    field: "is_sync_oneCcode",
    headerName: "1С Код",
    width: 100,
    sortable: false,
    renderCell: ({ row }) => {
      return <div>{row?.store?.oneC_code}</div>;
    },
  },
  {
    field: "address",
    headerName: "Адрес контрагента",
    width: 200,
    sortable: false,
    renderCell: ({ row }) => {
      return <div>{row?.store?.address}</div>;
    },
  },
  {
    field: "dateCreated",
    headerName: "Дата офор",
    width: 150,
    sortable: false,
    renderCell: ({ row }) => {
      const currentDate = new Date();
      const dateCreated = new Date(row?.dateCreated || currentDate);
      const diffTime = Math.abs(currentDate.getTime() - dateCreated.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      const cellStyle = {
        backgroundColor: diffDays > 5 ? "red" : "transparent",
        color: diffDays > 5 ? "white" : "inherit",
      };

      return (
        <div className="w-full h-full flex py-1" style={cellStyle}>
          {formatDateToTimestamp(row?.dateCreated)}
        </div>
      );
    },
  },
  {
    field: "shipping_date",
    headerName: "Дата отгрузки",
    width: 150,
    sortable: false,
    renderCell: ({ row }) => {
      return <div>{formatDateToTimestamp(row?.shipping_date)}</div>;
    },
  },
  {
    field: "store",
    headerName: "Магазин",
    width: 170,
    sortable: false,
    renderCell: ({ row }) => {
      return <div>{row?.store?.name}</div>;
    },
  },
  {
    field: "agent",
    headerName: "Агент",
    width: 170,
    sortable: false,
    renderCell: ({ row }) => {
      return <div>{row?.agent?.name}</div>;
    },
  },
  {
    field: "driver",
    headerName: "Водитель",
    width: 170,
    sortable: false,
    renderCell: ({ row }) => {
      return <div>{row?.driver?.name}</div>;
    },
  },
  {
    field: "costType",
    headerName: "Категория ТТ",
    width: 180,
    sortable: false,
    renderCell: ({ row }) => {
      return <div>{row?.costType?.name}</div>;
    },
  },
  {
    field: "items",
    headerName: "Товар",
    minWidth: 250,
    flex: 1,
    sortable: false,
    renderCell: ({ row }) => {
      const [open, setOpen] = useState(false);
      return (
        <div className="relative w-full h-full flex justify-between truncate items-start">
          <div className="flex flex-col gap-2 ">
            {row?.items?.map((item, index) => (
              <div key={item?.id} className="flex justify-between items-start">
                <div className="flex flex-col">
                  <span className="">
                    {index + 1}) {item?.item?.name}
                  </span>
                  {open && (
                    <div className="flex flex-col gap-y-1 py-2">
                      <div className="border-[1px] px-1 py-2 leading-5 border-solid border-[#ccc]  p-[px] col-span-2">
                        Количество:{" "}
                        <strong>
                          {parseFloat(item?.count?.toFixed(0)).toLocaleString(
                            "ru-RU"
                          )}
                        </strong>
                      </div>
                      <div className="border-[1px] px-1 py-2 leading-5 border-solid border-[#ccc] p-[px]">
                        Стоимость продажи:{" "}
                        <strong>
                          {parseFloat(
                            item?.soldCost?.toFixed(0)
                          ).toLocaleString("ru-RU")}
                        </strong>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setOpen(!open);
            }}
            className="absolute right-0 top-1 bg-[#22c55e] rounded-full"
          >
            {!!row?.items?.length &&
              (open ? (
                <KeyboardDoubleArrowDownOutlined />
              ) : (
                <KeyboardDoubleArrowRightOutlined />
              ))}
          </button>
        </div>
      );
    },
  },
  {
    field: "totalCost",
    headerName: "Общая сумма",
    width: 140,
    sortable: false,
    renderCell: ({ row }) => {
      return (
        <div>
          {parseFloat(row?.totalCost?.toFixed(0)).toLocaleString("ru-RU")}
        </div>
      );
    },
  },
  {
    field: "weight",
    headerName: "Вес",
    width: 90,
    sortable: false,
    renderCell: ({ row }) => {
      return (
        <div>{parseFloat(row?.weight?.toFixed(0)).toLocaleString("ru-RU")}</div>
      );
    },
  },
  {
    field: "id",
    headerName: "Отменить",
    width: 140,
    sortable: false,
  },
];

export const columnsCancelledOrder: GridColDef<IOrders>[] = [
  {
    field: "rowNum",
    headerName: "#",
    width: 50,
  },
  {
    field: "is_sync_oneC",
    headerName: "1С",
    width: 50,
    sortable: false,
    renderCell: ({ row }) => {
      return <div>{row?.is_sync_oneC ? "✅" : "❌"}</div>;
    },
  },
  {
    field: "is_sync_oneCcode",
    headerName: "1С Код",
    width: 100,
    sortable: false,
    renderCell: ({ row }) => {
      return <div>{row?.store?.oneC_code}</div>;
    },
  },
  {
    field: "address",
    headerName: "Адрес контрагента",
    width: 200,
    sortable: false,
    renderCell: ({ row }) => {
      return <div>{row?.store?.address}</div>;
    },
  },
  {
    field: "dateCreated",
    headerName: "Дата офор",
    width: 150,
    sortable: false,
    renderCell: ({ row }) => {
      const currentDate = new Date();
      const dateCreated = new Date(row?.dateCreated || currentDate);
      const diffTime = Math.abs(currentDate.getTime() - dateCreated.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      const cellStyle = {
        backgroundColor: diffDays > 5 ? "red" : "transparent",
        color: diffDays > 5 ? "white" : "inherit",
      };

      return (
        <div className="w-full h-full flex py-1" style={cellStyle}>
          {formatDateToTimestamp(row?.dateCreated)}
        </div>
      );
    },
  },
  {
    field: "shipping_date",
    headerName: "Дата отгрузки",
    width: 150,
    sortable: false,
    renderCell: ({ row }) => {
      return <div>{formatDateToTimestamp(row?.shipping_date)}</div>;
    },
  },
  {
    field: "store",
    headerName: "Магазин",
    width: 170,
    sortable: false,
    renderCell: ({ row }) => {
      return <div>{row?.store?.name}</div>;
    },
  },
  {
    field: "agent",
    headerName: "Агент",
    width: 170,
    sortable: false,
    renderCell: ({ row }) => {
      return <div>{row?.agent?.name}</div>;
    },
  },
  {
    field: "driver",
    headerName: "Водитель",
    width: 170,
    sortable: false,
    renderCell: ({ row }) => {
      return <div>{row?.driver?.name}</div>;
    },
  },
  {
    field: "costType",
    headerName: "Категория ТТ",
    width: 180,
    sortable: false,
    renderCell: ({ row }) => {
      return <div>{row?.costType?.name}</div>;
    },
  },
  {
    field: "items",
    headerName: "Товар",
    minWidth: 250,
    flex: 1,
    sortable: false,
    renderCell: ({ row }) => {
      const [open, setOpen] = useState(false);
      return (
        <div className="relative w-full h-full flex justify-between truncate items-start">
          <div className="flex flex-col gap-2 ">
            {row?.items?.map((item, index) => (
              <div key={item?.id} className="flex justify-between items-start">
                <div className="flex flex-col">
                  <span className="">
                    {index + 1}) {item?.item?.name}
                  </span>
                  {open && (
                    <div className="flex flex-col gap-y-1 py-2">
                      <div className="border-[1px] px-1 py-2 leading-5 border-solid border-[#ccc]  p-[px] col-span-2">
                        Количество:{" "}
                        <strong>
                          {parseFloat(item?.count?.toFixed(0)).toLocaleString(
                            "ru-RU"
                          )}
                        </strong>
                      </div>
                      <div className="border-[1px] px-1 py-2 leading-5 border-solid border-[#ccc] p-[px]">
                        Стоимость продажи:{" "}
                        <strong>
                          {parseFloat(
                            item?.soldCost?.toFixed(0)
                          ).toLocaleString("ru-RU")}
                        </strong>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setOpen(!open);
            }}
            className="absolute right-0 top-1 bg-[#22c55e] rounded-full"
          >
            {!!row?.items?.length &&
              (open ? (
                <KeyboardDoubleArrowDownOutlined />
              ) : (
                <KeyboardDoubleArrowRightOutlined />
              ))}
          </button>
        </div>
      );
    },
  },
  {
    field: "amountLeft",
    headerName: "Остаток суммы",
    width: 160,
    sortable: false,
    renderCell: ({ row }) => {
      return (
        <div>
          {parseFloat(row?.amountLeft?.toFixed(0)).toLocaleString("ru-RU")}
        </div>
      );
    },
  },
  {
    field: "totalCost",
    headerName: "Общая сумма",
    width: 140,
    sortable: false,
    renderCell: ({ row }) => {
      return (
        <div>
          {parseFloat(row?.totalCost?.toFixed(0)).toLocaleString("ru-RU")}
        </div>
      );
    },
  },
  {
    field: "weight",
    headerName: "Вес",
    width: 90,
    sortable: false,
    renderCell: ({ row }) => {
      return (
        <div>{parseFloat(row?.weight?.toFixed(0)).toLocaleString("ru-RU")}</div>
      );
    },
  },
];

export const columnsDebtOrder: GridColDef<IOrders>[] = [
  {
    field: "rowNum",
    headerName: "#",
    width: 50,
  },
  {
    field: "is_sync_oneC",
    headerName: "1С",
    width: 50,
    sortable: false,
    renderCell: ({ row }) => {
      return <div>{row?.is_sync_oneC ? "✅" : "❌"}</div>;
    },
  },
  {
    field: "is_sync_oneCcode",
    headerName: "1С Код",
    width: 100,
    sortable: false,
    renderCell: ({ row }) => {
      return <div>{row?.store?.oneC_code}</div>;
    },
  },
  {
    field: "address",
    headerName: "Адрес контрагента",
    width: 200,
    sortable: false,
    renderCell: ({ row }) => {
      return <div>{row?.store?.address}</div>;
    },
  },
  {
    field: "dateCreated",
    headerName: "Дата офор",
    width: 150,
    sortable: false,
    renderCell: ({ row }) => {
      const currentDate = new Date();
      const dateCreated = new Date(row?.dateCreated || currentDate);
      const diffTime = Math.abs(currentDate.getTime() - dateCreated.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      const cellStyle = {
        backgroundColor: diffDays > 5 ? "red" : "transparent",
        color: diffDays > 5 ? "white" : "inherit",
      };

      return (
        <div className="w-full h-full flex py-1" style={cellStyle}>
          {formatDateToTimestamp(row?.dateCreated)}
        </div>
      );
    },
  },
  {
    field: "shipping_date",
    headerName: "Дата отгрузки",
    width: 150,
    sortable: false,
    renderCell: ({ row }) => {
      return <div>{formatDateToTimestamp(row?.shipping_date)}</div>;
    },
  },
  {
    field: "store",
    headerName: "Магазин",
    width: 170,
    sortable: false,
    renderCell: ({ row }) => {
      return <div>{row?.store?.name}</div>;
    },
  },
  {
    field: "agent",
    headerName: "Агент",
    width: 170,
    sortable: false,
    renderCell: ({ row }) => {
      return <div>{row?.agent?.name}</div>;
    },
  },
  {
    field: "driver",
    headerName: "Водитель",
    width: 170,
    sortable: false,
    renderCell: ({ row }) => {
      return <div>{row?.driver?.name}</div>;
    },
  },
  {
    field: "costType",
    headerName: "Категория ТТ",
    width: 180,
    sortable: false,
    renderCell: ({ row }) => {
      return <div>{row?.costType?.name}</div>;
    },
  },
  {
    field: "items",
    headerName: "Товар",
    minWidth: 250,
    flex: 1,
    sortable: false,
    renderCell: ({ row }) => {
      const [open, setOpen] = useState(false);
      return (
        <div className="relative w-full h-full flex justify-between truncate items-start">
          <div className="flex flex-col gap-2 ">
            {row?.items?.map((item, index) => (
              <div key={item?.id} className="flex justify-between items-start">
                <div className="flex flex-col">
                  <span className="">
                    {index + 1}) {item?.item?.name}
                  </span>
                  {open && (
                    <div className="flex flex-col gap-y-1 py-2">
                      <div className="border-[1px] px-1 py-2 leading-5 border-solid border-[#ccc]  p-[px] col-span-2">
                        Количество:{" "}
                        <strong>
                          {parseFloat(item?.count?.toFixed(0)).toLocaleString(
                            "ru-RU"
                          )}
                        </strong>
                      </div>
                      <div className="border-[1px] px-1 py-2 leading-5 border-solid border-[#ccc] p-[px]">
                        Стоимость продажи:{" "}
                        <strong>
                          {parseFloat(
                            item?.soldCost?.toFixed(0)
                          ).toLocaleString("ru-RU")}
                        </strong>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setOpen(!open);
            }}
            className="absolute right-0 top-1 bg-[#22c55e] rounded-full"
          >
            {row?.items?.length ? (
              open ? (
                <KeyboardDoubleArrowDownOutlined />
              ) : (
                <KeyboardDoubleArrowRightOutlined />
              )
            ) : (
              ""
            )}
          </button>
        </div>
      );
    },
  },
  {
    field: "amountLeft",
    headerName: "Остаток суммы",
    width: 160,
    sortable: false,
    renderCell: ({ row }) => {
      return (
        <div>
          {parseFloat(row?.amountLeft?.toFixed(0)).toLocaleString("ru-RU")}
        </div>
      );
    },
  },
  {
    field: "totalCost",
    headerName: "Общая сумма",
    width: 140,
    sortable: false,
    renderCell: ({ row }) => {
      return (
        <div>
          {parseFloat(row?.totalCost?.toFixed(0)).toLocaleString("ru-RU")}
        </div>
      );
    },
  },
  {
    field: "weight",
    headerName: "Вес",
    width: 90,
    sortable: false,
    renderCell: ({ row }) => {
      return (
        <div>{parseFloat(row?.weight?.toFixed(0)).toLocaleString("ru-RU")}</div>
      );
    },
  },
];

export const columnsArchiveOrder: GridColDef<IOrders>[] = [
  {
    field: "rowNum",
    headerName: "#",
    width: 50,
  },
  {
    field: "is_sync_oneC",
    headerName: "1С",
    width: 50,
    sortable: false,
    renderCell: ({ row }) => {
      return <div>{row?.is_sync_oneC ? "✅" : "❌"}</div>;
    },
  },
  {
    field: "is_sync_oneCcode",
    headerName: "1С Код",
    width: 100,
    sortable: false,
    renderCell: ({ row }) => {
      return <div>{row?.store?.oneC_code}</div>;
    },
  },
  {
    field: "address",
    headerName: "Адрес контрагента",
    width: 200,
    sortable: false,
    renderCell: ({ row }) => {
      return <div>{row?.store?.address}</div>;
    },
  },

  {
    field: "dateCreated",
    headerName: "Дата офор",
    width: 150,
    sortable: false,
    renderCell: ({ row }) => {
      const currentDate = new Date();
      const dateCreated = new Date(row?.dateCreated || currentDate);
      const diffTime = Math.abs(currentDate.getTime() - dateCreated.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      const cellStyle = {
        backgroundColor: diffDays > 5 ? "red" : "transparent",
        color: diffDays > 5 ? "white" : "inherit",
      };

      return (
        <div className="w-full h-full flex py-1" style={cellStyle}>
          {formatDateToTimestamp(row?.dateCreated)}
        </div>
      );
    },
  },
  {
    field: "shipping_date",
    headerName: "Дата отгрузки",
    width: 150,
    sortable: false,
    renderCell: ({ row }) => {
      return <div>{formatDateToTimestamp(row?.shipping_date)}</div>;
    },
  },
  {
    field: "store",
    headerName: "Магазин",
    width: 170,
    sortable: false,
    renderCell: ({ row }) => {
      return <div>{row?.store?.name}</div>;
    },
  },
  {
    field: "agent",
    headerName: "Агент",
    width: 170,
    sortable: false,
    renderCell: ({ row }) => {
      return <div>{row?.agent?.name}</div>;
    },
  },
  {
    field: "driver",
    headerName: "Водитель",
    width: 170,
    sortable: false,
    renderCell: ({ row }) => {
      return <div>{row?.driver?.name}</div>;
    },
  },
  {
    field: "costType",
    headerName: "Категория ТТ",
    width: 180,
    sortable: false,
    renderCell: ({ row }) => {
      return <div>{row?.costType?.name}</div>;
    },
  },
  {
    field: "items",
    headerName: "Товар",
    minWidth: 250,
    flex: 1,
    sortable: false,
    renderCell: ({ row }) => {
      const [open, setOpen] = useState(false);
      return (
        <div className="relative w-full h-full flex justify-between truncate items-start">
          <div className="flex flex-col gap-2 ">
            {row?.items?.map((item, index) => (
              <div key={item?.id} className="flex justify-between items-start">
                <div className="flex flex-col">
                  <span className="">
                    {index + 1}) {item?.item?.name}
                  </span>
                  {open && (
                    <div className="flex flex-col gap-y-1 py-2">
                      <div className="border-[1px] px-1 py-2 leading-5 border-solid border-[#ccc]  p-[px] col-span-2">
                        Количество:{" "}
                        <strong>
                          {parseFloat(item?.count?.toFixed(0)).toLocaleString(
                            "ru-RU"
                          )}
                        </strong>
                      </div>
                      <div className="border-[1px] px-1 py-2 leading-5 border-solid border-[#ccc] p-[px]">
                        Стоимость продажи:{" "}
                        <strong>
                          {parseFloat(
                            item?.soldCost?.toFixed(0)
                          ).toLocaleString("ru-RU")}
                        </strong>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setOpen(!open);
            }}
            className="absolute right-0 top-1 bg-[#22c55e] rounded-full"
          >
            {row?.items?.length ? (
              open ? (
                <KeyboardDoubleArrowDownOutlined />
              ) : (
                <KeyboardDoubleArrowRightOutlined />
              )
            ) : (
              ""
            )}
          </button>
        </div>
      );
    },
  },
  {
    field: "amountLeft",
    headerName: "Остаток суммы",
    width: 160,
    sortable: false,
    renderCell: ({ row }) => {
      return (
        <div>
          {parseFloat(row?.amountLeft?.toFixed(0)).toLocaleString("ru-RU")}
        </div>
      );
    },
  },
  {
    field: "totalCost",
    headerName: "Общая сумма",
    width: 140,
    sortable: false,
    renderCell: ({ row }) => {
      return (
        <div>
          {parseFloat(row?.totalCost?.toFixed(0)).toLocaleString("ru-RU")}
        </div>
      );
    },
  },
  {
    field: "weight",
    headerName: "Вес",
    width: 90,
    sortable: false,
    renderCell: ({ row }) => {
      return (
        <div>{parseFloat(row?.weight?.toFixed(0)).toLocaleString("ru-RU")}</div>
      );
    },
  },
];

export const columnsAgentNewOrder: GridColDef<IOrders>[] = [
  {
    field: "rowNum",
    headerName: "#",
    width: 50,
  },
  {
    field: "is_sync_oneC",
    headerName: "1С",
    width: 50,
    sortable: false,
    renderCell: ({ row }) => {
      return <div>{row?.is_sync_oneC ? "✅" : "❌"}</div>;
    },
  },
  {
    field: "is_sync_oneCcode",
    headerName: "1С Код",
    width: 100,
    sortable: false,
    renderCell: ({ row }) => {
      return <div>{row?.store?.oneC_code}</div>;
    },
  },
  {
    field: "address",
    headerName: "Адрес контрагента",
    width: 200,
    sortable: false,
    renderCell: ({ row }) => {
      return <div>{row?.store?.address}</div>;
    },
  },
  {
    field: "dateCreated",
    headerName: "Дата офор",
    width: 150,
    sortable: false,
    renderCell: ({ row }) => {
      const currentDate = new Date();
      const dateCreated = new Date(row?.dateCreated || currentDate);
      const diffTime = Math.abs(currentDate.getTime() - dateCreated.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      const cellStyle = {
        backgroundColor: diffDays > 5 ? "red" : "transparent",
        color: diffDays > 5 ? "white" : "inherit",
      };

      return (
        <div className="w-full h-full flex py-1" style={cellStyle}>
          {formatDateToTimestamp(row?.dateCreated)}
        </div>
      );
    },
  },
  {
    field: "shipping_date",
    headerName: "Дата отгрузки",
    width: 150,
    sortable: false,
    renderCell: ({ row }) => {
      return <div>{formatDateToTimestamp(row?.shipping_date)}</div>;
    },
  },
  {
    field: "store",
    headerName: "Магазин",
    width: 170,
    sortable: false,
    renderCell: ({ row }) => {
      return <div>{row?.store?.name}</div>;
    },
  },
  {
    field: "agent",
    headerName: "Агент",
    width: 170,
    sortable: false,
    renderCell: ({ row }) => {
      return <div>{row?.agent?.name}</div>;
    },
  },
  {
    field: "driver",
    headerName: "Водитель",
    width: 170,
    sortable: false,
    renderCell: ({ row }) => {
      return <div>{row?.driver?.name}</div>;
    },
  },
  {
    field: "costType",
    headerName: "Категория ТТ",
    width: 180,
    sortable: false,
    renderCell: ({ row }) => {
      return <div>{row?.costType?.name}</div>;
    },
  },
  {
    field: "items",
    headerName: "Товар",
    minWidth: 250,
    flex: 1,
    sortable: false,
    renderCell: ({ row }) => {
      const [open, setOpen] = useState(false);
      return (
        <div className="relative w-full h-full flex justify-between truncate items-start">
          <div className="flex flex-col gap-2 ">
            {row?.items?.map((item, index) => (
              <div key={item?.id} className="flex justify-between items-start">
                <div className="flex flex-col">
                  <span className="">
                    {index + 1}) {item?.item?.name}
                  </span>
                  {open && (
                    <div className="flex flex-col gap-y-1 py-2">
                      <div className="border-[1px] px-1 py-2 leading-5 border-solid border-[#ccc]  p-[px] col-span-2">
                        Количество:{" "}
                        <strong>
                          {parseFloat(item?.count?.toFixed(0)).toLocaleString(
                            "ru-RU"
                          )}
                        </strong>
                      </div>
                      <div className="border-[1px] px-1 py-2 leading-5 border-solid border-[#ccc] p-[px]">
                        Стоимость продажи:{" "}
                        <strong>
                          {parseFloat(
                            item?.soldCost?.toFixed(0)
                          ).toLocaleString("ru-RU")}
                        </strong>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setOpen(!open);
            }}
            className="absolute right-0 top-1 bg-[#22c55e] rounded-full"
          >
            {row?.items?.length ? (
              open ? (
                <KeyboardDoubleArrowDownOutlined />
              ) : (
                <KeyboardDoubleArrowRightOutlined />
              )
            ) : (
              ""
            )}
          </button>
        </div>
      );
    },
  },
  {
    field: "amountLeft",
    headerName: "Остаток суммы",
    width: 160,
    sortable: false,
    renderCell: ({ row }) => {
      return (
        <div>
          {parseFloat(row?.amountLeft?.toFixed(0)).toLocaleString("ru-RU")}
        </div>
      );
    },
  },
  {
    field: "totalCost",
    headerName: "Общая сумма",
    width: 140,
    sortable: false,
    renderCell: ({ row }) => {
      return (
        <div>
          {parseFloat(row?.totalCost?.toFixed(0)).toLocaleString("ru-RU")}
        </div>
      );
    },
  },
  {
    field: "weight",
    headerName: "Вес",
    width: 90,
    sortable: false,
    renderCell: ({ row }) => {
      return (
        <div>{parseFloat(row?.weight?.toFixed(0)).toLocaleString("ru-RU")}</div>
      );
    },
  },
];
//???  Туруп турсун анан кором хоп
export const columnsOrderManager: GridColDef<IOrders>[] = [
  {
    field: "rowNum",
    headerName: "#",
    width: 50,
  },
  {
    field: "is_sync_oneC",
    headerName: "1С",
    width: 50,
    sortable: false,
    renderCell: ({ row }) => {
      return <div>{row?.is_sync_oneC ? "✅" : "❌"}</div>;
    },
  },
  {
    field: "is_sync_oneCcode",
    headerName: "1С Код",
    width: 100,
    sortable: false,
    renderCell: ({ row }) => {
      return <div>{row?.store?.oneC_code}</div>;
    },
  },
  {
    field: "address",
    headerName: "Адрес контрагента",
    width: 200,
    sortable: false,
    renderCell: ({ row }) => {
      return <div>{row?.store?.address}</div>;
    },
  },
  {
    field: "dateCreated",
    headerName: "Дата офор",
    width: 150,
    sortable: false,
    renderCell: ({ row }) => {
      const currentDate = new Date();
      const dateCreated = new Date(row?.dateCreated || currentDate);
      const diffTime = Math.abs(currentDate.getTime() - dateCreated.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      const cellStyle = {
        backgroundColor: diffDays > 5 ? "red" : "transparent",
        color: diffDays > 5 ? "white" : "inherit",
      };

      return (
        <div className="w-full h-full flex py-1" style={cellStyle}>
          {formatDateToTimestamp(row?.dateCreated)}
        </div>
      );
    },
  },
  {
    field: "shipping_date",
    headerName: "Дата отгрузки",
    width: 150,
    sortable: false,
    renderCell: ({ row }) => {
      return <div>{formatDateToTimestamp(row?.shipping_date)}</div>;
    },
  },
  {
    field: "store",
    headerName: "Магазин",
    width: 170,
    sortable: false,
    renderCell: ({ row }) => {
      return <div>{row?.store?.name}</div>;
    },
  },
  {
    field: "agent",
    headerName: "Агент",
    width: 170,
    sortable: false,
    renderCell: ({ row }) => {
      return <div>{row?.agent?.name}</div>;
    },
  },
  {
    field: "driver",
    headerName: "Водитель",
    width: 170,
    sortable: false,
    renderCell: ({ row }) => {
      return <div>{row?.driver?.name}</div>;
    },
  },
  {
    field: "costType",
    headerName: "Категория ТТ",
    width: 180,
    sortable: false,
    renderCell: ({ row }) => {
      return <div>{row?.costType?.name}</div>;
    },
  },
  {
    field: "items",
    headerName: "Товар",
    minWidth: 250,
    flex: 1,
    sortable: false,
    renderCell: ({ row }) => {
      const [open, setOpen] = useState(false);
      return (
        <div className="relative w-full h-full flex justify-between truncate items-start">
          <div className="flex flex-col gap-2 ">
            {row?.items?.map((item, index) => (
              <div key={item?.id} className="flex justify-between items-start">
                <div className="flex flex-col">
                  <span className="">
                    {index + 1}) {item?.item?.name}
                  </span>
                  {open && (
                    <div className="flex flex-col gap-y-1 py-2">
                      <div className="border-[1px] px-1 py-2 leading-5 border-solid border-[#ccc]  p-[px] col-span-2">
                        Количество:{" "}
                        <strong>
                          {parseFloat(item?.count?.toFixed(0)).toLocaleString(
                            "ru-RU"
                          )}
                        </strong>
                      </div>
                      <div className="border-[1px] px-1 py-2 leading-5 border-solid border-[#ccc] p-[px]">
                        Стоимость продажи:{" "}
                        <strong>
                          {parseFloat(
                            item?.soldCost?.toFixed(0)
                          ).toLocaleString("ru-RU")}
                        </strong>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setOpen(!open);
            }}
            className="absolute right-0 top-1 bg-[#22c55e] rounded-full"
          >
            {!!row?.items?.length &&
              (open ? (
                <KeyboardDoubleArrowDownOutlined />
              ) : (
                <KeyboardDoubleArrowRightOutlined />
              ))}
          </button>
        </div>
      );
    },
  },
  {
    field: "totalCost",
    headerName: "Общая сумма",
    width: 140,
    sortable: false,
    renderCell: ({ row }) => {
      return (
        <div>
          {parseFloat(row?.totalCost?.toFixed(0)).toLocaleString("ru-RU")}
        </div>
      );
    },
  },
  {
    field: "weight",
    headerName: "Вес",
    width: 90,
    sortable: false,
    renderCell: ({ row }) => {
      return (
        <div>{parseFloat(row?.weight?.toFixed(0)).toLocaleString("ru-RU")}</div>
      );
    },
  },
];

export const columnsStore: GridColDef<IStores>[] = [
  {
    field: "rowNum",
    headerName: "#",
    width: 50,
  },
  {
    field: "dateCreated",
    headerName: "Дата создания",
    width: 160,
    sortable: false,
    renderCell: ({ row }) => {
      return <div>{formatDateToTimestamp(row?.dateCreated)}</div>;
    },
  },
  {
    field: "photo",
    headerName: "Фото",
    width: 100,
    sortable: false,
    renderCell: ({ row }) => {
      return (
        <img
          className="w-full h-full object-cover py-1"
          src={row.photo || noIMG}
          alt="*"
          onError={(e) => {
            (e.target as HTMLImageElement).onerror = null;
            (e.target as HTMLImageElement).src = noIMG;
          }}
        />
      );
    },
  },
  {
    field: "name",
    headerName: "Название",
    flex: 1,
    sortable: false,
  },

  {
    field: "login",
    headerName: "Логин",
    flex: 1,
    sortable: false,
  },
  {
    field: "store_agent",
    headerName: "Агент",
    flex: 1,
    sortable: false,
    renderCell: ({ row }) => {
      return <div>{row?.store_agent?.name}</div>;
    },
  },
  {
    field: "region",
    headerName: "Регион",
    width: 130,
    sortable: false,
    renderCell: ({ row }) => {
      return <div>{row?.region?.name}</div>;
    },
  },
  {
    field: "costType",
    headerName: "Категория ТТ",
    width: 150,
    sortable: false,
    renderCell: ({ row }) => {
      return <div>{row?.costType?.name}</div>;
    },
  },
];

export const columnsDayPlan: GridColDef<IDayPlan>[] = [
  {
    field: "rowNum",
    headerName: "#",
    width: 50,
  },
  {
    field: "day",
    headerName: "День недели",
    width: 150,
    sortable: false,
    renderCell: ({ row }) => {
      return <div>{translateDayOfWeek(row?.day || "")}</div>;
    },
  },
  {
    field: "status",
    headerName: "Статус",
    width: 150,
    sortable: false,
    renderCell: ({ row }) => {
      return <div>{translateStatus(row?.status || "")}</div>;
    },
  },
  {
    field: "agent",
    headerName: "Агент",
    width: 300,
    sortable: false,
    renderCell: ({ row }) => {
      return <div>{row?.agent?.name}</div>;
    },
  },
  {
    field: "driver",
    headerName: "Водитель",
    width: 300,
    sortable: false,
    renderCell: ({ row }) => {
      return <div>{row?.driver?.name}</div>;
    },
  },
  {
    field: "stores_plan",
    headerName: "Планы магазин",
    minWidth: 300,
    flex: 1,
    sortable: false,
    renderCell: ({ row }) => {
      const [open, setOpen] = useState(false);

      return (
        <div className="relative w-full h-full justify-between items-start truncate">
          <div
            className={`flex flex-col gap-2 ${open ? "h-auto" : "h-[50px]"}`}
          >
            {row?.stores_plan?.map((plan, index) => (
              <span key={plan?.id}>
                {index + 1}) {plan?.store?.name}, Статус:{" "}
                {translateStatus(plan?.status || "")}, Заказано:
                {plan.madeOrder ? "✅" : "❌"}
              </span>
            ))}
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setOpen(!open);
            }}
            className="absolute right-0 top-1 bg-[#22c55e] rounded-full"
          >
            {!!row?.stores_plan?.length &&
              (open ? (
                <KeyboardDoubleArrowDownOutlined />
              ) : (
                <KeyboardDoubleArrowRightOutlined />
              ))}
          </button>
        </div>
      );
    },
  },
  {
    field: "dateCreated",
    headerName: "Дата создания",
    width: 150,
    sortable: false,
    renderCell: ({ row }) => {
      return <div>{formatDateToTimestamp(row?.dateCreated)}</div>;
    },
  },
];

export const columnsStoreDayPlan: GridColDef<IStoreDayPlan>[] = [
  {
    field: "rowNum",
    headerName: "#",
    width: 50,
  },
  {
    field: "photo",
    headerName: "Фото",
    width: 100,
    sortable: false,
    renderCell: ({ row }) => {
      return (
        <img
          className="w-full h-full object-cover py-1"
          src={row.photo || noIMG}
          alt="*"
          onError={(e) => {
            (e.target as HTMLImageElement).onerror = null;
            (e.target as HTMLImageElement).src = noIMG;
          }}
        />
      );
    },
  },
  {
    field: "status",
    headerName: "Статус",
    width: 100,
    sortable: false,
    renderCell: ({ row }) => {
      return <div>{translateStatus(row?.status || "")}</div>;
    },
  },
  {
    field: "store",
    headerName: "Магазин",
    minWidth: 250,
    flex: 1,
    sortable: false,
    renderCell: ({ row }) => {
      return <div>{row?.store?.name}</div>;
    },
  },
  {
    field: "comment",
    headerName: "Комментарий",
    minWidth: 170,
    flex: 1,
    sortable: false,
  },
  {
    field: "madeOrder",
    headerName: "Заказано",
    width: 105,
    sortable: false,
    renderCell: ({ row }) => {
      return <div>{row?.madeOrder ? "✅" : "❌"}</div>;
    },
  },
];

export const columnsItem: GridColDef<IItem>[] = [
  {
    field: "rowNum",
    headerName: "#",
    width: 50,
  },
  {
    field: "photo",
    headerName: "Фото",
    width: 100,
    sortable: false,
    renderCell: ({ row }) => {
      return (
        <img
          className="w-full h-full object-cover py-1"
          src={row.photo || noIMG}
          alt="*"
          onError={(e) => {
            (e.target as HTMLImageElement).onerror = null;
            (e.target as HTMLImageElement).src = noIMG;
          }}
        />
      );
    },
  },
  {
    field: "name",
    headerName: "Название",
    flex: 1,
    sortable: false,
  },
  {
    field: "author",
    headerName: "Автор",
    width: 150,
    sortable: false,
  },
  {
    field: "costIn",
    headerName: "Внут.расходы",
    width: 150,
    sortable: false,
    renderCell: ({ row }) => {
      return (
        <div>{parseFloat(row?.costIn?.toFixed(0)).toLocaleString("ru-RU")}</div>
      );
    },
  },
  {
    field: "category",
    headerName: "Категория",
    width: 150,
    sortable: false,
    renderCell: ({ row }) => {
      return <div>{row?.category?.name}</div>;
    },
  },
  {
    field: "quantity",
    headerName: "Количество",
    width: 130,
    sortable: false,
    renderCell: ({ row }) => {
      return (
        <div>
          {parseFloat(row?.quantity?.toFixed(0)).toLocaleString("ru-RU")}
        </div>
      );
    },
  },
  {
    field: "weight",
    headerName: "Вес",
    width: 90,
    sortable: false,
    renderCell: ({ row }) => {
      return (
        <div>{parseFloat(row?.weight?.toFixed(0)).toLocaleString("ru-RU")}</div>
      );
    },
  },
  {
    field: "code",
    headerName: "Наименование код",
    width: 200,
    sortable: false,
  },
];

export const columnsDriver: GridColDef<IDrivers>[] = [
  {
    field: "rowNum",
    headerName: "#",
    width: 50,
  },
  {
    field: "photo",
    headerName: "Аватар",
    width: 100,
    sortable: false,
    renderCell: ({ row }) => {
      return (
        <img
          className="w-full h-full object-cover py-1"
          src={row.photo || noIMG}
          alt="*"
          loading="lazy"
          onError={(e) => {
            (e.target as HTMLImageElement).onerror = null;
            (e.target as HTMLImageElement).src = noIMG;
          }}
        />
      );
    },
  },
  {
    field: "name",
    headerName: "ФИО",
    minWidth: 200,
    flex: 1,
    sortable: false,
  },
  {
    field: "login",
    headerName: "Логин",
    minWidth: 200,
    flex: 1,
    sortable: false,
  },
  {
    field: "phoneNumber",
    headerName: "Номер телефона",
    width: 170,
    sortable: false,
  },
  {
    field: "passport_front",
    headerName: "П.фронт",
    width: 100,
    sortable: false,
    renderCell: ({ row }) => {
      return (
        <img
          className="w-full h-full object-cover py-1"
          src={row.passport_front || noIMG}
          alt="*"
          loading="lazy"
          onError={(e) => {
            (e.target as HTMLImageElement).onerror = null;
            (e.target as HTMLImageElement).src = noIMG;
          }}
        />
      );
    },
  },
  {
    field: "passport_back",
    headerName: "П.обрат",
    width: 100,
    sortable: false,
    renderCell: ({ row }) => {
      return (
        <img
          className="w-full h-full object-cover py-1"
          src={row.passport_back || noIMG}
          alt="*"
          loading="lazy"
          onError={(e) => {
            (e.target as HTMLImageElement).onerror = null;
            (e.target as HTMLImageElement).src = noIMG;
          }}
        />
      );
    },
  },
];

export const columnsTransactionOrder: GridColDef<ITransactionOrder>[] = [
  {
    field: "rowNum",
    headerName: "#",
    width: 50,
  },
  {
    field: "sum",
    headerName: "Сумма",
    width: 250,
    sortable: false,
    renderCell: ({ row }) => {
      return (
        <div className="truncate">
          {parseFloat(row?.sum?.toFixed(0)).toLocaleString("ru-RU")}
        </div>
      );
    },
  },
  {
    field: "order",
    headerName: "Магазин",
    width: 350,
    sortable: false,
    renderCell: ({ row }) => {
      return <div>{row?.order?.store?.name}</div>;
    },
  },
  {
    field: "dateCreated",
    headerName: "Дата создания",
    width: 250,
    sortable: false,
    renderCell: ({ row }) => {
      return <div>{formatDateToTimestamp(row?.dateCreated)}</div>;
    },
  },
  {
    field: "comment",
    headerName: "Комментарий",
    flex: 1,
    sortable: false,
  },
];

export const columnsOrderHistory: GridColDef<IOrderHistory>[] = [
  {
    field: "rowNum",
    headerName: "#",
    width: 50,
  },
  {
    field: "dateCreated",
    headerName: "Дата и время изменения",
    width: 150,
    sortable: false,
    renderCell: ({ row }) => {
      return <div>{formatDateToTimestamp(row?.dateCreated)}</div>;
    },
  },
  {
    field: "admin",
    headerName: "Админ",
    width: 200,
    sortable: false,
    renderCell: ({ row }) => {
      return <div>{row?.admin?.name}</div>;
    },
  },
  {
    field: "addedItems",
    headerName: "Добавленные товары",
    minWidth: 300,
    flex: 1,
    sortable: false,
    renderCell: ({ row }) => {
      return (
        <div className="h-full truncate">
          {row?.addedItems?.map((item, index) => (
            <div key={item.id} className="flex gap-2 p-[2px]">
              <span>{index + 1})</span>
              <p>{item.item?.name}</p>
            </div>
          ))}
        </div>
      );
    },
  },
  {
    field: "removeItems",
    headerName: "Удаленные товары",
    minWidth: 300,
    flex: 1,
    sortable: false,
    renderCell: ({ row }) => {
      return (
        <div className="h-full truncate">
          {row?.removeItems?.map((item, index) => (
            <div key={item.id} className="flex gap-2 p-[2px]">
              <span>{index + 1})</span>
              <p>{item.item?.name}</p>
            </div>
          ))}
        </div>
      );
    },
  },
  {
    field: "description",
    headerName: "Описание",
    minWidth: 300,
    flex: 1,
    sortable: false,
  },
];

export const columnsFAQ: GridColDef<IFAQ>[] = [
  {
    field: "rowNum",
    headerName: "#",
    width: 50,
  },
  {
    field: "priority",
    headerName: "Приоритет",
    width: 120,
    sortable: true,
    renderCell: ({ row }) => {
      return <div>{row.priority}</div>;
    },
  },
  {
    field: "question",
    headerName: "Вопрос",
    minWidth: 250,
    flex: 1,
    sortable: false,
  },
  {
    field: "answer",
    headerName: "Ответ",
    minWidth: 250,
    flex: 1,
    sortable: false,
  },
];

export const columnsCountAndSumOrders: GridColDef<IStatistic>[] = [
  {
    field: "rowNum",
    headerName: "#",
    width: 50,
  },
  {
    field: "date",
    headerName: "Дата",
    minWidth: 110,
    flex: 1,
    sortable: false,
  },
  {
    field: "count",
    headerName: "Количество",
    minWidth: 130,
    flex: 1,
    sortable: true,
    renderCell: ({ row }) => {
      return (
        <div className="truncate">
          {parseFloat(row?.count.toFixed(0)).toLocaleString("ru-RU")}
        </div>
      );
    },
  },
  {
    field: "total_cost",
    headerName: "Сумма",
    minWidth: 110,
    flex: 1,
    sortable: true,
    renderCell: ({ row }) => {
      return (
        <div className="truncate">
          {parseFloat(row?.total_cost.toFixed(0)).toLocaleString("ru-RU")}
        </div>
      );
    },
  },
];

export const columnsCountAndSumItems: GridColDef<IStatisticItems>[] = [
  {
    field: "rowNum",
    headerName: "#",
    width: 50,
  },
  {
    field: "name",
    headerName: "Название",
    minWidth: 250,
    flex: 2,
    sortable: false,
  },
  {
    field: "count",
    headerName: "Количество",
    minWidth: 130,
    flex: 1,
    sortable: true,
    renderCell: ({ row }) => {
      return (
        <div>{parseFloat(row?.count.toFixed(0)).toLocaleString("ru-RU")}</div>
      );
    },
  },
  {
    field: "totalCost",
    headerName: "Сумма",
    minWidth: 110,
    flex: 1,
    sortable: true,
    renderCell: ({ row }) => {
      return (
        <div>
          {parseFloat(row?.totalCost.toFixed(0)).toLocaleString("ru-RU")}
        </div>
      );
    },
  },
];

export const columnsMarginsItem: GridColDef<IItemMargins>[] = [
  {
    field: "rowNum",
    headerName: "#",
    width: 50,
  },
  {
    field: "name",
    headerName: "Название",
    minWidth: 250,
    flex: 2,
    sortable: false,
  },
  {
    field: "marginality",
    headerName: "Маржинальность",
    minWidth: 130,
    flex: 1,
    sortable: true,
    renderCell: ({ row }) => {
      return (
        <div>
          {parseFloat(row?.marginality.toFixed(0)).toLocaleString("ru-RU")}
        </div>
      );
    },
  },
];

export const columnsDeletionRequest: GridColDef<IDeletionRequest>[] = [
  {
    field: "rowNum",
    headerName: "#",
    width: 50,
  },
  {
    field: "phone",
    headerName: "Номер телефона",
    width: 170,
    sortable: false,
  },
  {
    field: "comment",
    headerName: "Комментарий",
    minWidth: 250,
    flex: 1,
    sortable: false,
  },
  {
    field: "id",
    headerName: "Удалить",
    width: 140,
    sortable: false,
  },
];

export const columnsOrderReturn: GridColDef<IOrderReturn>[] = [
  {
    field: "rowNum",
    headerName: "#",
    width: 50,
  },
  {
    field: "removeItems",
    headerName: "Товар",
    minWidth: 300,
    flex: 1,
    sortable: false,
    renderCell: ({ row }) => {
      return (
        <div className="h-full truncate">
          {row?.returnedItems?.map((item, index) => (
            <div key={item.id} className="flex gap-2 p-[2px]">
              <span>{index + 1})</span>
              <p>{item.item?.name}</p>
            </div>
          ))}
        </div>
      );
    },
  },
  {
    field: "quantity",
    headerName: "Количество",
    width: 200,
    sortable: true,
    renderCell: ({ row }) => {
      return (
        <div className="h-full truncate">
          {row?.returnedItems?.map((item) => (
            <div key={item.id} className="flex gap-2 p-[2px]">
              <p>{item.quantity}</p>
            </div>
          ))}
        </div>
      );
    },
  },
  {
    field: "soldCost",
    headerName: "Стоимость продажи",
    width: 200,
    sortable: true,
    renderCell: ({ row }) => {
      return (
        <div className="h-full truncate">
          {row?.returnedItems?.map((item) => (
            <div key={item.id} className="flex gap-2 p-[2px]">
              <p>{item.soldCost}</p>
            </div>
          ))}
        </div>
      );
    },
  },
  {
    field: "comment",
    headerName: "Комментарий",
    minWidth: 300,
    flex: 1,
    sortable: false,
  },
];

export const columnsStoreSales: GridColDef<IStoreSales>[] = [
  {
    field: "rowNum",
    headerName: "#",
    width: 50,
  },
  {
    field: "name",
    headerName: "Название",
    minWidth: 200,
    flex: 1,
    sortable: false,
    renderCell: ({ row }) => {
      return <div>{row?.store?.name}</div>;
    },
  },
  {
    field: "address",
    headerName: "Адрес",
    minWidth: 200,
    flex: 1,
    sortable: false,
    renderCell: ({ row }) => {
      return <div>{row?.store?.address}</div>;
    },
  },
  {
    field: "soldCost",
    headerName: "Сумма покупок",
    width: 170,
    sortable: false,
  },
];
