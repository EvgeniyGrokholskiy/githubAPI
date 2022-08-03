import React from 'react';
import {NavLink} from "react-router-dom";

const Nav = () => (
    <nav className="flex justify-between items-center h-[50px] px-5 shadow-md bg-gray-500 text-white">
        <h3 className="font-bold">Github search</h3>
        <span>
            <NavLink to={"/"} className="mr-2">Home</NavLink>
            <NavLink to={"/favorites"}>Favorite</NavLink>
        </span>
    </nav>
);

export default Nav;