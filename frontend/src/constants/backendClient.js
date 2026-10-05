import axios from "axios";

const backEndClient = axios.create({
	baseURL: "http://localhost:8080/",
	timeout: 10000,
	headers: { "Content-Type": "application/json" },
});

export default backEndClient;
