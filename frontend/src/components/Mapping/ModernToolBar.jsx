/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState, useCallback, useEffect } from "react";
import { Button, ButtonGroup, Select, Option } from "@material-tailwind/react";
import ModernFloorItem from "./ModernFloorItem";
import { dictCharToColor } from "@constants/map";

export default function ModernToolBar({ mapPlan, onSave }) {
	const [selectedTool, setSelectedTool] = useState(dictCharToColor.W);
	const [gridSize, setGridSize] = useState(6);
	const [currentFloor, setCurrentFloor] = useState(0);
	const [localMapPlan, setLocalMapPlan] = useState(mapPlan);

	useEffect(() => {
		setLocalMapPlan(mapPlan);
		if(mapPlan.length > 0)
		{
			setGridSize(mapPlan[0][0].length)
		}
	}, [mapPlan]);

	// Handle grid updates from the floor component
	const handleGridUpdate = useCallback(
		(newGrid) => {
			const updatedMapPlan = [...localMapPlan];
			updatedMapPlan[currentFloor] = newGrid;
			setLocalMapPlan(updatedMapPlan);
		},
		[currentFloor, localMapPlan]
	);

	// Handle save action
	const handleSave = useCallback(() => {
		console.log("save")
		console.log(localMapPlan)
		onSave(localMapPlan);
	}, [localMapPlan, onSave]);

	// Handle floor change
	const handleFloorChange = useCallback((value) => {
		setCurrentFloor(Number(value));
	}, []);

	if (!mapPlan?.length) return null;

	return (
		<div className="w-full max-w-4xl mx-auto p-4">
			<div className="flex flex-col gap-4">
				{/* Tools Section */}
				<div className="flex justify-between items-center gap-2">
					<ButtonGroup variant="outlined">
						{/*<Button onClick={() => setLocalMapPlan(mapPlan)}>*/}
						{/*	Reset*/}
						{/*</Button>*/}
						<Button onClick={handleSave} style={{height:58}}>
							Save
						</Button>
					</ButtonGroup>
					<ButtonGroup variant="outlined" style={{marginRight:20}}>
						<Button
							onClick={() => setSelectedTool(dictCharToColor.S)}
							className={
								selectedTool === dictCharToColor.S
									? "bg-red-300"
									: ""
							}
							style={{position:"relative", overflow:"hidden"}}
						>
							Docking Station
						</Button>
						<Button
							onClick={() => setSelectedTool(dictCharToColor.W)}
							className={
								selectedTool === dictCharToColor.W
									? "bg-gray-400"
									: ""
							}
							style={{position:"relative", overflow:"hidden", paddingRight:33}}
						>
							Wall
						</Button>
						<Button
							onClick={() => setSelectedTool(dictCharToColor.E)}
							className={
								selectedTool === dictCharToColor.E
									? "bg-pink-200"
									: ""
							}
							style={{position:"relative", overflow:"hidden", paddingRight:33}}
						>
							Elevator
						</Button>
						<Button
							onClick={() => setSelectedTool(dictCharToColor.P)}
							className={
								selectedTool === dictCharToColor.P
									? "bg-gray-400"
									: ""
							}
							style={{position:"relative", overflow:"hidden", paddingRight:33}}
						>
							Erase
						</Button>
					</ButtonGroup>

					<Select
						value={currentFloor.toString()}
						onChange={handleFloorChange}
						label="Floor"
					>
						{mapPlan.map((_, index) => (
							<Option key={index} value={index.toString()}>
								Floor {index}
							</Option>
						))}
					</Select>
				</div>

				{/* Grid Section */}
				<ModernFloorItem
					floor={localMapPlan[currentFloor]}
					selectedTool={selectedTool}
					gridSize={gridSize}
					onGridUpdate={handleGridUpdate}
				/>
			</div>
		</div>
	);
}
