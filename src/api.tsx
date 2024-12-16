import axios from "axios";

const apiURL = import.meta.env.VITE_REACT_API_URL;
// const apiURL = "http://localhost:3000/"

export const api = axios.create({
	baseURL: apiURL,
	headers: {
		"Content-Type": "application/json",
	},
});
