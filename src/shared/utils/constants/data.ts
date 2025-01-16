import { StyleSheet } from '@react-pdf/renderer';
import { Control, FieldValues } from 'react-hook-form';

export const daysWeek = {
  monday: 'Понедельник',
  tuesday: 'Вторник',
  wednesday: 'Среда',
  thursday: 'Четверг',
  friday: 'Пятница',
  saturday: 'Суббота',
  sunday: 'Воскресенье',
};

export const planStatus = {
  new: 'Новый',
  archive: 'Архив',
};

export const planStatus2 = {
  new: 'Новый',
  visited: 'Посетил',
};

export const paymentStatus = {
  paid: 'Оплачено',
  not_paid: 'Не оплачено',
  half: 'Частично оплачено',
};

export const styles = StyleSheet.create({
  page: {
    padding: 20,
    fontFamily: 'Roboto',
  },
  header: {
    fontSize: 10,
    marginBottom: 6,
    textAlign: 'center',
  },
  container: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  flexContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  flexColumn: {
    width: '50%',
  },
  title: {
    fontSize: 8,
  },
  imgContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  image: {
    width: '100%',
    height: '150px',
    objectFit: 'contain',
  },
  table: {
    display: 'flex',
    flexDirection: 'column',
    width: 'auto',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#bfbfbf',
  },
  tableRow: {
    flexDirection: 'row',
  },
  tableCol: {
    flex: 1,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#bfbfbf',
  },
  tableCell: {
    margin: 'auto',
    padding: 2,
    fontSize: 8,
  },
  text: {
    fontSize: 8,
    marginBottom: 4,
  },
  row: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#bfbfbf',
    padding: 2,
  },
  cell: {
    flex: 1,
    fontSize: 8,
    marginLeft: 2,
  },
});

export type AutocompleteProps = {
  control: Control<FieldValues, any>;
  required: boolean | string;
  multiple?: boolean;
  countOrders?: any;
  name?: string;
  col?: string;
};
