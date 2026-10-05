import { useParams } from "react-router-dom";

const EditFloor = () => {
	const { id } = useParams();
	return <h1>Edit Floor Page for ID: {id}</h1>;
};


export default EditFloor;
