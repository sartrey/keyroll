export type ERecordType = 'inner' | 'plain' | 'refer' | 'graph';

export interface IRecord {
  recordKey: string;
  recordType: ERecordType;
  contentType: string;
  secureLevel: number;
  createdAt: number;
  updatedAt: number;
  recordValue: string;
}

export interface IAPIResponse<T> {
  traceId: string;
  content: T;
  errorId?: string;
}

export const ApiVersion = 'v1';
