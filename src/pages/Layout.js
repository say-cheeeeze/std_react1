import { BrowserRouter, Routes, Route } from "react-router-dom";
import Board from "./Board";
import Tutorial from "./Tutorial";
import NotFound from "./NotFound";

function Layout() {
	return (
		<>
			<hr/>
			<ul>
				<li>
					<a href="/">Home</a>
				</li>
				<li>
					<a href="/tutorial">tutorial</a>
				</li>
				<li>
					<a href="/board">Board</a>
				</li>
			</ul>
			<BrowserRouter>
				<hr/>
				<Routes>
					<Route path="/" element={ <Tutorial/> }>
						<Route index element={ <Tutorial/> }/>
						<Route path="tutorial" element={ <Tutorial/> }/>
						<Route path="board" element={ <Board/> }/>
						<Route path="*" element={ <NotFound/> }/>
					</Route>
				</Routes>
			</BrowserRouter>
		</>
	)
}

export default Layout;