import { CountUpStats } from "@components/Stats";
import { Typography, Button } from "@material-tailwind/react";
const Index = () => {
	return (
		<div className="p-8 flex flex-col gap-8 items-center justify-center min-h-full">
			<Typography variant="h1">Hi!</Typography>
			<Typography variant="h5">
				Don&apos;t be scared, this is the future.
			</Typography>
			<a href="/scan">
				<Button ripple={true} color="blue" variant="gradient" size="lg">
					Scan
				</Button>
			</a>
			<Typography variant="small">
				Scan the barcode in the next step and leave the rest to us.
			</Typography>

			<CountUpStats />
		</div>
	);
};

export default Index;
