import { useState } from "react";
import backEndClient from "@constants/backendClient.js";

const mapUri = "maps";

export const useMap = () => {
	const [map, setMap] = useState([]);

	const getMap = async () => {
		try {
			const response = await backEndClient.get(mapUri + "/1");
			if (response) {
				setMap(response.data.map);
				return response.data.map;
			}
			console.log("Something went wrong");
			return [];
		} catch {
			alert("Something went wrong: Getting Backup");
			return getMapBackup();
		}
	};

	const getMapBackup = async () => {
		const backupMap = [
			[
				// Floor 1
				["P", "W", "E", "P", "P", "P", "P", "P"],
				["P", "W", "P", "W", "P", "P", "P", "P"],
				["P", "W", "P", "W", "S", "P", "P", "P"],
				["P", "W", "W", "W", "P", "W", "P", "P"],
				["P", "P", "P", "P", "P", "W", "P", "P"],
				["P", "W", "W", "P", "P", "W", "P", "P"],
			],
			[
				// Floor 2
				["P", "P", "E", "P", "W", "W", "P", "P"],
				["P", "W", "W", "P", "P", "W", "P", "P"],
				["P", "W", "P", "W", "P", "W", "P", "P"],
				["P", "W", "W", "P", "P", "W", "P", "P"],
				["P", "W", "P", "W", "P", "P", "P", "P"],
				["P", "W", "W", "P", "P", "W", "P", "P"],
			],
			[
				// Floor 3
				["P", "P", "E", "P", "P", "W", "P", "P"],
				["P", "W", "W", "W", "P", "W", "P", "P"],
				["P", "W", "P", "W", "W", "W", "P", "P"],
				["P", "W", "P", "W", "P", "P", "P", "P"],
				["P", "P", "P", "P", "P", "P", "P", "P"],
				["P", "W", "W", "W", "P", "P", "P", "P"],
			],
			[
				// Floor 3
				["P", "P", "E", "P", "P", "W", "W", "W"],
				["P", "W", "W", "W", "P", "W", "W", "W"],
				["P", "W", "P", "W", "W", "W", "W", "W"],
				["P", "W", "P", "W", "P", "P", "W", "W"],
				["P", "P", "P", "P", "P", "P", "W", "W"],
				["P", "W", "W", "W", "P", "P", "W", "W"],
			],
		];

		setMap(backupMap);
		return backupMap;
	};

	// const postMap = async (newMap) => {
	// 	try {
	// 		const response = await backEndClient.post(mapUri, { map: newMap });
	// 		setMap(newMap);
	// 		return response;
	// 	} catch (error) {
	// 		console.log(error);
	// 	}
	// };

	const updateMap = async (newMap) => {
		try {
			const response = await backEndClient.put(mapUri, { map: newMap });
			setMap(newMap);
			return response;
		} catch (error) {
			console.log(error);
		}
	};

	return {
		map,
		getMap,
		getMapBackup,
		updateMap,
		// postMap,
	};
};
