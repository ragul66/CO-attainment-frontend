import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/nothinglogo.jpg";

const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    const checkLogin = () => {
      if (!user) {
        navigate("/");
      }
    };
    checkLogin();
  }, [navigate, user]);

  const onexit = () => {
    localStorage.clear();
    navigate("/");
  };
  return (
    <>
      <div className=" h-24 bg-sky-600 p-1 items-center flex flex-row w-screen  gap-6">
        <img
          className=" ml-12 cursor-pointer size-12 rounded-full"
          src={logo}
          alt="SITLOGO"
        />
        <div className="flex flex-row gap-6 justify-center items-center font-bold text-white cursor-pointer">
          <h2 onClick={() => navigate(`/namelist`)}>Namelist</h2>
          <h2 onClick={() => navigate("/course")}>Course</h2>
          <h2 onClick={() => navigate("/pt")}>ptLists</h2>
          <h2 onClick={() => navigate("/addmarks")}>Co-Attainment</h2>
        </div>
        <button
          className="ml-auto border-2 border-none bg-green-600 text-xl text-white p-2 rounded-md "
          onClick={() => onexit()}
        >
          Logout
        </button>
      </div>
    </>
  );
};

export default Navbar;
