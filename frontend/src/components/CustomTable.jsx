/* eslint-disable react/prop-types */
import {
	Typography,
	Card,
	CardHeader,
	CardBody,
	IconButton,
	Input, Avatar,
} from "@material-tailwind/react";
import { MagnifyingGlassIcon, EyeIcon } from "@heroicons/react/24/outline";
import {robotStatusBackColor} from "@constants/robotStatusBackColor.js";
import {robotStatusColor} from "@constants/robotStatusColor.js";
import RoleSelector from "@components/RoleSelector.jsx";

function CustomTableRobot({ header, subHeader, data, onRowAction }) {

	if(!data?.length)
	{
		return;
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

	function setItems(row, accessor) {
		if(accessor == 'role')
		{
			return <RoleSelector role={row[accessor]}/>
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
											{header}
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
		</section>
	);
}

export default CustomTableRobot;
