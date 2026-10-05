/* eslint-disable react/prop-types */
import {
	// Avatar,
	Button,
	Typography,
} from "@material-tailwind/react";
import CustomTable from "@components/CustomTable.jsx";
import { useNavigate } from "react-router-dom";
import CustomTableEmployees from "@components/CustomTableEmployees.jsx";

function UserList ( employees ) {

	const navigate = useNavigate();

	if(employees.employees == null)
	{
		return;
	}

	return (
		<section className="p-10 w-3/4 mx-auto rounded-2xl bg-white shadow-lg flex flex-col gap-4">
			{/* HARDCODED FOR NOW UNTIL FIXED */}
			<CustomTableEmployees
				data={employees.employees}
				header="Employees"
				subHeader="List of employees"
				onRowAction={(rowId) => {
					navigate(`/admin/employees/${rowId}`);
				}}
			/>
		</section>
	);
}

export default UserList;
