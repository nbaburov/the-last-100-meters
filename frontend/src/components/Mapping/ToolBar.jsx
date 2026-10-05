/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import styles from "@styles/Mapping/ToolBar.module.css";
import FloorItem from "@components/Mapping/FloorItem.jsx";
import { Button, Select, ButtonGroup } from "@material-tailwind/react";

export default function ToolBar(props) {
	useEffect(() => {
		props.setloaded(true);
	}, []);

	const [numberValue, setValue] = useState(6);

	function handleChange(event) {
		setValue(event.target.value);
	}

	if (props.mapPlan != undefined && props.mapPlan.length > 0) {
		return (
			<div id="test">
				<div className="navbar flex flex-row gap-2 w-full justify-center">
					<ButtonGroup variant="outlined">
						<Button color="red" className="btnReset">
							Reset
						</Button>
						<Button color="blue" className="btnSave">
							Save
						</Button>

						<Button color="green" className="btnStart">
							Start
						</Button>
						<Button className="btnWall">Wall</Button>
						<Button className="btnEnd">End</Button>
						<Button className="btnElevator">Elevator</Button>
						<Button className="btnErase">Erase</Button>
					</ButtonGroup>
					<input
						type="color"
						value="#000000"
						className="color"
						hidden
					/>
					<input
						type="number"
						value={numberValue}
						className="size"
						onChange={handleChange}
						hidden
					/>

					<select name="floors" id="floors"></select>
				</div>
				<div className="cont">
					<div
						className={styles.container}
						id="container"
						style={{ "--size": 6 }}
					>
						<FloorItem mapPlan={props.mapPlan} save={props.save} />
					</div>
				</div>
			</div>
		);
	}
}
