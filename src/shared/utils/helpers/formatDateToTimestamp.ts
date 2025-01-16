import dayjs from 'dayjs';

export function formatDateToTimestamp(dateString: string | undefined): string {
  if (!dateString) return '-- --';
  const formattedDate = dayjs(dateString).format('DD/MM/YYYY HH:mm');
  return formattedDate;
}

export const formatDateWithTime = (dateFormat: any) => {
  const milliseconds =
    dateFormat?.seconds * 1000 + dateFormat?.nanoseconds / 1000000;
  const date = dayjs(milliseconds);

  const formattedDate = date.format('D.MM.YYYY');
  const formattedTime = date.format('H:mm');

  return `${formattedDate} ${formattedTime}`;
};
