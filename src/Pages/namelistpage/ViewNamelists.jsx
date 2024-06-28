import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import AddStudentModal from "./AddStudent.modal";

const ViewNamelists = () => {
  const [showModal, setShowModal] = useState(false);
  const [titles, setTitles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const baseUrl = import.meta.env.VITE_API;

  useEffect(() => {
    const fetchTitles = async () => {
      try {
        const response = await fetch(
          `${baseUrl}/student/namelists/${user.userId}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setTitles(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTitles();
  }, []);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    // fetchTitles(); // Fetch titles again after closing the modal to get the updated list
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <Navbar />
      <div className="flex justify-center p-2 font-primary">
        <button
          className="bg-green-600 text-2xl p-2 w-3/12 text-white border-2 border-none rounded-md mt-4"
          onClick={handleOpenModal}
        >
          Add Title
        </button>
      </div>
      <AddStudentModal showModal={showModal} handleClose={handleCloseModal} />
      <div className="grid grid-cols-4 gap-4 items-center mt-4 p-6">
        {titles.map((title) => (
          <div
            key={title._id}
            className="border p-2 m-2 w-3/4 rounded bg-gray-100 cursor-pointer hover:bg-sky-500 font-bold hover:text-white"
            onClick={() =>
              navigate(`/namelists/${title._id}`, { state: { title } })
            }
          >
            {title.title}
          </div>
        ))}
      </div>
    </>
  );
};

export default ViewNamelists;
