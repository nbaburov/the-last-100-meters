/* eslint-disable react/prop-types */
import { useEffect, useRef } from "react";
import Quagga from "quagga";

const EmployeeCardScanner = ({ onScan, onError, isScanning }) => {
	const videoRef = useRef(null);
	const lastScanRef = useRef(0);
	const SCAN_INTERVAL = 1500; // Minimum 1.5 seconds between scans

	useEffect(() => {
		if (!isScanning) {
			Quagga.stop();
			return;
		}

		Quagga.init(
			{
				inputStream: {
					name: "Live",
					type: "LiveStream",
					target: videoRef.current,
					constraints: {
						facingMode: "environment",
					},
				},
				decoder: {
					readers: ["i2of5_reader", "2of5_reader", "codabar_reader"],
				},
			},
			(err) => {
				if (err) {
					onError(err);
					return;
				}
				Quagga.start();
			}
		);

		Quagga.onDetected((result) => {
			// console.log("Result:", result);
			const now = Date.now();
			if (now - lastScanRef.current < SCAN_INTERVAL) {
				return;
			}

			if (result.codeResult.code) {
				const cleanedCode = result.codeResult.code.replace(/^A|A$/g, ""); // Remove "A" at the start and end
				console.log("Employee card scanned:", cleanedCode);
				lastScanRef.current = now;
				const screenshot = takeScreenshot();
				onScan({
					barcode: {
						id: cleanedCode,
						screenshot,
					},
					employee: null,
				});
			}
		});

		return () => {
			Quagga.stop();
		};
	}, [onScan, onError, isScanning]);

	const takeScreenshot = () => {
		const canvas = document.createElement("canvas");
		const video = videoRef.current.querySelector("video");
		canvas.width = video.videoWidth;
		canvas.height = video.videoHeight;
		canvas.getContext("2d").drawImage(video, 0, 0);
		return canvas.toDataURL("image/jpeg");
	};

	if (!isScanning) return null;

	return (
		<div className="flex justify-center">
			<div ref={videoRef} className="w-full h-[400px]" />
		</div>
	);
};

export default EmployeeCardScanner;
