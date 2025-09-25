import { APIPayload } from "@/types/primitives/ExternalAPIPayload";
import { DBRow, PropertyMapping } from "@/types/primitives/TableRecord";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}



export function mapPayloadToDBRow<
	TPayload extends APIPayload,
	TDBRow extends DBRow
>(
	payload: TPayload,
	mapping: PropertyMapping<TPayload, TDBRow>
): Partial<TDBRow> {
	const result = {} as Partial<TDBRow>;

	// Iterate over each key in the mapping object
	Object.keys(mapping).forEach((payloadKey) => {
		const dbColumn = mapping[payloadKey as keyof TPayload];
		const value = payload[payloadKey as keyof TPayload];

		// Only add to result if mapping exists and value is not undefined
		if (dbColumn && value !== undefined) {
			(result as any)[dbColumn] = value;
		}
	});

	return result;
}
