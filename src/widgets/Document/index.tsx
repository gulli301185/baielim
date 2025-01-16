import { IOrders } from '@/shared/types';
import { formatDateToTimestamp } from '@/shared/utils/helpers/formatDateToTimestamp';
import {
  translatePaymentStatus,
  translateStatus,
} from '@/shared/utils/helpers/translateStatus';
import { GridRowSelectionModel } from '@mui/x-data-grid';
import { Page, Text, View, Document, Font, Image } from '@react-pdf/renderer';
import noIMG from '@/shared/assets/noImg.png';
import { styles } from '@/shared/utils/constants/data';
import React from 'react';
import dayjs from 'dayjs';

Font.register({
  family: 'Roboto',
  src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-light-webfont.ttf',
});

const DocumentOrder = ({
  rowSelectionModel = [],
  data,
  VAT,
}: {
  rowSelectionModel: GridRowSelectionModel | undefined;
  data: IOrders[];
  VAT?: boolean;
}) => {
  const orders = data?.filter((order) => rowSelectionModel?.includes(order.id));

  const duplicatedOrders = orders.flatMap((order) => [order, order]);

  const aggregatedItems: Record<number, any> = {};

  orders.forEach((order) => {
    order.items.forEach((item) => {
      const itemId = item.item?.id;
      if (aggregatedItems[itemId]) {
        aggregatedItems[itemId].count += item.count;
        aggregatedItems[itemId].weight += item.item?.weight ?? 0;
        aggregatedItems[itemId].totalSoldCost +=
          (item.count ?? 1) * item.soldCost;
      } else {
        aggregatedItems[itemId] = {
          id: itemId,
          name: item.item?.name,
          cost: item.soldCost,
          count: item.count ?? 1,
          weight: item.item?.weight ?? 0,
          totalSoldCost: (item.count ?? 1) * item.soldCost,
        };
      }
    });
  });

  const aggregatedItemsArray = Object.values(aggregatedItems);

  const totalSUM = orders.reduce(
    (acc, order) => acc + (order.totalCost ?? 0),
    0
  );

  const today = dayjs();
  const formattedDate = today.format('DD.MM.YYYY');

  const orderDriver = orders.find((order) => order.driver?.name);

  return (
    <Document>
      <Page style={styles.page}>
        <Text style={[styles.header, { textAlign: 'left' }]}>
          Водитель: {orderDriver?.driver?.name}
        </Text>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>#</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>ID заказа</Text>
            </View>
            <View style={[styles.tableCol, { flex: 8 }]}>
              <Text style={styles.tableCell}>Покупатель</Text>
            </View>
            <View style={[styles.tableCol, { flex: 2 }]}>
              <Text style={styles.tableCell}>Сумма</Text>
            </View>
          </View>
          {orders.map((item, index) => (
            <View style={styles.tableRow} key={index}>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{index + 1}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{item.id}</Text>
              </View>
              <View style={[styles.tableCol, { flex: 8 }]}>
                <Text
                  style={[
                    styles.tableCell,
                    {
                      width: '100%',
                      textAlign: 'left',
                    },
                  ]}
                >
                  {item.store?.name} ({item.items?.length})
                </Text>
              </View>
              <View style={[styles.tableCol, { flex: 2 }]}>
                <Text style={styles.tableCell}>{item.totalCost}</Text>
              </View>
            </View>
          ))}
          <View style={styles.tableRow}>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Итого:</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}></Text>
            </View>
            <View style={[styles.tableCol, { flex: 8 }]}>
              <Text style={styles.tableCell}></Text>
            </View>
            <View style={[styles.tableCol, { flex: 2 }]}>
              <Text style={styles.tableCell}>{totalSUM}</Text>
            </View>
          </View>
        </View>
        <Text style={[styles.header, { textAlign: 'left', marginTop: 10 }]}>
          Наименование товара
        </Text>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>#</Text>
            </View>
            <View style={[styles.tableCol, { flex: 8 }]}>
              <Text style={styles.tableCell}>Наименование товара</Text>
            </View>
            <View style={[styles.tableCol, { flex: 2 }]}>
              <Text style={styles.tableCell}>Кол-во, ед. изм</Text>
            </View>
            <View style={[styles.tableCol, { flex: 2 }]}>
              <Text style={styles.tableCell}>Цена</Text>
            </View>
            <View style={[styles.tableCol, { flex: 2 }]}>
              <Text style={styles.tableCell}>Сумма</Text>
            </View>
            <View style={[styles.tableCol, { flex: 2 }]}>
              <Text style={styles.tableCell}>Вес</Text>
            </View>
          </View>
          {aggregatedItemsArray.map((item, index) => (
            <View style={styles.tableRow} key={index}>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{index + 1}</Text>
              </View>
              <View style={[styles.tableCol, { flex: 8 }]}>
                <Text
                  style={[
                    styles.tableCell,
                    {
                      width: '100%',
                      textAlign: 'left',
                    },
                  ]}
                >
                  {item.name}
                </Text>
              </View>
              <View style={[styles.tableCol, { flex: 2 }]}>
                <Text style={styles.tableCell}>{item.count}</Text>
              </View>
              <View style={[styles.tableCol, { flex: 2 }]}>
                <Text style={styles.tableCell}>{item.cost}</Text>
              </View>
              <View style={[styles.tableCol, { flex: 2 }]}>
                <Text style={styles.tableCell}>{item.totalSoldCost}</Text>
              </View>
              <View style={[styles.tableCol, { flex: 2 }]}>
                <Text style={styles.tableCell}>{item.weight}</Text>
              </View>
            </View>
          ))}
          <View style={styles.tableRow}>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Всего:</Text>
            </View>
            <View style={[styles.tableCol, { flex: 8 }]}>
              <Text style={styles.tableCell}></Text>
            </View>
            <View style={[styles.tableCol, { flex: 2 }]}>
              <Text style={styles.tableCell}>
                {aggregatedItemsArray?.reduce((acc, sum) => acc + sum.count, 0)}
              </Text>
            </View>
            <View style={[styles.tableCol, { flex: 2 }]}>
              <Text style={styles.tableCell}></Text>
            </View>
            <View style={[styles.tableCol, { flex: 2 }]}>
              <Text style={styles.tableCell}>{totalSUM}</Text>
            </View>
            <View style={[styles.tableCol, { flex: 2 }]}>
              <Text style={styles.tableCell}>
                {aggregatedItemsArray?.reduce(
                  (acc, sum) => acc + sum.weight,
                  0
                )}
              </Text>
            </View>
          </View>
        </View>
        <View style={[styles.flexContainer, { padding: '10px 0' }]}>
          <View style={[styles.flexColumn, { border: 'none' }]}>
            <View style={[styles.row, { border: 'none' }]}>
              <Text style={styles.title}>Принял:</Text>
              <Text style={styles.cell}>
                ____________________________________
              </Text>
            </View>
          </View>
          <View style={[styles.flexColumn, { border: 'none' }]}>
            <View style={[styles.row, { border: 'none' }]}>
              <Text style={styles.title}>Сдал:</Text>
              <Text style={styles.cell}>
                ____________________________________
              </Text>
            </View>
          </View>
        </View>
      </Page>
      <Page style={styles.page}>
        {duplicatedOrders?.map((order, index) => (
          <React.Fragment key={index}>
            <Text
              style={[styles.header, { textAlign: 'left', fontWeight: 700 }]}
            >
              Расходная накладная № БЭК{order.id} от {formattedDate}
            </Text>
            <View key={index} style={styles.container}>
              <View
                style={[styles.flexContainer, { border: '1px solid #ccc' }]}
              >
                <View style={[styles.flexColumn, { display: 'flex' }]}>
                  <View style={[styles.row]}>
                    <Text style={styles.title}>Агент:</Text>
                    <Text style={styles.cell}>{order?.agent?.name}</Text>
                  </View>
                  <View style={styles.row}>
                    <Text style={styles.title}>Магазин:</Text>
                    <Text style={styles.cell}>{order?.store?.name}</Text>
                  </View>
                  <View style={styles.row}>
                    <Text style={styles.title}>Дата и время создания:</Text>
                    <Text style={styles.cell}>
                      {formatDateToTimestamp(order?.dateCreated)}
                    </Text>
                  </View>
                  <View style={styles.row}>
                    <Text style={styles.title}>Статус оплаты:</Text>
                    <Text style={styles.cell}>
                      {translatePaymentStatus(order?.paymentStatus || '')}
                    </Text>
                  </View>
                  <View style={styles.row}>
                    <Text style={styles.title}>Комментарий:</Text>
                    <Text style={styles.cell}>{order?.comment}</Text>
                  </View>
                  {order?.status === 'archive' ? (
                    <View style={styles.row}>
                      <Text style={styles.title}>Дата доставки:</Text>
                      <Text style={styles.cell}>
                        {formatDateToTimestamp(order?.dateDelivered || '')}
                      </Text>
                    </View>
                  ) : null}
                </View>
                <View style={styles.flexColumn}>
                  <View style={[styles.row]}>
                    <Text style={styles.title}>Статус:</Text>
                    <Text style={styles.cell}>
                      {translateStatus(order?.status || '')}
                    </Text>
                  </View>
                  <View style={styles.row}>
                    <Text style={styles.title}>Водитель:</Text>
                    <Text style={styles.cell}>{order?.driver?.name}</Text>
                  </View>
                  <View style={styles.row}>
                    <Text style={styles.title}>Общая сумма:</Text>
                    <Text style={styles.cell}>{order?.totalCost}</Text>
                  </View>
                  <View style={styles.row}>
                    <Text style={styles.title}>Остаток суммы:</Text>
                    <Text style={styles.cell}>{order?.amountLeft}</Text>
                  </View>
                  <View style={styles.row}>
                    <Text style={styles.title}>Вес заказа:</Text>
                    <Text style={styles.cell}>{order?.weight}</Text>
                  </View>
                  {order?.status === 'archive' ? (
                    <View style={styles.row}>
                      <Text style={styles.title}>Комментарий доставщика:</Text>
                      <Text style={styles.cell}>{order?.delComment}</Text>
                    </View>
                  ) : null}
                </View>
              </View>
              {order?.items?.length ? (
                <>
                  <Text
                    style={[
                      styles.title,
                      { textAlign: 'left', paddingVertical: 6 },
                    ]}
                  >
                    Список позиций:
                  </Text>
                  <View style={styles.table}>
                    <View style={styles.tableRow}>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>#</Text>
                      </View>
                      <View style={[styles.tableCol, { flex: 6 }]}>
                        <Text style={styles.tableCell}>Товар</Text>
                      </View>
                      <View style={[styles.tableCol, { flex: 2 }]}>
                        <Text style={styles.tableCell}>Количество</Text>
                      </View>
                      <View style={[styles.tableCol, { flex: 2 }]}>
                        <Text style={styles.tableCell}>Цена</Text>
                      </View>
                      <View style={[styles.tableCol, { flex: 2 }]}>
                        <Text style={styles.tableCell}>Сумма</Text>
                      </View>
                      <View style={[styles.tableCol, { flex: 3 }]}>
                        <Text style={styles.tableCell}>Категория ТТ</Text>
                      </View>
                    </View>
                    {order?.items?.map((item, index) => (
                      <View style={styles.tableRow} key={index}>
                        <View style={styles.tableCol}>
                          <Text style={styles.tableCell}>{index + 1}</Text>
                        </View>
                        <View
                          style={[
                            styles.tableCol,
                            {
                              flex: 6,
                            },
                          ]}
                        >
                          <Text
                            style={[
                              styles.tableCell,
                              {
                                width: '100%',
                                textAlign: 'left',
                              },
                            ]}
                          >
                            {item.item?.name}
                          </Text>
                        </View>
                        <View style={[styles.tableCol, { flex: 2 }]}>
                          <Text style={styles.tableCell}>{item.count}</Text>
                        </View>
                        <View style={[styles.tableCol, { flex: 2 }]}>
                          <Text style={styles.tableCell}>{item.soldCost}</Text>
                        </View>
                        <View style={[styles.tableCol, { flex: 2 }]}>
                          <Text style={styles.tableCell}>
                            {(item.count || 1) * item.soldCost}
                          </Text>
                        </View>
                        <View style={[styles.tableCol, { flex: 3 }]}>
                          <Text style={styles.tableCell}>
                            {item.costType?.name}
                          </Text>
                        </View>
                      </View>
                    ))}
                    <View style={styles.tableRow}>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}></Text>
                      </View>
                      <View style={[styles.tableCol, { flex: 6 }]}>
                        <Text
                          style={[
                            styles.tableCell,
                            {
                              width: '100%',
                              textAlign: 'left',
                            },
                          ]}
                        >
                          Итого:
                        </Text>
                      </View>
                      <View style={[styles.tableCol, { flex: 2 }]}>
                        <Text style={styles.tableCell}>
                          {order?.items?.reduce(
                            (acc, item) => acc + (item.count || 1),
                            0
                          )}
                        </Text>
                      </View>
                      <View style={[styles.tableCol, { flex: 2 }]}>
                        <Text style={styles.tableCell}></Text>
                      </View>
                      <View style={[styles.tableCol, { flex: 2 }]}>
                        <Text style={styles.tableCell}>{order.totalCost}</Text>
                      </View>
                      <View style={[styles.tableCol, { flex: 3 }]}>
                        <Text style={styles.tableCell}></Text>
                      </View>
                    </View>
                    {VAT ? (
                      <>
                        <View style={styles.tableRow}>
                          <View style={styles.tableCol}>
                            <Text style={styles.tableCell}></Text>
                          </View>
                          <View style={[styles.tableCol, { flex: 6 }]}>
                            <Text
                              style={[
                                styles.tableCell,
                                {
                                  width: '100%',
                                  textAlign: 'left',
                                },
                              ]}
                            >
                              в том числе НДС
                            </Text>
                          </View>
                          <View style={[styles.tableCol, { flex: 2 }]}>
                            <Text style={styles.tableCell}></Text>
                          </View>
                          <View style={[styles.tableCol, { flex: 2 }]}>
                            <Text style={styles.tableCell}></Text>
                          </View>
                          <View style={[styles.tableCol, { flex: 2 }]}>
                            <Text style={styles.tableCell}>
                              {Math.abs(
                                (12 / 100) * (order?.totalCost ?? 1)
                              ).toFixed(2)}
                            </Text>
                          </View>
                          <View style={[styles.tableCol, { flex: 3 }]}>
                            <Text style={styles.tableCell}></Text>
                          </View>
                        </View>
                        <View style={styles.tableRow}>
                          <View style={styles.tableCol}>
                            <Text style={styles.tableCell}></Text>
                          </View>
                          <View style={[styles.tableCol, { flex: 6 }]}>
                            <Text
                              style={[
                                styles.tableCell,
                                { width: '100%', textAlign: 'left' },
                              ]}
                            >
                              в том числе НСП
                            </Text>
                          </View>
                          <View style={[styles.tableCol, { flex: 2 }]}>
                            <Text style={styles.tableCell}></Text>
                          </View>
                          <View style={[styles.tableCol, { flex: 2 }]}>
                            <Text style={styles.tableCell}></Text>
                          </View>
                          <View style={[styles.tableCol, { flex: 2 }]}>
                            <Text style={styles.tableCell}>
                              {Math.abs(
                                (0.1 / 100) * (order?.totalCost ?? 1)
                              ).toFixed(2)}
                            </Text>
                          </View>
                          <View style={[styles.tableCol, { flex: 3 }]}>
                            <Text style={styles.tableCell}></Text>
                          </View>
                        </View>
                      </>
                    ) : null}
                  </View>
                </>
              ) : null}
              {order?.signature ||
                (order?.photo ? (
                  <View style={{ border: '1px solid #ccc', marginTop: 10 }}>
                    <View style={styles.flexContainer}>
                      <View
                        style={[
                          styles.flexColumn,
                          { border: '1px solid #ccc' },
                        ]}
                      >
                        <View style={styles.imgContainer}>
                          {order?.signature ? (
                            <Image
                              style={styles.image}
                              src={order?.signature || noIMG}
                            />
                          ) : null}
                        </View>
                      </View>
                      <View
                        style={[
                          styles.flexColumn,
                          { border: '1px solid #ccc' },
                        ]}
                      >
                        <View style={styles.imgContainer}>
                          {order?.photo ? (
                            <Image
                              style={styles.image}
                              src={order?.photo || noIMG}
                            />
                          ) : null}
                        </View>
                      </View>
                    </View>
                  </View>
                ) : null)}
            </View>
            {VAT ? (
              <View style={[styles.flexContainer, { padding: '10px 0' }]}>
                <View style={[styles.flexColumn, { border: 'none' }]}>
                  <View
                    style={[
                      styles.row,
                      { border: 'none', flexDirection: 'column', gap: 14 },
                    ]}
                  >
                    <Text style={styles.title}>Руководитель</Text>
                    <Text style={{ marginBottom: 40 }}>
                      <Text style={styles.title}>Принял:</Text>
                      <Text style={styles.cell}>
                        ____________________________________
                      </Text>
                    </Text>
                  </View>
                </View>
                <View style={[styles.flexColumn, { border: 'none' }]}>
                  <View
                    style={[
                      styles.row,
                      { border: 'none', flexDirection: 'column', gap: 14 },
                    ]}
                  >
                    <Text style={styles.title}>Бухгалтер/менеджер</Text>
                    <Text style={{ marginBottom: 40 }}>
                      <Text style={styles.title}>Сдал:</Text>
                      <Text style={styles.cell}>
                        ____________________________________
                      </Text>
                    </Text>
                  </View>
                </View>
              </View>
            ) : (
              <View style={[styles.flexContainer, { padding: '10px 0' }]}>
                <View style={[styles.flexColumn, { border: 'none' }]}>
                  <View style={[styles.row, { border: 'none' }]}>
                    <Text style={styles.title}>Принял:</Text>
                    <Text style={styles.cell}>
                      ____________________________________
                    </Text>
                  </View>
                </View>
                <View style={[styles.flexColumn, { border: 'none' }]}>
                  <View style={[styles.row, { border: 'none' }]}>
                    <Text style={styles.title}>Сдал:</Text>
                    <Text style={styles.cell}>
                      ____________________________________
                    </Text>
                  </View>
                </View>
              </View>
            )}
          </React.Fragment>
        ))}
      </Page>
    </Document>
  );
};

export default DocumentOrder;
