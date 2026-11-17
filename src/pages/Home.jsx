import { useEffect, useState, createContext, useContext } from "react";
import { BrowserRouter, Routes, Route, Link, NavLink, useParams, Outlet } from "react-router-dom";
import { UserName } from "../Routing";

export default function Home() {
  const { name, setName } = useContext(UserName);
  return (
      <div className="routing_header h-auto min-h-90 px-4 py-3 flex flex-col items-center text-center">
        <h1 className="text-3xl md:text-5xl font-bold  md:leading-snug max-w-2xl">Welcome to our Car Dealership</h1>
        <p>we sell brand new cars from known manufacturers such as Honda, Toyota, Fiat.</p>
        <div className=" flex flex-col w-full items-center gap-2 mt-6">
          <p>Subscribe to receive update of our inventory</p>
          <input
            type="text"
            placeholder="enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-white/20 w-[50%] min-w-107 rounded-2xl px-3 py-2" />
        </div>
      </div>
  )
}