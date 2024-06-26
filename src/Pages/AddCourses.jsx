import React from "react";
import Navbar from "../components/Navbar";

const AddCourses = () => {
  return (
    <>
      <Navbar />
      <div className="flex justify-end p-3">
        <button className="border-2 border-none bg-green-600 text-xl p-2 rounded-md text-white">
          Add Student
        </button>
      </div>
    </>
  );
};

export default AddCourses;
