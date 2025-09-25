//src/app/server/supabase_client.ts
import { TableRecord, TableRecordV2, TableRecordV3 } from '@/types/primitives/TableRecord';
import { createClient, SupabaseClient } from '@supabase/supabase-js'
import { createServerClient } from "@supabase/ssr"
import { cookies } from 'next/headers'
import { APIError, APIResponse } from '@/types/primitives/ExternalAPIResponse';

const supabaseUrl = process.env.SUPABASE_URL?.trim() || ''
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY?.trim() || ''
// console.log (supabaseUrl);





export async function createSupabaseClient() {
	const cookieStore = await cookies()

	return createServerClient(
		supabaseUrl,
		supabaseAnonKey,
		{
			cookies: {
				getAll() {
					return cookieStore.getAll()
				},
				setAll(cookiesToSet: { name: string; value: string; options?: any }[]) {
					try {
						cookiesToSet.forEach(({ name, value, options }) =>
							cookieStore.set(name, value, options)
						)
					} catch {
						// The `setAll` method was called from a Server Component.
						// This can be ignored if you have middleware refreshing
						// user sessions.
					}
				},
			},
		}
	)
}




export async function getFromTableById<T>(
	client: SupabaseClient,
	record: TableRecord
): Promise<APIResponse<T[], APIError>> {
	const { data, error, status } = await client
		.from(record.Table)
		.select()
		.eq(record.Column, record.Key);

	if (error) {
		return {
			Success: false,
			Error: {
				Message: error.message,
				Code: error.code,
				Details: error.details,
			},
			Status: status,
		};
	}

	return {
		Success: true,
		Data: data as T[],
		Status: status,
	};
}



export async function insertIntoTable<T>(
	client: SupabaseClient,
	record: TableRecordV2<T>
): Promise<APIResponse<string, APIError>> {
	const { data, error, status } = await client
		.from(record.Table)
		.insert(record.Data);

	if (error) {
		return {
			Success: false,
			Error: {
				Message: error.message,
				Code: error.code,
				Details: error.details,
			},
			Status: status,
		};
	}

	return {
		Success: true,
		Status: status,
		Data: "success"
	};
}





export async function insertIntoTableAndReturn<T>(
	client: SupabaseClient,
	record: TableRecordV2<T>
): Promise<APIResponse<T, APIError>> {
	const { data, error, status } = await client
		.from(record.Table)
		.insert(record.Data)
		.select()
		.single();

	if (error) {
		return {
			Success: false,
			Error: {
				Message: error.message,
				Code: error.code,
				Details: error.details,
			},
			Status: status,
		};
	}

	return {
		Success: true,
		Status: status,
		Data: data,
	};
}











export async function getFromTableByIdV2<T>(
	client: SupabaseClient,
	record: TableRecordV3<T>
): Promise<APIResponse<T[], APIError>> {

	// Single table operation (existing functionality)
	if ('Table' in record) {
		const { data, error, status } = await client
			.from(record.Table ?? "shops")
			.select()
			.eq(record.Column, record.Key);

		if (error) {
			return {
				Success: false,
				Error: {
					Message: error.message,
					Code: error.code,
					Details: error.details,
				},
				Status: status,
			};
		}
		return {
			Success: true,
			Data: data as T[],
			Status: status,
		};
	}

	// Join operation (new functionality)
	if ('Tables' in record) {
		// Get the single K:V pair
		const [referencedTable, primaryTable] = Array.from(record.Tables.entries())[0];
		// console.log (referencedTable, primaryTable);

		const { data, error, status } = await client
			.from(primaryTable)
			.select (`*, ${referencedTable} (*)`)
			.eq(record.Column, record.Key);

		if (error) {
			return {
				Success: false,
				Error: {
					Message: error.message,
					Code: error.code,
					Details: error.details,
				},
				Status: status,
			};
		}

		return {
			Success: true,
			Data: data as T[],
			Status: status,
		};
	}

	// This should never happen with proper typing, but defensive programming
	return {
		Success: false,
		Error: {
			Message: "Invalid record type",
			Code: "INVALID_RECORD",
			Details: "Record must have either Table or Tables defined",
		},
		Status: 400,
	};
}