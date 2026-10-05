import CustomTable from "@components/CustomTable.jsx";
import {useEmployee} from "@hooks/useEmployee.jsx";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import UserList from "@components/Admin/Users/UserList.jsx";
import BackToAdminHomePage from "@components/Admin/HomePage/BackToAdminHomePage.jsx";
import {Typography} from "@material-tailwind/react";
import BackToPreviousPage from "@components/BackToPreviousPage.jsx";
import {useForceUpdate} from "framer-motion";

const Employees = () => {

	// // Old employees list demo for testing.
	// const employeesDemo = [{
	// 	id: 1,
	// 	image: "https://images.unsplash.com/photo-1521566652839-697aa473761a?q=80&w=2942&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
	// 	name: "John Doe",
	// 	email: "john.doe@example.com",
	// 	role: "Employee"
	//
	// }, {
	// 	id: 2,
	// 	image: "https://images.unsplash.com/photo-1521566652839-697aa473761a?q=80&w=2942&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
	// 	name: "Jane Doe",
	// 	email: "jane.doe@example.com",
	// 	role: "Employee"
	//
	// }, {
	// 	id: 3,
	// 	image: "https://images.unsplash.com/photo-1521566652839-697aa473761a?q=80&w=2942&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
	// 	name: "Doe Doe",
	// 	email: "doe.doe@example.com",
	// 	role: "Employee"
	// }];

	const { employees, getEmployees } = useEmployee();

	useEffect(() => {
		console.log(employees)
		getEmployees()
	}, []);

	return (
		<div className="flex flex-col items-center justify-center gap-4">
			<BackToPreviousPage/>
			<Typography variant="h2">Employees</Typography>
			<UserList employees={employees}/>
		</div>
	)
};

export default Employees;
