import axios, { AxiosError, AxiosInstance } from 'axios';
import { ErrorResponse, IAxiosError, IStockError } from '@/types';

// import https from 'https';
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

export const api: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json'
  }

  // httpsAgent: new https.Agent({
  //   rejectUnauthorized: false
  // })
});

export class RequestError implements ErrorResponse {
  message: string[];
  error: string;
  statusCode: number;

  constructor(details?: ErrorResponse) {
    this.message = details?.message || [];
    this.error = details?.error || '';
    this.statusCode = details?.statusCode || 0;
  }
}

export function axiosErrorHandler<T>(
  callback: (err: IAxiosError<T> | IStockError<T>) => void
) {
  return (error: Error | AxiosError<T>) => {
    if (axios.isAxiosError(error)) {
      return callback({
        error: error,
        type: 'axios-error'
      });
    } else {
      return callback({
        error: error,
        type: 'stock-error'
      });
    }
  };
}
