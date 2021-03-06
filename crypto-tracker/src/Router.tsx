import {BrowserRouter, Routes, Route} from "react-router-dom";
import Coins from "./routes/Coins";
import Coin from "./routes/Coin";
import Chart from "./routes/Chart";
import Price from "./routes/Price";
import NotFound from "./routes/NotFound";

function Router() {
    return (
        <BrowserRouter basename={process.env.PUBLIC_URL}>
            <Routes>
                <Route path={`/`} element={<Coins />}/>
                <Route path={`/:coinId`} element={<Coin />}>
                    <Route path={`price`} element={<Price />} />
                    <Route path={`chart`} element={<Chart />} />
                </Route>
                <Route path={"*"} element={<NotFound />}/>
            </Routes>
        </BrowserRouter>
    )
}

export default Router;