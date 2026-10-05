/* eslint-disable react/prop-types */
import {
	Typography,
	Card,
	CardHeader,
	CardBody,
	IconButton,
	Input, Avatar, Button,
} from "@material-tailwind/react";
import { MagnifyingGlassIcon, EyeIcon } from "@heroicons/react/24/outline";
import {robotStatusBackColor} from "@constants/robotStatusBackColor.js";
import {robotStatusColor} from "@constants/robotStatusColor.js";
import RoleSelector from "@components/RoleSelector.jsx";
import {useEmployee} from "@hooks/useEmployee.jsx";
import EditPosition from "@components/EditPosition.jsx";
import {useState} from "react";
import employee from "@pages/Employee/Employee.jsx";
import ModernEditPosition from "@components/ModernEditPosition.jsx";

function CustomTable({ header, subHeader, data, onRowAction }) {

	const [showAlert, setAlert] = useState(false)
	const [employee, setEmployee] = useState()

	const editEmployee = emp => {
		setAlert(true);
		setEmployee(emp);
	}

	const setPosition = (floor, row, col) => {
		let emp = employee
		emp.endFloorIndex=floor
		emp.endRow=row
		emp.endCol=col
	}

	// Generate column names from the keys of the first data object
	const columns =
		data.length > 0
			? Object.keys(data[0]).map((key) => ({
					header: key,
					accessor: key,
			  }))
			: [];

	function isValidHttpUrl(string) {
		let url;
		try {
			url = new URL(string);
		} catch (_) {
			if (Object.values(robotStatusBackColor).includes(string)) {
				let backcolor = Object.keys(robotStatusBackColor).find(
					key => robotStatusBackColor[key] === string
				)
				let color = robotStatusColor[backcolor]

				return <div style={{
					backgroundColor: backcolor,
					color: color,
					padding: '5px 20px',
					borderRadius: '15px',
					display: 'inline-block',
					width: '100px',
					textAlign: 'center',
				}}>
					{string}
				</div>
			}

			return string;
		}

		return <Avatar src={url}></Avatar>
	}

	const setHeader = header => {
		if(header == "endCol" || header == "endRow")
		{
			return;
		}
		if(header == "endFloorIndex")
		{
			return "Position";
		}
		return header;
	}

	function setItems(row, accessor) {
		if(accessor == 'endCol' || accessor == 'endRow')
		{
			return;
		}
		if(accessor == 'endFloorIndex')
		{
			return `[Floor: ${row.endFloorIndex}, Row: ${row.endRow}, Col: ${row.endCol}]`
		}

		return isValidHttpUrl(row[accessor])
	}

	return (
		<section className="">
			<Card className="h-full w-full">
				<CardHeader
					floated={false}
					shadow={false}
					className="rounded-sm flex flex-wrap gap-4 justify-between mb-4"
				>
					<div>
						<Typography variant="h6" color="blue-gray">
							{header}
						</Typography>
						<Typography
							variant="small"
							className="text-gray-600 font-normal mt-1"
						>
							{subHeader}
						</Typography>
					</div>
					<div className="flex items-center w-full shrink-0 gap-4 md:w-max">
						<div className="w-full md:w-72">
							<Input
								size="lg"
								label="Search"
								icon={<MagnifyingGlassIcon className="h-5 w-5" />}
							/>
						</div>
					</div>
				</CardHeader>
				<CardBody className="overflow-scroll rounded-md !px-0 py-2">
					<table className="w-full min-w-max table-auto">
						<thead>
							<tr>
								{columns.map(({ header }) => (
									<th
										key={header}
										className="border-b border-gray-300 !p-4 pb-8"
									>
										<Typography
											color="blue-gray"
											variant="small"
											className="!font-bold"
										>
											{setHeader(header)}
										</Typography>
									</th>
								))}
								<th className="border-b border-gray-300 !p-4 pb-8 text-right">
									<Typography
										color="blue-gray"
										variant="small"
										className="!font-bold"
									>
										Actions
									</Typography>
								</th>
							</tr>
						</thead>
						<tbody>
							{data.map((row, index) => {
								const isLast = index === data.length - 1;
								const classes = isLast
									? "!p-4"
									: "!p-4 border-b border-gray-300";
								return (
									<tr key={row.id}>
										{columns.map(({ accessor }) => (
											<td
												key={accessor}
												className={classes}
											>
												<Typography
													variant="small"
													className="!font-normal text-gray-600 text-center"
												>
													{setItems(row, accessor)}
												</Typography>
											</td>
										))}
										<td className={classes}>
											<div className="flex justify-end">
												<Button
													variant="text"
													size="sm"
													onClick={() =>
														editEmployee(row)
													}>
													Edit Position
												</Button>
												<IconButton
													variant="text"
													size="sm"
													onClick={() =>
														onRowAction(row.id)
													}
												>
													<EyeIcon className="h-5 w-5 text-gray-900" />
												</IconButton>
											</div>
										</td>
									</tr>
								);
							})}
						</tbody>
					</table>
				</CardBody>
			</Card>
			<ModernEditPosition showAlert={showAlert} setAlert={setAlert} employee={employee} setPosition={setPosition}/>
		</section>
	);
}

export default CustomTable;
