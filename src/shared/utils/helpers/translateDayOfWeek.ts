import { daysWeek } from '../constants/data';

export const translateDayOfWeek = (dayOfWeek: string): string => {
  const daysOfWeek: { [key: string]: string } = daysWeek;

  return daysOfWeek[dayOfWeek] || 'Неверный день недели';
};
