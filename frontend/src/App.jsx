import { BrowserRouter,Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Body from "./components/Body";
import Signup from "./components/Signup";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Body/>} />
				<Route path="/login" element={<Login/>} />
				<Route path="/signup" element={<Signup/>} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
