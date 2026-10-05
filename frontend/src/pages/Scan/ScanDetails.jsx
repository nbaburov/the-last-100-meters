import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { usePackage } from "@hooks/usePackage";
import ScanResult from "@components/Scan/ScanResult";
import { Loader } from "@components/Loader";
const ScanDetails = () => {
	const { id } = useParams();
	const [packageData, setPackageData] = useState(null);
	const { getPackageById } = usePackage();
	const MAX_RETRIES = 3;
	const RETRY_DELAY = 10000; // 1 second

	useEffect(() => {
		let retryCount = 0;
		let timeoutId;

		const fetchPackageData = async () => {
			try {
				const packageDetails = await getPackageById(id);
				console.log(packageDetails);
				setPackageData({
					barcode: {
						id: sessionStorage.getItem("barcode"),
						screenshot: sessionStorage.getItem("lastScan"),
					},
					employee: packageDetails.owner,
				});
			} catch (err) {
				console.error(err);
				if (retryCount < MAX_RETRIES) {
					retryCount++;
					timeoutId = setTimeout(fetchPackageData, RETRY_DELAY);
				} else {
					setPackageData({
						barcode: {
							id: sessionStorage.getItem("barcode"),
							screenshot: sessionStorage.getItem("lastScan"),
						},
						employee: null,
					});
				}
			}
		};

		fetchPackageData();

		return () => {
			if (timeoutId) clearTimeout(timeoutId);
		};
	}, [id, getPackageById]);

	if (!packageData) {
		return <Loader />;
	}

	return (
		<div className="mx-auto px-4 py-8 h-full">
			<ScanResult packageData={packageData} />
		</div>
	);
};

export default ScanDetails;
