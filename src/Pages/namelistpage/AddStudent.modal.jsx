import React, { useState } from "react";

const AddStudentModal = ({ showModal, handleClose }) => {
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));

  const baseUrl = import.meta.env.VITE_API;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${baseUrl}/student/addlist/${user.userId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title }),
        }
      );

      if (response.ok) {
        setTitle("");
        handleClose();
      } else {
        const data = await response.json();
        setError(data.message || "An error occurred.");
      }
    } catch (error) {
      setError("An error occurred while submitting the form.");
    }
  };

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 font-primary">
      <div className="bg-white p-6 rounded-md relative">
        <button
          className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full"
          onClick={handleClose}
        >
          X
        </button>
        <h2 className="text-xl font-bold mb-4">Add Title</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border border-gray-300 p-2 rounded w-full mb-4"
          />
          <button type="submit" className="bg-blue-600 text-white p-2 rounded">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddStudentModal;
