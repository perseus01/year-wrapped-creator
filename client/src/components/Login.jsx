import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export const Login = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const navigate = useNavigate();

	const handleLogin = async (e) => {
		const formData = new FormData();
		console.log("username: ", username);
		console.log("password: ", password);
		formData.append("username", username);
		formData.append("password", password);
		try {
			const { data } = await axios.post("/login", { username: username, password: password });
			if (data) {
				navigate("/");
			}
		} catch (e) {
			console.log(e);
			setError(e && e.response && e.response.data ? e.response.data.error : e.toString());
		}
	};

	if (error) {
		return <div>{error}</div>;
	}

	return (
		<div>
			<div className="flex border-b border-indigo-300 pt-2 pb-4">
				<div className="w-fit ml-4 mt-2 py-2 pl-3 pr-10">
					<button>
						<Link to="/" className="w-fit h-full px-4 py-2 mx-8 bg-indigo-900 rounded-lg">
							Home
						</Link>
					</button>
					<button>
						<Link to="/signup" className="w-fit h-full px-4 py-2 mx-8 bg-indigo-900 rounded-lg">
							Signup
						</Link>
					</button>
				</div>
			</div>
			<div className="flex justify-center items-center h-screen">
				<div className="login-form w-3/4 md:w-3/5 lg:w-2/5 xl:w-1/5 2xl:w-1/5 mx-auto p-4 border border-indigo-300 rounded-lg">
					<div className="font-medium text-4xl">Login</div>
					<div className="grid grid-cols-1 gap-4 mt-4">
						<label htmlFor="username" className="block text-sm font-medium leading-6 text-white">
							Username
						</label>
						<input
							type="text"
							className="block w-full rounded-md border-0 p-1.5 text-black"
							placeholder="Username"
							onChange={(e) => setUsername(e.target.value)}
						/>

						<label htmlFor="password" className="block text-sm font-medium leading-6 text-white">
							Password
						</label>
						<input
							type="password"
							className="block w-full rounded-md border-0 p-1.5 text-black"
							placeholder="Password"
							onChange={(e) => setPassword(e.target.value)}
						/>
						<button
							type="submit"
							className="w-fit px-4 py-2 bg-indigo-700 hover:bg-indigo-600 active:bg-indigo-700 rounded-lg"
							onClick={(e) => handleLogin(e)}
						>
							Login
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};
