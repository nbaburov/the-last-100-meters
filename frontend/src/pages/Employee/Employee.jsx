import UserProfile from "@components/Employee/UserProfile";
import { Typography } from "@material-tailwind/react";
import {useMap} from "@hooks/useMap.jsx";
import {useEmployee} from "@hooks/useEmployee.jsx";
import {useEffect} from "react";
import {useParams, useSearchParams} from "react-router-dom";
import {usePackage} from "@hooks/usePackage.jsx";
const Employee = () => {

	// // Old hardcoded code for demo purposes.
	// const employeeDemo = {
	// 	name: "John Doe",
	// 	email: "john.doe@example.com",
	// 	image: "https://images.unsplash.com/photo-1521566652839-697aa473761a?q=80&w=2942&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
	// 	packages: [
	// 		{
	// 			id: 1,
	// 			name: "Package 1",
	// 			status: "Pending",
	// 		},
	// 		{
	// 			id: 2,
	// 			name: "Package 2",
	// 			status: "Delivered",
	// 		},
	// 	],
	// };


	// New code linking to backend:
	// (I'm too afraid to change it so commented out for now.)
	const { employeeById, packages,getEmployeeById, getEmployeePackages } = useEmployee();

	// Used Later
	const handleUpdate = async () => {
		// await updateEmployee();
		alert("Updated");
	};

	const { id } = useParams()

	useEffect(() => {
		getEmployeeById(id)
		console.log(employeeById)
		getEmployeePackages(id)
		console.log(packages)
	}, []);

	useEffect(() => {
		console.log(employeeById);
	}, [employeeById]);

	useEffect(() => {
		console.log(packages);
	}, [packages]);

	return (
		<section className="flex flex-col items-center justify-center gap-4">
			<Typography variant="h2">Packages</Typography>
			{/* employeeDemo for now until it has been linked. */}
			<UserProfile employee={employeeById} packages={packages} />
		</section>
	);
};

export default Employee;
