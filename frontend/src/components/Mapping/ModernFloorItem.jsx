/* eslint-disable react/prop-types */
import { useState, useCallback, useEffect } from "react";
import { dictCharToColor, dictColorToChar } from "@constants/map";

export default function ModernFloorItem({
	floor,
	selectedTool,
	gridSize,
	onGridUpdate,
}) {
	const [isDrawing, setIsDrawing] = useState(false);
	const [grid, setGrid] = useState([]);

	// Initialize grid from floor data
	useEffect(() => {
		if (floor) {
			console.log(floor)
			setGrid(floor);
		}
	}, [floor]);

	// Handle cell update
	const updateCell = useCallback(
		(rowIndex, colIndex) => {
			setGrid((currentGrid) => {
				const newGrid = currentGrid.map((row, rIndex) => {
					if (rIndex === rowIndex) {
						return row.map((cell, cIndex) => {
							if (cIndex === colIndex) {
								return dictColorToChar[selectedTool];
							}
							return cell;
						});
					}
					return row;
				});
				onGridUpdate(newGrid);
				return newGrid;
			});
		},
		[selectedTool, onGridUpdate]
	);

	// Mouse event handlers
	const handleMouseDown = useCallback(
		(rowIndex, colIndex) => {
			setIsDrawing(true);
			updateCell(rowIndex, colIndex);
		},
		[updateCell]
	);

	const handleMouseEnter = useCallback(
		(rowIndex, colIndex) => {
			if (isDrawing) {
				updateCell(rowIndex, colIndex);
			}
		},
		[isDrawing, updateCell]
	);

	const handleMouseUp = useCallback(() => {
		setIsDrawing(false);
	}, []);

	// Cleanup mouse events
	useEffect(() => {
		window.addEventListener("mouseup", handleMouseUp);
		return () => window.removeEventListener("mouseup", handleMouseUp);
	}, [handleMouseUp]);

	if (!grid.length) return null;

	return (
		<div
			className="grid gap-1 bg-blue-gray-100 p-4 rounded-lg"
			style={{
				gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))`,
			}}
		>
			{grid.map((row, rowIndex) =>
				row.map((cell, colIndex) => (
					<div
						key={`${rowIndex}-${colIndex}`}
						className="aspect-square rounded transition-colors duration-200"
						style={{ backgroundColor: dictCharToColor[cell] }}
						onMouseDown={() => handleMouseDown(rowIndex, colIndex)}
						onMouseEnter={() =>
							handleMouseEnter(rowIndex, colIndex)
						}
					/>
				))
			)}
		</div>
	);
}
