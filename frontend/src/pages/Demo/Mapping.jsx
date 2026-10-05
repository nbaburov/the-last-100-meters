/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { useMap } from "@hooks/useMap";
import SaveMap from "@components/Mapping/SaveMap.jsx";
import FloorList from "@components/Mapping/FloorList.jsx";
import ToolBar from "@components/Mapping/ToolBar.jsx";
import FloorItem from "@components/Mapping/FloorItem.jsx";
import ModernToolBar from "@components/Mapping/ModernToolBar";
import { div } from "framer-motion/client";
import BackToAdminHomePage from "@components/Admin/HomePage/BackToAdminHomePage.jsx";
import BackToPreviousPage from "@components/BackToPreviousPage.jsx";

export default function MapPage() {
	// ! OLD LOGIC I AM NOT TOUCHING THIS :)

	// const [floors, setFloors] = useState([]);
	// const [mapPlan, setMapPlan] = useState([]);
	// const [loaded, setloaded] = useState(false);

	// const addFloor = async (title, content) => {
	//     await postPost(title, content /*,loggedInUser*/)
	//         .then(fetchData)
	// }

	// const removeFloor = async id => {
	//     await deletePost(id)
	//         .then(fetchData)
	//     // setToDoItems(todoItems => todoItems.filter((item) => item.id !== id));
	// }

	// const getFloors = async () => {
	//     for(let i = 0; i < mapPlan.length; i++)
	//     {
	//         setFloors(oldFloors => [...oldFloors, mapPlan[i]]);
	//         console.log(floors)
	//     }
	// }

	// const save = async (map) => {
	// 	await postMap(map);
	// 	alert("Saved");
	// };

	// async function fetchData() {
	// 	let map = await getMap();
	// 	await setMapPlan(map);
	// }

	// useEffect(() => {
	// 	// setToDoItems(getTodos());
	// 	fetchData();
	// }, []);

	// useEffect(() => {
	// 	console.log(mapPlan);
	// }, [mapPlan]);

	// useEffect(() => {
	//     getFloors()
	// }, [map]);

	// NEW LOGIC USING HOOKS
	const { map, getMap, updateMap } = useMap();

	const handleSave = async localMap => {
		await updateMap(localMap);
		alert("Saved");
	};

	useEffect(() => {
		getMap();
	}, []);

	return (
		<div className="w-full h-full flex flex-col justify-center items-center">
			<BackToPreviousPage/>
			<ModernToolBar
				onSave={handleSave}
				mapPlan={map}
			/>
		</div>
	);
}
