import moment from 'moment';

export const formatDate = (dateString: string | number | Date) => {
  return moment(dateString).format('DD MMM YYYY');
};
