/* eslint-disable react/prop-types */
import {
	Card,
	CardHeader,
	CardBody,
	Typography,
} from "@material-tailwind/react";

export function CardCustom({ smallHeader, header, body }) {
	return (
		<Card
			variant="gradient"
			shadow={true}
			className="w-auto min-w-96 min-h-96"
		>
			<CardHeader floated={false} shadow={false} className="rounded-none">
				<Typography
					variant="small"
					color="blue-gray"
					className="font-medium"
				>
					{smallHeader}
				</Typography>
				<Typography
					color="blue-gray"
					className="mt-1 mb-2 text-[20px] font-bold"
				>
					{header}
				</Typography>
			</CardHeader>
			<CardBody className="px-4 pt-0">
				<Typography className="font-normal text-gray-600">
					{body}
				</Typography>
			</CardBody>
		</Card>
	);
}

export default CardCustom;
