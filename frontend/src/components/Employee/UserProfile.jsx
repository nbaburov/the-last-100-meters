/* eslint-disable react/prop-types */
import {
	Avatar,
	Button,
	Typography,
} from "@material-tailwind/react";
import CustomTable from "@components/CustomTable";
import { useNavigate } from "react-router-dom";

function UserProfile({ employee, packages }) {

	const navigate = useNavigate();

	const logOut = () => {
		navigate("/")
	}

	if(employee.photo == null)
	{
		return;
	}

	console.log(packages)

	return (
		<section className="p-10 w-3/4 mx-auto rounded-2xl bg-white shadow-lg flex flex-col gap-4">
			<div className="flex items-center justify-between gap-4">
				<div className="flex items-center gap-4">
					<Avatar src={employee.photo} alt="user" size="lg" />
					<div>
						<Typography variant="h6">{employee.firstName} {employee.lastName}</Typography>
						<Typography variant="small">
							{employee.email}
						</Typography>
					</div>
				</div>
				<Button variant="outlined" onClick={logOut}>Logout</Button>
			</div>
			{/* HARDCODED FOR NOW UNTIL FIXED */}
			<CustomTable
				data={packages.packages}
				header="Packages"
				subHeader="List of packages"
				onRowAction={(rowId) => {
					navigate(`/employee/package/${rowId}`);
				}}
			/>
		</section>
	);
}

export default UserProfile;
