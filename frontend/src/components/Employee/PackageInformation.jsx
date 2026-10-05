/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Typography, Button, Progress } from "@material-tailwind/react";
import CardCustom from "@components/Card";
import { useNavigate } from "react-router-dom";
import { CheckCircleIcon } from "@heroicons/react/16/solid";
import { useEffect, useState } from "react";
import { convertFloorIndexToString } from "@constants/utils";
const PackageInformation = ({
	packageData,
	robotData,
	isDelivered,
	progressValue,
	currentMessage,
}) => {
	const navigate = useNavigate();

	console.log(packageData);

	const calculateProgress = () => {
		if (isDelivered) return 100;

		if (!packageData.solvedMapPath) return 0;

		const totalTime = packageData.solvedMapPath
			.split("")
			.reduce((acc, move) => {
				return acc + (move === "^" || move === "v" ? 5000 : 3000);
			}, 0);

		return { totalTime, steps: packageData.solvedMapPath.split("") };
	};

	if (!packageData) {
		return (
			<div>
				<Typography variant="h2" className="text-center">
					Package not found
				</Typography>
				<Button onClick={() => navigate(-1)} variant="outlined">
					Back
				</Button>
			</div>
		);
	}

	if (isDelivered) {
		return (
			<div>
				<div className="flex flex-col gap-4 items-center p-8">
					<div className="w-full flex flex-row gap-4 justify-start items-center">
						<Button onClick={() => navigate(-1)} variant="outlined">
							Back
						</Button>
						<Typography variant="h2" className="text-center">
							Hello {packageData.owner.firstName}
						</Typography>
					</div>
					<div className="flex flex-row gap-6 justify-stretch items-center shadow-lg rounded-lg p-4 bg-blue-gray-50 w-full">
						<div className="w-full flex flex-col gap-4">
							<CardCustom
								smallHeader="Information about"
								header="Package"
								body={
									<div className="space-y-4">
										<div>
											<h3 className="font-semibold">
												ID
											</h3>
											<p>{packageData.id}</p>
										</div>
										<div>
											<h3 className="font-semibold">
												Description
											</h3>
											<p>{packageData.description}</p>
										</div>
										<div>
											<h3 className="font-semibold">
												Weight
											</h3>
											<p>{packageData.weight}</p>
										</div>
										<div>
											<h3 className="font-semibold">
												Dimensions
											</h3>
											<p>{`${packageData.dimensions[0]}, ${packageData.dimensions[1]}, ${packageData.dimensions[2]}`}</p>
										</div>
									</div>
								}
							/>
							<CardCustom
								smallHeader="Delivery Status"
								header="Package Delivered"
								body={
									<div className="">
										<div>
											<h3 className="font-semibold">
												Status
											</h3>
											<p>
												Successfully delivered to{" "}
												{packageData.owner.firstName}
												{packageData.owner.lastName}
											</p>
											<CheckCircleIcon className="w-1/4 h-full m-auto mt-6 text-green-500" />
										</div>
									</div>
								}
							/>
						</div>
						<div className="w-full flex flex-col gap-4 justify-center items-center">
							<Typography
								variant="paragraph"
								className="text-center"
							>
								Package has been delivered to{" "}
								{packageData.owner.endRow}
								{String.fromCharCode(
									65 + packageData.owner.endCol
								)}{" "}
								desk ,{" "}
								{convertFloorIndexToString(
									packageData.owner.endFloorIndex
								)}
							</Typography>
							<div className="w-96 flex flex-col gap-4">
								<Progress value={100} size="lg" color="green" />
								<Typography
									variant="h6"
									className="text-center text-green-500"
								>
									Delivery Completed
								</Typography>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="flex flex-col gap-4 items-center p-8">
			<div className="w-full flex flex-row gap-4 justify-start items-center">
				<Button onClick={() => navigate(-1)} variant="outlined">
					Back
				</Button>
				<Typography variant="h2" className="text-center">
					Hello {packageData.owner.firstName}
				</Typography>
			</div>
			<div className="flex flex-row gap-6 justify-stretch items-center shadow-lg rounded-lg p-4 bg-blue-gray-50 w-full">
				<div className="w-full flex flex-col gap-4">
					<CardCustom
						smallHeader="Information about"
						header="Package"
						body={
							<div className="space-y-4">
								<div>
									<h3 className="font-semibold">ID</h3>
									<p>{packageData.id}</p>
								</div>
								<div>
									<h3 className="font-semibold">
										Description
									</h3>
									<p>{packageData.description}</p>
								</div>
								<div>
									<h3 className="font-semibold">Weight</h3>
									<p>{packageData.weight}</p>
								</div>
								<div>
									<h3 className="font-semibold">
										Dimensions
									</h3>
									<p>{`${packageData.dimensions[0]}, ${packageData.dimensions[1]}, ${packageData.dimensions[2]}`}</p>
								</div>
							</div>
						}
					/>
					{robotData ? (
						<CardCustom
							smallHeader="Information about"
							header="Robot"
							body={
								<div className="space-y-4">
									<div>
										<h3 className="font-semibold">ID</h3>
										<p>{robotData.robotId}</p>
									</div>
									<div>
										<h3 className="font-semibold">
											ETA to Location
										</h3>
										<p>{robotData.eta}</p>
									</div>
									<div>
										<h3 className="font-semibold">
											Status
										</h3>
										<p>{robotData.status}</p>
									</div>
								</div>
							}
						/>
					) : (
						<p>Robot assignment pending...</p>
					)}
				</div>
				<div className="w-full flex flex-col gap-4 justify-center items-center">
					<Typography variant="paragraph" className="text-center">
						Package will be delivered to {packageData.owner.endRow}
						{String.fromCharCode(
							65 + packageData.owner.endCol
						)}{" "}
						desk ,{" "}
						{convertFloorIndexToString(
							packageData.owner.endFloorIndex
						)}
					</Typography>
					<div className="w-96 flex flex-col gap-4">
						<Progress
							value={progressValue}
							size="lg"
							color={isDelivered ? "green" : "blue"}
						/>
						<Typography variant="h6" className="text-center">
							{isDelivered
								? "Delivery Completed"
								: `Delivery in Progress: ${Math.round(
										progressValue
								  )}%`}
						</Typography>
						{!isDelivered && currentMessage && (
							<div className="animate-fade-in-out">
								<Typography
									variant="paragraph"
									className="text-center text-blue-gray-600 transition-opacity duration-500"
								>
									{currentMessage}
								</Typography>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default PackageInformation;
