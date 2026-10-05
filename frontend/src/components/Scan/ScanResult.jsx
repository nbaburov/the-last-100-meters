/* eslint-disable react/prop-types */
import { Typography, Button } from "@material-tailwind/react";
import { CardCustom } from "@components/Card";
import { convertFloorIndexToString } from "@constants/utils";
const ScanResult = ({ packageData }) => {
	if (!packageData)
		return (
			<>
				<div className="flex flex-col items-center h-full gap-6">
					<Typography
						color="red"
						variant="h2"
						className="text-center"
					>
						Try again :(
					</Typography>
					<Typography variant="paragraph" className="text-center">
						Barcode not found
					</Typography>
					<Typography variant="paragraph" className="text-center">
						Employee not found
					</Typography>
					<a href="/scan">
						<Button>Try Again</Button>
					</a>
				</div>
			</>
		);
	if (!packageData.employee && packageData.barcode)
		return (
			<>
				<div className="flex flex-col items-center h-full gap-6">
					<Typography
						color="red"
						variant="h2"
						className="text-center"
					>
						We think there is a mistake :(
					</Typography>
					<div className="max-w-6xl mx-auto h-full bg-white flex flex-row justify-center items-start gap-4">
						<CardCustom
							smallHeader="Information about"
							header="Barcode"
							body={
								<div className="space-y-4">
									<div>
										<h3 className="font-semibold">ID</h3>
										<p>{packageData.barcode.id}</p>
									</div>
									<div>
										<h3 className="font-semibold">
											Scanned Barcode
										</h3>
										<img
											src={packageData.barcode.screenshot}
											alt="Scanned barcode"
											className="w-full max-w-xs mt-2 rounded-md"
										/>
									</div>
								</div>
							}
						/>
					</div>
					<Typography variant="paragraph" className="text-center">
						Employee not found
					</Typography>
					<a href="/scan">
						<Button>Try Again</Button>
					</a>
				</div>
			</>
		);

	return (
		<div className="flex flex-col items-center h-full gap-6">
			<Typography
				color="light-green"
				variant="h1"
				className="text-center"
			>
				Success!
			</Typography>
			<div className="max-w-6xl mx-auto h-full bg-white flex flex-row justify-center items-start gap-4">
				<CardCustom
					smallHeader="Information about"
					header="Barcode"
					body={
						<div className="space-y-4">
							<div>
								<h3 className="font-semibold">ID</h3>
								<p>{packageData.barcode.id}</p>
							</div>
							<div>
								<h3 className="font-semibold">
									Scanned Barcode
								</h3>
								<img
									src={packageData.barcode.screenshot}
									alt="Scanned barcode"
									className="w-full max-w-xs mt-2 rounded-md"
								/>
							</div>
						</div>
					}
				/>
				<CardCustom
					smallHeader="Information about"
					header="Employee"
					body={
						<div className="space-y-4">
							<div>
								<h3 className="font-semibold">Name</h3>
								<p>
									{packageData.employee.firstName}{" "}
									{packageData.employee.lastName}
								</p>
							</div>
							<div>
								<h3 className="font-semibold">Email</h3>
								<p>{packageData.employee.email}</p>
							</div>
							<div>
								<h3 className="font-semibold">
									Seating Location
								</h3>
								<p>
									{packageData.employee.endRow}
									{String.fromCharCode(
										65 + packageData.employee.endCol
									)} desk
									,{" "}
									{convertFloorIndexToString(
										packageData.employee.endFloorIndex
									)}
								</p>
							</div>
							<div>
								<h3 className="font-semibold">Availability</h3>
								<p>Available</p>
							</div>
						</div>
					}
				/>
			</div>
		</div>
	);
};

export default ScanResult;
