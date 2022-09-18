import toast from 'react-hot-toast';

import type { AxiosError } from 'axios';

/** 서버 에러 형식 정의 */
type CustomError = { error: string };

export type ErrorResponse = AxiosError<CustomError>;

export const errorMessage = (error: ErrorResponse) => {
  if (error.response?.data.error) {
    toast.error(error.response.data.error);
  } else {
    toast.error('알 수 없는 에러가 발생했습니다.');
  }
};
