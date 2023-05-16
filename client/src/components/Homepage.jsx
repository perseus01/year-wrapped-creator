import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { Midjourney } from "./Midjourney";
import { Reddit } from "./Reddit";
import { Stackoverflow } from "./Stackoverflow";
import { Github } from "./Github";
import axios from "axios";

export const Homepage = () => {
	const [wrap, setWrap] = useState("");
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	useEffect(() => {
		async function checkLoginStatus() {
			const { data } = await axios.get("/login/check-login", {
				headers: {
					"Content-Type": "application/json",
				},
			});
			console.log(data);
			setIsLoggedIn(data.loginStatus);
		}
		checkLoginStatus();
	}, []);

	const handleLogout = async () => {
		const { data } = await axios.get("/logout");
		if (data.successful) {
			setIsLoggedIn(false);
		}
	};

	return (
		<div className="py-20 text-white">
			<main>
				{isLoggedIn ? (
					<div>
						<button onClick={() => handleLogout()}>Logout</button>
						<button>
							<Link to="/my-collection">My Collection</Link>
						</button>
					</div>
				) : (
					<div>
						<button>
							<Link to="/login">Login</Link>
						</button>
						<button>
							<Link to="/signup">Signup</Link>
						</button>
					</div>
				)}
				<div className="flex flex-col justify-center items-center">
					<label className="text-xl">
						Select a wrap template
						<select name="wraps" id="wraps" className="p-2 mx-4 rounded=lg text-black hover:cursor-pointer" onChange={(e) => setWrap(e.target.value)}>
							<option value="">Select a wrap template</option>
							<option value="midjourney">Midjourney</option>
							<option value="reddit">Reddit</option>
							<option value="stackoverflow">Stackoverflow</option>
							<option value="github">Github</option>
						</select>
					</label>
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
						""
					)}
				</div>
			</main>
		</div>
	);
};
