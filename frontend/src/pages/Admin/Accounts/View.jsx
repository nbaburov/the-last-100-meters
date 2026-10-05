import { useParams } from "react-router-dom";

const ViewAccount = () => {
	const { id } = useParams();
	return <h1>View Account Page for ID: {id}</h1>;
};

export default ViewAccount;
