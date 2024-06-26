import React, { useEffect, useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Modal from "react-modal";

const AddNamelist = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("user"));
  const title = location.state?.title || {};
  const id = useParams();
  console.log(title);
  const baseUrl = import.meta.env.VITE_API;

  const [studentName, setStudentName] = useState("");
  const [rollNo, setRollNo] = useState("");
  const [students, setStudents] = useState([]);
  const [titles, settitles] = useState(id);
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
  const [error, setError] = useState(""); // Error state

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${baseUrl}/student/addstudent/${user.userId}`,
        {
          method: "PUT", // Use PUT since the route is defined as PUT
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            namelistId: title._id,
            rollno: rollNo,
            name: studentName,
          }),
        }
      );
      if (response.ok) {
        setStudentName("");
        setRollNo("");
        fetchStudent(); // Refresh the student list
        setIsModalOpen(false); // Close modal on success
      } else {
        setError("An error occurred while submitting the namelist");
      }
    } catch (error) {
      setError("An error occurred while submitting the namelist");
    }
  };

  const fetchStudent = async () => {
    try {
      const response = await fetch(
        `${baseUrl}/student/students/${title._id}/${user.userId}`
      );
      const data = await response.json();
      if (response.ok) {
        setStudents(data); // Assuming the API returns students array in the `students` property
      } else {
        console.error("Error fetching namelist", data.message);
      }
    } catch (error) {
      console.error("Error fetching namelist", error);
    }
  };

  useEffect(() => {
    fetchStudent();
  }, []);

  return (
    <>
      <Navbar />
      <div className="flex justify-end p-2 font-primary">
        <button
          className="bg-green-600 text-xl p-2 w-48 text-white border-2 border-none rounded-md mt-4"
          onClick={() => setIsModalOpen(true)}
        >
          Add StudentName
        </button>
      </div>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Add Student"
        className="fixed inset-0 flex items-center justify-center z-50 p-4 bg-opacity-75 bg-gray-800"
        overlayClassName="fixed inset-0 bg-gray-800 bg-opacity-75"
      >
        <div className="bg-white p-6 rounded-lg shadow-lg relative w-full max-w-md mx-auto">
          <button
            onClick={() => setIsModalOpen(false)}
            className="absolute top-2 right-2 text-gray-700"
          >
            &times;
          </button>
          <form className="flex flex-col items-center" onSubmit={handleSubmit}>
            <p>{title.title}</p>

            <div className="mb-4 w-full">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Student Name:
              </label>
              <input
                type="text"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter student name"
              />
            </div>
            <div className="mb-4 w-full">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Roll No:
              </label>
              <input
                type="text"
                value={rollNo}
                onChange={(e) => setRollNo(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter roll number"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Submit
            </button>
            {error && <p className="text-red-500 text-xs italic">{error}</p>}
          </form>
        </div>
      </Modal>
      <div className="flex justify-center flex-col p-4">
        <h2 className="font-bold text-2xl text-blue-600 mb-6">{title.title}</h2>
        <table className="min-w-full bg-white">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="w-1/2 py-2">Student Name</th>
              <th className="w-1/2 py-2">Roll No</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => (
              <tr key={index} className="bg-gray-100">
                <td className="border px-4 py-2">{student.name}</td>
                <td className="border px-4 py-2">{student.rollno}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AddNamelist;
