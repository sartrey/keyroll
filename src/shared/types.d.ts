export type RecordType = 'plain' | 'refer';
export interface Record {
    recordKey: string;
    recordType: RecordType;
    recordValue: string;
    contentType: string;
    secureLevel: number;
    createdAt: number;
    updatedAt: number;
}
export interface APIResponse<T> {
    data?: T;
    error?: string;
    success: boolean;
}
export declare const API_VERSION = "v1";
//# sourceMappingURL=types.d.ts.map