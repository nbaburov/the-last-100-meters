import RobotList from "@components/Admin/Robots/RobotList.jsx";
import BackToAdminHomePage from "@components/Admin/HomePage/BackToAdminHomePage.jsx";
import {useEmployee} from "@hooks/useEmployee.jsx";
import {useEffect} from "react";
import {useRobot} from "@hooks/useRobot.jsx";

const Robots = () => {

	const robotsDemo = [{
		id: 1,
		status: "Idle",
	}, {
		id: 3,
		status: "Idle",
	}, {
		id: 2,
		status: "Delivering",
	}, {
		id: 5,
		status: "Returning",
	}, {
		id: 6,
		status: "Charging",
	}, {
		id: 4,
		status: "Error",
	},];

	const { robots, getRobots } = useRobot();

	useEffect(() => {
		console.log(robots)
		getRobots()
	}, []);

	return (
		<div>
			<BackToAdminHomePage/>
			<RobotList robots={robots}/>
		</div>
	)
};

export default Robots;
