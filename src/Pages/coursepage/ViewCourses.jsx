import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";

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
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
            <button
              onClick={closeModal}
              className="bg-red-600 text-sm p-2 w-fit text-white border-2 border-none rounded-md mb-4"
            >
              Close
            </button>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  placeholder="Enter the Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="border border-gray-300 p-2 mb-2 rounded"
                />
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Namelist
                </label>
                <select
                  name="nameList"
                  value={namelist_id}
                  onChange={(e) => setNamelistId(e.target.value)}
                  className="border border-gray-300 p-2 mb-2 rounded-lg"
                >
                  <option value="" disabled>
                    Select name
                  </option>
                  {titles.map((title, index) => (
                    <option key={index} value={title._id}>
                      {title.title}
                    </option>
                  ))}
                </select>

                {rows.map((tableRow, tableRowIndex) => (
                  <input
                    key={tableRowIndex}
                    type="text"
                    placeholder="Table Row Name"
                    value={tableRow}
                    onChange={(e) => handleTableRowChange(tableRowIndex, e)}
                    className="border border-gray-300 p-2 mb-2 rounded-lg"
                  />
                ))}
                <button
                  type="button"
                  onClick={handleAddTableRow}
                  className="bg-blue-600 text-sm p-2 w-fit text-white border-2 border-none rounded-md mt-1 mb-4"
                >
                  Add Table Row
                </button>
              </div>

              <div className="space-x-4">
                <button
                  type="submit"
                  className="bg-green-600 text-xl p-2 w-44 text-white border-2 border-none rounded-md mt-4"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <div className="grid grid-cols-4 gap-4 items-center mt-4 p-6">
        {titles.map((title) => (
          <div
            key={title._id}
            className="border p-2 m-2 w-3/4 rounded bg-gray-100 cursor-pointer hover:bg-sky-500 font-bold hover:text-white"
            onClick={() => navigate(`/course/${title._id}`)}
          >
            {title.title}
          </div>
        ))}
      </div>
    </>
  );
};

export default ViewCourses;
