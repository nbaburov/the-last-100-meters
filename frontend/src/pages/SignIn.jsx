import SignInComponent from "@components/SignInComponent";
import {useNavigate} from "react-router-dom";
import {useEmployee} from "@hooks/useEmployee.jsx";

const SignInPage = () => {
	const navigate = useNavigate();
	const checkLogin = (email, password) => {
		try {
			if(email === 'admin@example.com' && password === 'adminPassword')
			{
				navigate(`/admin`);
			}
			else if(email === 'alice@example.com')
			{
				navigate(`/employee/1`);
			}
			else if(email === 'bob@example.com')
			{
				navigate(`/employee/2`);
			}
			else if(email === 'charlie@example.com')
			{
				navigate(`/employee/3`);
			}
			else if(email === 'david@example.com')
			{
				navigate(`/employee/4`);
			}
			else if(email === 'eve@example.com')
			{
				navigate(`/employee/5`);
			}
			else
			{
				alert("Wrong Email or Password")
			}
		}
		catch (e) {
			alert("Wrong Email or Password")
			console.log(e.data)
		}
	}

	return <SignInComponent logIn={checkLogin}/>;
};

export default SignInPage;
