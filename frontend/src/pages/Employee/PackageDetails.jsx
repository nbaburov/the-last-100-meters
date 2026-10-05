import { useParams } from "react-router-dom";
import PackageInformation from "@components/Employee/PackageInformation";
import { usePackage } from "@hooks/usePackage.jsx";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const PackageDetails = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const { packageById, getPackageById } = usePackage();
	const [robotPackage, setRobotPackage] = useState(null);
	const [isDelivered, setIsDelivered] = useState(false);
	const [progressValue, setProgressValue] = useState(0);
	const [currentMessage, setCurrentMessage] = useState("");

	useEffect(() => {
		getPackageById(id);
	}, [id]);

	useEffect(() => {
		if (packageById?.status === "Delivered") {
			setRobotPackage(null);
			setIsDelivered(true);
			setProgressValue(100);
		} else {
			setRobotPackage(packageById?.assignedRobot || null);
			setIsDelivered(false);

			if (packageById?.solvedMapPath) {
				const steps = packageById.solvedMapPath.split("");
				let currentStep = 0;
				let elapsedTime = 0;

				const interval = setInterval(() => {
					if (currentStep >= steps.length) {
						clearInterval(interval);
						navigate(`/employee/confirm/${packageById.id}`);
						return;
					}

					const stepTime =
						steps[currentStep] === "^" || steps[currentStep] === "v"
							? 4000
							: 2000;
					elapsedTime += 100;

					const currentMove = steps[currentStep];
					const isNearEnd = currentStep >= steps.length - 2;

					const getMessage = (move) => {
						if (isNearEnd) return "Do you see it coming? 👀";
						switch (move) {
							case "U":
								return "Robot is going up... 🔼";
							case "D":
								return "Robot is going down... 🔽";
							case "L":
								return "Robot is moving left... ⬅️";
							case "R":
								return "Robot is moving right... ➡️";
							case "^":
								return "Robot is taking the elevator up... 🛗. Takes a bit more time.";
							case "v":
								return "Robot is taking the elevator down... 🛗. Takes a bit more time.";
							default:
								return "";
						}
					};

					setCurrentMessage(getMessage(currentMove));

					if (elapsedTime >= stepTime) {
						currentStep++;
						elapsedTime = 0;
					}

					const progress = (currentStep * 100) / steps.length;
					setProgressValue(progress);
				}, 100);

				return () => clearInterval(interval);
			}
		}
	}, [packageById]);

	return (
		<PackageInformation
			packageData={packageById}
			robotData={robotPackage}
			isDelivered={isDelivered}
			progressValue={progressValue}
			currentMessage={currentMessage}
		/>
	);
};

export default PackageDetails;
