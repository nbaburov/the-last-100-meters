/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import CardCustom from "@components/Card";
import { useNavigate } from "react-router-dom";
import styles from "@pages/Admin/css/AdminHomePage.module.css";
import React from "react";

const RobotInformation = ({ robotData, robotActions }) => {
	const navigate = useNavigate();

	let actions = [...robotActions]

	if(robotData == null)
	{
		return;
	}

	return (
		<div className="flex flex-col gap-4 items-center p-8">
			<div
				className="flex flex-row gap-6 justify-stretch items-center shadow-lg rounded-lg p-4 bg-blue-gray-50 w-full">
				<div className="w-full flex flex-col gap-4">
					<CardCustom
						smallHeader="Information about"
						header="Robot"
						body={
							<div className="space-y-4" style={{height:"400px"}}>
								<div>
									<h3 className="font-semibold">ID</h3>
									<p>{robotData.robotId}</p>
								</div>
								<div>
									<h3 className="font-semibold">
										ETA to Location
									</h3>
									<p>{robotData.eta}</p>
								</div>
								<div>
									<h3 className="font-semibold">Status</h3>
									<p>{robotData.status}</p>
								</div>
							</div>
						}
					/>
				</div>
				<section className={styles.events}>
					<h2>Important Events</h2>
					<div className={styles.eventsList}>
						{actions.reverse().map(((action, idx) => (
							<div key={idx} className={styles.eventItem}>
								<div className={styles.eventTitle}>{action.action}</div>
								<div className={styles.eventDate}>{action.time}</div>
							</div>
						)))}
					</div>
				</section>
			</div>
		</div>
	);
};

export default RobotInformation;
