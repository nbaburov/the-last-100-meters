/* eslint-disable react/prop-types */

export default function FloorList(props) {
	return (
		<ul>
			{props.floors.map((floor, idx) => (
				<div key={idx}>
					<button onClick={props.setloaded}>
						length: {floor.length}
					</button>
				</div>
			))}
		</ul>
	);
}
