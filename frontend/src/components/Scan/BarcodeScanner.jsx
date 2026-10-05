/* eslint-disable react/prop-types */
import { useEffect, useRef } from "react";
import Quagga from "quagga";

const BarcodeScanner = ({ onScan, onError, isScanning }) => {
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
					readers: [
						"ean_reader",
						"ean_8_reader",
						"code_128_reader",
						"code_39_reader",
					],
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
			const now = Date.now();
			if (now - lastScanRef.current < SCAN_INTERVAL) {
				return;
			}

			if (result.codeResult.code) {
				console.log("Barcode scanned:", result.codeResult.code);
				lastScanRef.current = now;
				const screenshot = takeScreenshot();
				onScan({
					barcode: {
						id: result.codeResult.code,
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

export default BarcodeScanner;
