/* eslint-disable react/prop-types */

import { Typography } from "@material-tailwind/react";

const ConfirmComponent = ({ packageData }) => {

	return (
		<div className="flex flex-col items-center gap-6 p-8">
			<div className="flex flex-col items-center gap-4">
				<Typography variant="h3">Package Details</Typography>
				<Typography>Package ID: {packageData.id}</Typography>
				<Typography>
					Owner: {packageData.owner.firstName}{" "}
					{packageData.owner.lastName}
				</Typography>
				<Typography>Package Status: {packageData.status}</Typography>
			</div>
		</div>
	);
};

export default ConfirmComponent;
