import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "@pages/Index";
import SignIn from "@pages/SignIn";

import Mapping from "@pages/Demo/Mapping";

import Employee from "@pages/Employee/Employee";
import PackageDetails from "@pages/Employee/PackageDetails";
import ConfirmRecieved from "@pages/Employee/ConfirmRecieved";

import Scan from "@pages/Scan/Scan";
import ScanDetails from "@pages/Scan/ScanDetails";

import Accounts from "@pages/Admin/Accounts/Accounts";
import CreateAccount from "@pages/Admin/Accounts/Create";
import EditAccount from "@pages/Admin/Accounts/Edit";
import ViewAccount from "@pages/Admin/Accounts/View";

import Floors from "@pages/Admin/Floors/Floors";
import CreateFloor from "@pages/Admin/Floors/Create";
import EditFloor from "@pages/Admin/Floors/Edit";
import ViewFloor from "@pages/Admin/Floors/View";

import Employees from "@pages/Admin/Employees";
import Packages from "@pages/Admin/Packages";
import Robots from "@pages/Admin/Robots";

import LayoutWrapper from "@components/LayoutWrapper";
import AdminHomePage from "@pages/Admin/AdminHomePage.jsx";
import RobotDetails from "@pages/Robot/RobotDetails.jsx";

function App() {
	return (
		<LayoutWrapper>
			<Router>
				<Routes>
					{/* Public Routes */}
					<Route path="/" element={<Index />} />
					<Route path="/signin" element={<SignIn />} />

					{/* Demo Routes */}
					<Route path="/demo/mapping" element={<Mapping />} />

					{/* Employee Routes */}
					<Route path="/employee/:id" element={<Employee />} />
					<Route
						path="/employee/package/:id"
						element={<PackageDetails />}
					/>
					<Route
						path="/employee/confirm/:id"
						element={<ConfirmRecieved />}
					/>

					{/* Scan/DeliveryGuy Routes */}
					<Route path="/scan" element={<Scan />} />
					<Route path="/scan/:id" element={<ScanDetails />} />

					{/* Admin Routes */}
					<Route path="/admin/accounts" element={<Accounts />} />
					<Route
						path="/admin/accounts/create"
						element={<CreateAccount />}
					/>
					<Route
						path="/admin/accounts/edit/:id"
						element={<EditAccount />}
					/>
					<Route
						path="/admin/accounts/:id"
						element={<ViewAccount />}
					/>

					{/* Admin Home Page */}
					<Route path="/admin" element={<AdminHomePage/>} />

					{/* Admin Floors Routes */}
					<Route path="/admin/floors" element={<Floors />} />
					<Route
						path="/admin/floors/create"
						element={<CreateFloor />}
					/>
					<Route
						path="/admin/floors/edit/:id"
						element={<EditFloor />}
					/>
					<Route path="/admin/floors/:id" element={<ViewFloor />} />

					{/* Admin Employees Routes */}
					<Route path="/admin/employees" element={<Employees />} />
					<Route path="/admin/employees/:id" element={<Packages />} />

					{/*/!* Admin Packages Routes *!/*/}
					{/*<Route path="/admin/packages" element={<Packages />} />*/}

					{/* Admin Robots Routes */}
					<Route path="/admin/robots" element={<Robots />} />
					<Route path="/admin/robots/:id" element={<RobotDetails />} />
				</Routes>
			</Router>
		</LayoutWrapper>
	);
}

export default App;
