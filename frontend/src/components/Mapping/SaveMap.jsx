/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from "react";

export default function SaveMap(props) {
	const [map, setMap] = useState([[[]]]);

	const handleSubmit = (e) => {
		// required to prevent standard behaviour of submitting
		e.preventDefault();

		props.save(map);
	};

	return (
		<div className="p-6 max-w-lg mx-auto bg-white rounded-xl shadow-lg flex items-center space-x-4">
			<form className="form-container" onSubmit={handleSubmit}>
				<button className="input-submit">Save</button>
			</form>
		</div>
	);
}
