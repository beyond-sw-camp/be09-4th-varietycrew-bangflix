import dayjs from 'dayjs';
import { EnvVariable } from './EnvVariable';

// dayjs locale 설정
import 'dayjs/locale/ko';
dayjs.locale('ko');

export const Helper = {
  getImageUrl: (imagePath = '') => {
    if (!imagePath || imagePath.startsWith('http')) return imagePath;
    return `${EnvVariable.Server}${imagePath}`;
  },

  Date: {
    formatDateTime: stringTime => {
      return dayjs(stringTime).format('YYYY-MM-DD A H시 m분');
    },
  },
};
