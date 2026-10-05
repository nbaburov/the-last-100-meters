import UserProfile from "@components/Employee/UserProfile";
import { Typography } from "@material-tailwind/react";
import {useParams, useSearchParams} from "react-router-dom";
import UserView from "@components/Admin/Users/UserView.jsx";
import {useEffect} from "react";
import {useEmployee} from "@hooks/useEmployee.jsx";
import BackToPreviousPage from "@components/BackToPreviousPage.jsx";
const Packages = () => {

	// // Code for Testing
	// const employeesDemo = [{
	// 	id: 1,
	// 	photo: "https://images.unsplash.com/photo-1521566652839-697aa473761a?q=80&w=2942&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
	// 	firstName: "John",
	// 	lastName: "Doe",
	// 	email: "john.doe@example.com",
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
	// }, {
	// 	id: 2,
	// 	image: "https://images.unsplash.com/photo-1521566652839-697aa473761a?q=80&w=2942&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
	// 	firstName: "Jane",
	// 	lastName: "Doe",
	// 	email: "jane.doe@example.com",
	// 	packages: [
	// 		{
	// 			id: 4,
	// 			name: "Package 1",
	// 			status: "Pending",
	// 		},
	// 	],
	// }, {
	// 	id: 3,
	// 	image: "https://images.unsplash.com/photo-1521566652839-697aa473761a?q=80&w=2942&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
	// 	name: "Doe",
	// 	lastName: "Doe",
	// 	email: "doe.doe@example.com",
	// 	packages: [
	// 	],
	// }];

	const { id } = useParams()

	// let employeeByIdDemo = employeesDemo[0]
	// let packagesDemo = employeesDemo[0].packages

	// New code linking to backend:
	// (I'm too afraid to change it so commented out for now.)
	const { employeeById, packages,getEmployeeById, updateEmployee, getEmployeePackages } = useEmployee();

	// Used Later
	const handleUpdate = async () => {
		// await updateEmployee();
		alert("Updated");
	};


	useEffect(() => {
		getEmployeeById(id)
		getEmployeePackages(id)
	}, []);

	useEffect(() => {
		console.log(employeeById);
	}, [employeeById]);

	useEffect(() => {
		console.log(packages);
	}, [packages]);

	return (
		<section className="flex flex-col items-center justify-center gap-4">
			<BackToPreviousPage/>
			<Typography variant="h2">Packages</Typography>
			{/* employeeDemo for now until it has been linked. */}
			<UserView employee={employeeById} packages={packages} />
		</section>
	);
};

export default Packages;
