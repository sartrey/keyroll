export type ERecordType = 'plain' | 'refer';

export interface IRecord {
  recordKey: string;
  recordType: ERecordType;
  recordValue: string;
  contentType: string;
  secureLevel: number;
  createdAt: number;
  updatedAt: number;
}

export interface IAPIResponse<T> {
  data?: T;
  error?: string;
  success: boolean;
}

export const API_VERSION = 'v1';
