import React, { useEffect, useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import Navbar from "../../components/Navbar";
import AddStudentModal from "./AddStudent.modal";

const ViewNamelist = () => {
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
      <AddStudentModal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        studentName={studentName}
        setStudentName={setStudentName}
        rollNo={rollNo}
        setRollNo={setRollNo}
        handleSubmit={handleSubmit}
        error={error}
        title={title.title}
      />
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

export default ViewNamelist;
