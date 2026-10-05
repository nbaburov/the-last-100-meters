/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import CustomTableRobot from "@components/CustomTableRobot.jsx";

function RobotList ({ robots }) {

	const navigate = useNavigate();

	if(robots == null)
	{
		return;
	}

	return (
		<section className="p-10 w-3/4 mx-auto rounded-2xl bg-white shadow-lg flex flex-col gap-4">
			{/* HARDCODED FOR NOW UNTIL FIXED */}
			<CustomTableRobot
				data={robots}
				header="Robots"
				subHeader="List of robots"
				onRowAction={(robotId) => {
					navigate(`/admin/robots/${robotId}`);
				}}
			/>
		</section>
	);
}

export default RobotList;
