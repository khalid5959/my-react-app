import { useEffect, useState, createContext, useContext } from "react";
import { BrowserRouter, Routes, Route, Link, NavLink, useParams, Outlet } from "react-router-dom";
import { UserName } from "../Routing";

export default function Home() {
  const { name, setName } = useContext(UserName);
  return (
    <div>
      <div className="routing_header">
        <h1>Welcome to our Car Dealership</h1>
        <p>we sell brand new cars from known manufacturers such as Honda, Toyota, Fiat.</p>
        <div className=" flex flex-col items-center gap-2 mt-6">
          <p>Subscribe to receive update of our inventory</p>
          <input
            type="text"
            placeholder="enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-white/20 w-[60%] rounded-2xl px-3 py-2" />
        </div>
      </div>
    </div>
  )
}