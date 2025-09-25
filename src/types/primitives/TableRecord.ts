import { APIPayload } from "./ExternalAPIPayload"

export type TableRecord = {
	Table: string,
	Column: string,
	Key: string
}

export type TableRecordV2<T> = {
	Table: string,
	Column: string,
	Key?: string
	Data?: T
}



export type TableRecordV3<T> =
	| {
		Table: string;           // Basic get/set
		Tables?: never;          // Explicitly forbid Tables
		FK?: never;
		Column: string;
		Key?: string;
		Data?: T;
	}
	| {
		Table?: never;           // Explicitly forbid Table  
		Tables: Map<string, string>; // Join operations
		FK?: string;
		Column: string;
		Key?: string;
		Data?: T;
	};






export interface DBRow {
	[key: string]: any;
}


export type PropertyMapping<
	TPayload extends APIPayload,
	TDBRow extends DBRow
> = {
		[K in keyof TPayload]?: keyof TDBRow;
	};