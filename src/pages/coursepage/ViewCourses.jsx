import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import AddCourseModal from "./AddCourse.modal";

const ViewCourses = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const [title, setTitle] = useState("");
  const [namelist_id, setNamelistId] = useState("");
  const [rows, setRows] = useState([""]);
  const [titles, setTitles] = useState([]);
  const [courses, setCourses] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddTableRow = () => {
    setRows([...rows, ""]);
  };

  const handleTableRowChange = (tableRowIndex, event) => {
    const values = [...rows];
    values[tableRowIndex] = event.target.value;
    setRows(values);
  };

  const fetchTitles = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API}/student/namelists/${user.userId}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setTitles(data);
    } catch (error) {
      console.error("Failed to fetch titles:", error);
    }
  };

  const fetchCourses = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API}/course/${user.userId}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setCourses(data);
    } catch (error) {
      console.error("Failed to fetch courses:", error);
    }
  };

  useEffect(() => {
    fetchTitles();
    fetchCourses();
  }, [user.userId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API}/course/create/${user.userId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title,
            namelist_id,
            rows,
          }),
        }
      );
      if (response.ok) {
        setIsModalOpen(false);
        fetchCourses(); // Refresh courses after successful submission
      } else {
        console.error("Failed to submit the course.");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Navbar />
      <div className="flex justify-end p-2 font-primary">
        <button
          onClick={openModal}
          className="bg-green-600 text-2xl p-2 w-fit text-white border-2 border-none rounded-md mt-4"
        >
          Add Course
        </button>
      </div>
      <AddCourseModal
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        handleSubmit={handleSubmit}
        title={title}
        setTitle={setTitle}
        namelist_id={namelist_id}
        setNamelistId={setNamelistId}
        rows={rows}
        handleTableRowChange={handleTableRowChange}
        handleAddTableRow={handleAddTableRow}
        titles={titles}
      />
      <div className="grid grid-cols-4 gap-4 items-center mt-4 p-6">
        {courses.map((course) => (
          <div
            key={course._id}
            className="border p-2 m-2 w-3/4 rounded bg-gray-100 cursor-pointer hover:bg-sky-500 font-bold hover:text-white"
            onClick={() => navigate(`/courses/${course._id}`)}
          >
            {course.title}
          </div>
        ))}
      </div>
    </>
  );
};

export default ViewCourses;
