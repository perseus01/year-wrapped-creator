// import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Homepage } from "./components/Homepage";
import { Login } from "./components/Login";
import { Signup } from "./components/Signup";
import { NotFound } from "./components/NotFound";
function App() {
	return (
		<div className="App min-h-screen bg-slate-950 text-white">
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Homepage />} />
				</Routes>
				<Routes>
					<Route path="/login" element={<Login />} />
				</Routes>
				<Routes>
					<Route path="/signup" element={<Signup />} />
				</Routes>
				{/* <Routes>
					<Route path="*" element={<NotFound />} />
				</Routes> */}
			</BrowserRouter>
		</div>
	);
}

export default App;
