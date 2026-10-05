import { useParams } from "react-router-dom";
import RobotInformation from "@components/Admin/Robots/RobotInformation.jsx";
import BackToPreviousPage from "@components/BackToPreviousPage.jsx";
import {useRobot} from "@hooks/useRobot.jsx";
import {useEffect} from "react";
const RobotDetails = () => {
	// const robotDataDemo = {
	// 	id: 1,
	// 	eta: "10 minutes",
	// 	status: "Functioning",
	// };
	const robotActions = [
		{
			robotId: 1,
			action: 'Charging',
			time: '13:15'
		},{
			robotId: 1,
			action: 'Done Charging, status set to Idle',
			time: '13:26'
		},{
			robotId: 1,
			action: 'Package Linked',
			time: '13:34'
		},{
			robotId: 1,
			action: 'Finding Path...',
			time: '13:34'
		},{
			robotId: 1,
			action: 'Path Found! Delivering to location',
			time: '13:34'
		},{
			robotId: 1,
			action: 'ERROR: STRUCTURE IN PATH. Finding new Path...',
			time: '13:39'
		},{
			robotId: 1,
			action: 'Path Found! Delivering to location',
			time: '13:39'
		},{
			robotId: 1,
			action: 'Arrived at location! Waiting for confirmation...',
			time: '13:43'
		},{
			robotId: 1,
			action: 'Delivery confirmed! Returning to docking station',
			time: '13:45'
		}
	]

	const { id } = useParams()

	const { robotById, getRobotById } = useRobot();

	useEffect(() => {
		getRobotById(id)
		console.log(id)
		console.log(robotById)
	}, []);

	return (
		<>
			<BackToPreviousPage/>
			<br/>
			<br/>
			<RobotInformation
				robotData={robotById}
				robotActions={robotActions}
			/>
		</>
	);
};

export default RobotDetails;
