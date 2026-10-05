import { useParams } from "react-router-dom";

const ViewFloor = () => {
	const { id } = useParams();
	return <h1>View Floor Page for ID: {id}</h1>;
};

export default ViewFloor;
