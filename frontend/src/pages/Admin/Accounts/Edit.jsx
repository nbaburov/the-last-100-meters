import { useParams } from "react-router-dom";

const EditAccount = () => {
	const { id } = useParams();
	return <h1>Edit Account Page for ID: {id}</h1>;
};

export default EditAccount;