import type { AxiosError } from 'axios';

/** 서버 에러 형식 정의 */
type CustomError = { error: string };

export type ErrorResponse = AxiosError<CustomError>;
