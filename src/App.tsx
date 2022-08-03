import React from 'react';
import {Route, Routes} from "react-router-dom";

import Home from './pages/home/Home';
import Nav from "./components/nav/Nav";
import Favorites from "./pages/favorites/Favorites";


function App() {
    return (
        <>
            <Nav/>
            <Routes>
                <Route path={"/"} element={<Home/>}/>
                <Route path={"favorites"} element={<Favorites/>}/>
            </Routes>
        </>
    );
}

export default App;
