import {BrowserRouter, Routes, Route} from "react-router-dom";
import ToDoList from "./components/ToDoList";

function Router() {
    return (
        <BrowserRouter basename={process.env.PUBLIC_URL}>
            <Routes>
                <Route path={`/`} element={<ToDoList />}/>
            </Routes>
        </BrowserRouter>
    )
}

export default Router;