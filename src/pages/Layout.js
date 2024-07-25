import { BrowserRouter, Routes, Route } from "react-router-dom";
import Board from "./Board";
import Tutorial from "./Tutorial";
import NotFound from "./NotFound";

function Layout() {
	return (
		<>
			<hr/>
			{/*<Link to="/">Home</Link>*/}
			{/*<Link to="/tutorial">Home</Link>*/}
			{/*<Link to="/board">Board</Link>*/}
			<BrowserRouter>
				<hr/>
				<Routes>
					<Route path="/" element={ <Tutorial/> }>
						<Route path="board" element={ <Board/> }/>
					</Route>
					<Route path="*" element={ <NotFound/> }/>
				</Routes>
			</BrowserRouter>
		</>
	)
}

export default Layout;