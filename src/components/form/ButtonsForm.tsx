import { Button } from "@/components/ui/button"
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
import { SingleValueFormProps } from "@/types/props/SingleValueFormProps"

export default function GenericForm<TValue extends string | number>({
	title,
	description,
	labels,
	value,
	onChange,
	onSubmit,
}: SingleValueFormProps<TValue>) {
	const options = Object.keys(labels) as TValue[];

	return (
		<Card className="w-full max-w-sm">
			<CardHeader>
				<CardTitle className="text-left">{title}</CardTitle>
				<CardDescription>{description}</CardDescription>
			</CardHeader>
			<CardContent>
				<div className="flex flex-col gap-6">
					{options.map((option) => (
						<div key={String(option)} className="grid gap-2">
							<div className="flex items-center">
								<Button
									variant={value === option ? "selected" : "default"}
									type="button"
									className="w-full"
									onClick={() => onChange?.(option)}
								>
									{labels[option]}
								</Button>
							</div>
						</div>
					))}
				</div>
			</CardContent>
			<CardFooter className="flex-col gap-2">
				<Button
					variant="outline"
					className="w-full"
					onClick={onSubmit}
					disabled={value == null}
				>
					Submit
				</Button>
			</CardFooter>
		</Card>
	);
}