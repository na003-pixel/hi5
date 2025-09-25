type APIResponseBase = {
	Status?: number;
	Meta?: unknown;
};

export type APIError = {
	Message: string;
	Code?: string | number;
	Details?: unknown;
};

export type APIResponse <T, E = APIError> = | (
	APIResponseBase & {
		Success: true;
		Data: T;
		Error?: never
	}) | (
	APIResponseBase & {
		Success: false;
		Error: E;
		Data?: never
	}
);
