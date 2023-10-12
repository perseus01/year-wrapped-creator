import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { Midjourney } from "./Midjourney";
import { Reddit } from "./Reddit";
import { Stackoverflow } from "./Stackoverflow";
import { Github } from "./Github";
import axios from "axios";

export const Homepage = () => {
	const [wrap, setWrap] = useState("midjourney");
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	// const [loading, setLoading] = useState(false);

	useEffect(() => {
		async function checkLoginStatus() {
			// setLoading(true);
			const { data } = await axios.get("/login/check-login");
			console.log(data);
			setIsLoggedIn(data.loginStatus);
			// setLoading(false);
		}
		checkLoginStatus();
	}, []);

	const handleLogout = async () => {
		// setLoading(true);
		const { data } = await axios.get("/logout");
		if (data.successful) {
			setIsLoggedIn(false);
			window.location.reload(false);
		}
		// setLoading(false);
	};

	// if (loading) {
	// 	return <Loading />;
	// }

	return (
		<div className="text-white">
			<main>
				<div className="flex border-b border-indigo-300 pt-2 pb-4">
					<div className="flex flex-col justify-center items-center">
						<label htmlFor="wrap" className="ml-4">
							Select a Template:
							<select
								className="appearance-none w-fit ml-4 mt-2 py-2 pl-3 pr-10 text-base text-black leading-6 bg-white border border-gray-300 rounded-md focus:outline-none hover:cursor-pointer"
								onChange={(e) => setWrap(e.target.value)}
							>
								<option value="midjourney">Midjourney</option>
								<option value="reddit">Reddit</option>
								<option value="stackoverflow">Stackoverflow</option>
								<option value="github">Github</option>
							</select>
						</label>
					</div>
					{isLoggedIn ? (
						<div className="w-fit ml-4 mt-2 py-2 pl-3 pr-10">
							<button onClick={() => handleLogout()} color="indigo" className="w-fit h-full px-4 py-2 mx-8 bg-indigo-900 rounded-lg">
								Logout
							</button>
							<Link to="/my-collection" className="w-fit h-full px-4 py-2 mx-8 bg-indigo-900 rounded-lg">
								<button color="indigo">My Collection</button>
							</Link>
						</div>
					) : (
						<div className="w-fit ml-4 mt-2 py-2 pl-3 pr-10">
							<Link to="/login" className="mx-2">
								<button color="indigo">Login</button>
							</Link>
							<Link to="/signup" className="mx-2">
								<button color="indigo">Signup</button>
							</Link>
						</div>
					)}
				</div>

				<div className="py-12">
					{wrap === "midjourney" ? (
						<Midjourney />
					) : wrap === "reddit" ? (
						<Reddit />
					) : wrap === "stackoverflow" ? (
						<Stackoverflow />
					) : wrap === "github" ? (
						<Github />
					) : (
						<div>
							<div>No template selected</div>
						</div>
					)}
				</div>
			</main>
		</div>
	);
};
