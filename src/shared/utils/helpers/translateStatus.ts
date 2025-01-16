export const translateStatus = (status: string): string => {
  const statusMap: Record<string, string> = {
    new: 'Новый',
    archive: 'Архив',
    visited: 'Посетил',
  };

  return statusMap[status] || 'Неизвестный статус';
};

export const translatePaymentStatus = (status: string): string => {
  const statusMap: Record<string, string> = {
    paid: 'Оплачено',
    not_paid: 'Не оплачено',
    half: 'Частично оплачено',
  };

  return statusMap[status] || 'Неизвестный статус';
};
