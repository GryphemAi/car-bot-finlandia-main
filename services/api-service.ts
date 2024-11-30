import { ErrorResponse } from '@/types';
import { db } from '@/lib/firebase';
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit
} from 'firebase/firestore';

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

export const api = {
  async get<T>(
    collectionName: string,
    options?: {
      where?: [string, any, any];
      orderBy?: [string, 'desc' | 'asc'];
      limit?: number;
    }
  ) {
    try {
      let q = collection(db, collectionName);

      if (options?.where) {
        q = query(
          q,
          where(options.where[0], options.where[1], options.where[2])
        );
      }

      if (options?.orderBy) {
        q = query(q, orderBy(options.orderBy[0], options.orderBy[1]));
      }

      if (options?.limit) {
        q = query(q, limit(options.limit));
      }

      const snapshot = await getDocs(q);
      return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      })) as T[];
    } catch (error) {
      console.error('Error fetching data:', error);
      throw new RequestError({
        message: [(error as Error).message],
        error: 'Failed to fetch data',
        statusCode: 500
      });
    }
  }
};
