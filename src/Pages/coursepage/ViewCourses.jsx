import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import AddCourseModal from "./AddCourse.modal";

const ViewCourses = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [namelist_id, setNamelistId] = useState("");
  const [rows, setRows] = useState([""]);
  const [titles, setTitles] = useState([]);
  const [Co, setCo] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));

  const handleAddTableRow = () => {
    setRows([...rows, ""]);
  };

  const handleTableRowChange = (tableRowIndex, event) => {
    const values = [...rows];
    values[tableRowIndex] = event.target.value;
    setRows(values);
  };

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

  useEffect(() => {
    const fetchTitles = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API}/course/${user.userId}`
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

    fetchTitles();
  }, [user.userId]);

  useEffect(() => {
    const fetchcolists = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API}/course/${user.userId}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setCo(data);
      } catch (error) {
        console.error("Failed to fetch titles:", error);
      }
    };

    fetchcolists();
  }, []);

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
        {titles.map((title) => (
          <div
            key={title._id}
            className="border p-2 m-2 w-3/4 rounded bg-gray-100 cursor-pointer hover:bg-sky-500 font-bold hover:text-white"
            onClick={() => navigate(`/courses/${title._id}`)}
          >
            {title.title}
          </div>
        ))}
      </div>
    </>
  );
};

export default ViewCourses;
