import { GenericImageHeader } from "@/components/GenericImageHeader";


export default function TestGenericImageHeader() {
	// Basic usage with defaults
	return (
		<div className="grid md:grid-cols-3">

			<div className="md:col-span-2 md:col-start-2 space-y-8">
				{/* <h1 className="text-4xl text-bold text-center">
					Get image of a speciifc size
				</h1>
				<p>
					Note that henceforth all
				</p>
				<pre>
					<code>
						padding:top-6
					</code>
				</pre>
				<p>
					is to override the pt-0 in default shadcn
				</p>
				<pre>
					<code>
						Card
					</code>
				</pre>


				<GenericImageHeader
					displaySize={{
						width: 800,
						height: 800
					}}
					imageSize={{
						width: 1005,
						height: 670
					}}

					padding={{
						top: 6
					}}

				/>
				<h1 className="text-4xl text-bold text-center">
					Fill upto aspect ratio
				</h1>

				<GenericImageHeader
					fill={true}
					imageSize={{
						width: 1005,
						height: 670
					}}
					aspectRatio={{
						width: 3,
						height: 2
					}}
					rounded="xl"

					padding={{
						top: 6
					}}

					margin={{
						// y: 10,
						// top: 20,
						bottom: 20,
					}}
				/>

				<h1 className="text-4xl text-bold text-center">
					Fill maximum, expand as maximally
				</h1> */}

				<GenericImageHeader
					fill={true}
					heightFillStrategy="h-[100vh]"
					imageSize={{
						width: 1005,
						height: 670
					}}
					rounded="xl"

					padding={{
						top: 6
					}}

					margin={{
						// y: 10,
						// top: 20,
						// bottom: 20,
					}}

					className="
						relative 
						after:absolute 
						after:inset-0 
						after:content-['']
						after:bg-gradient-to-l
						after:from-transparent
						after:to-background
						border-0
					"


					divStyles={{
						background: "linear-gradient(to left, transparent, var(--background))"
					}}


				/>
			</div>
		</div>);
}