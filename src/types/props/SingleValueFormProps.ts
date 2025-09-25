export interface SingleValueFormProps <
	TValue extends string | number
> {
	title: string;
	description: string;
	labels: Record<TValue, string>;
	value: TValue | null;
	onChange?: (newValue: TValue) => void;
	onSubmit?: () => void;
}