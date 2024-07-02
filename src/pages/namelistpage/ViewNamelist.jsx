import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../components/Navbar";
import AddStudentModal from "./AddStudent.modal";

const ViewNamelist = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const { namelistid } = useParams();

  const [studentName, setStudentName] = useState("");
  const [rollNo, setRollNo] = useState("");
  const [namelist, setNamelist] = useState({ title: "", students: [] });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${baseUrl}/student/addstudent/${user.userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            namelistId: namelistid,
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
        setError(""); // Clear any previous error
      } else {
        const errorData = await response.json();
        setError(
          errorData.message || "An error occurred while submitting the namelist"
        );
      }
    } catch (error) {
      setError("An error occurred while submitting the namelist");
    }
  };

  const fetchStudent = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API}/student/students/${namelistid}/${
          user.userId
        }`
      );
      const data = await response.json();
      if (response.ok) {
        setNamelist(data);
      } else {
        console.error("Error fetching namelist", data.message);
      }
    } catch (error) {
      console.error("Error fetching namelist", error);
    }
  };

  useEffect(() => {
    fetchStudent();
  }, [namelistid]);

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
      <AddStudentModal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        studentName={studentName}
        setStudentName={setStudentName}
        rollNo={rollNo}
        setRollNo={setRollNo}
        handleSubmit={handleSubmit}
        error={error}
        title={namelist.title}
      />
      <div className="flex justify-center flex-col p-4">
        <h2 className="font-bold text-2xl text-blue-600 mb-6">
          {namelist.title}
        </h2>
        <table className="min-w-full bg-white">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="w-auto py-2">Student Name</th>
              <th className="w-auto py-2">Roll No</th>
              <th className="w-40 py-2  text-left text-white font-medium">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {namelist.students.map((student, index) => (
              <tr key={index} className="bg-gray-100">
                <td className="border px-4 py-2">{student.name}</td>
                <td className="border px-4 py-2">{student.rollno}</td>
                <td className="py-2 px-4">
                  <button className="bg-blue-500 text-white py-1 px-2 rounded mr-2 hover:bg-blue-700">
                    Edit
                  </button>
                  <button className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-700">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ViewNamelist;
