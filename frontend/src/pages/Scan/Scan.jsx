import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BarcodeScanner from "@components/Scan/BarcodeScanner";
import { usePackage } from "@hooks/usePackage";

const Scan = () => {
	const navigate = useNavigate();
	const [error, setError] = useState(null);
	const [isScanning, setIsScanning] = useState(true);
	const { createPackageFromBarcode } = usePackage();

	const handleScan = async ({ barcode }) => {
		try {
			setIsScanning(false);
			sessionStorage.setItem("lastScan", barcode.screenshot);
			sessionStorage.setItem("barcode", barcode.id);

			const result = await createPackageFromBarcode(barcode.id);
			navigate(`/scan/${result.id}`);
		} catch (err) {
			console.error(err);
			setError("Failed to process scan");
			setIsScanning(true);
		}
	};

	const handleError = (err) => {
		setError("Failed to initialize camera");
		console.error(err);
	};

	return (
		<div className="container mx-auto px-4 py-8 flex flex-col items-center">
			<h1 className="text-2xl font-bold mb-6">Scan Package</h1>
			{error && (
				<div className="bg-red-100 text-red-700 p-4 rounded mb-4">
					{error}
				</div>
			)}
			<BarcodeScanner
				onScan={handleScan}
				onError={handleError}
				isScanning={isScanning}
			/>
		</div>
	);
};

export default Scan;
