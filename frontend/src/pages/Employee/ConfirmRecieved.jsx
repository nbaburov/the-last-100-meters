import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { usePackage } from "@hooks/usePackage";
import ConfirmComponent from "@components/Employee/ConfirmComponent";
import { Loader } from "@components/Loader";
import EmployeeCardScanner from "@components/Employee/EmployeeCardScanner";
import { Button, Typography } from "@material-tailwind/react";
import { useEmployee } from "@hooks/useEmployee";

const ConfirmRecieved = () => {
	const navigate = useNavigate();
	const { id } = useParams();
	const [packageData, setPackageData] = useState(null);
	const { getPackageById, updatePackageArrived } = usePackage();
	const [isScanning, setIsScanning] = useState(true);
	const { getEmployeeByBarcodeId } = useEmployee();
	const [scanResult, setScanResult] = useState("");

	useEffect(() => {
		const fetchPackage = async () => {
			try {
				const data = await getPackageById(id);
				if (!data || !data.owner) {
					throw new Error("Invalid package data");
				}
				setPackageData(data);
			} catch (err) {
				console.error("Error fetching package data:", err);
				navigate("/error");
			}
		};

		fetchPackage();
	}, [id]);

	const handleScan = async ({ barcode }) => {
		try {
			const employee = await getEmployeeByBarcodeId(barcode.id);

			if (!employee) {
				setScanResult("Invalid employee card");
				return;
			}

			if (employee.id === packageData.owner.id) {
				setIsScanning(false);
				setScanResult("✅ Employee verified");
				await updatePackageArrived(packageData.id);
				navigate(`/employee/package/${packageData.id}`);
			} else {
				setScanResult("❌ This package doesn't belong to you");
			}
		} catch (error) {
			console.error("Error verifying employee:", error);
			setScanResult("Error verifying employee");
		}
	};

	const handleError = (error) => {
		console.error("Scanner error:", error);
	};

	if (!packageData) {
		return <Loader />;
	}

	return (
		<div className="container mx-auto px-4 py-8 flex flex-col items-center">
			<Typography variant="h2">Confirm Package Receipt</Typography>
			<Typography>Please scan your employee card to confirm</Typography>
			{scanResult && (
				<Typography
					className="mt-4"
					color={scanResult.includes("✅") ? "green" : "red"}
				>
					{scanResult}
				</Typography>
			)}
			<div className="flex flex-row items-center justify-center gap-6 p-8">
				<ConfirmComponent
					packageData={packageData}
					updatePackageArrived={updatePackageArrived}
				/>
				{isScanning && (
					<EmployeeCardScanner
						onScan={handleScan}
						onError={handleError}
						isScanning={isScanning}
					/>
				)}
			</div>

			{scanResult && (
				<Button
					color="gray"
					onClick={() => navigate("/")}
					className="mt-16"
				>
					Cancel
				</Button>
			)}
		</div>
	);
};

export default ConfirmRecieved;
