import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import { useParams } from "react-router-dom";

const AddCoMarksModal = () => {
  const [students, setStudents] = useState([]);
  const [Co, setCo] = useState(null);
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const { title } = useParams();
  const [subjects, setSubjects] = useState([{ subject: "" }]);

  const handleAddSubject = () => {
    setSubjects([...subjects, { subject: "" }]);
  };

  const handleInputChange = (index, event) => {
    const values = [...subjects];
    values[index][event.target.name] = event.target.value;
    setSubjects(values);
  };

  useEffect(() => {
    const fetchcolists = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API}/course/colist/${title}/${user.userId}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setCo(data);
        console.log(data);
      } catch (error) {
        console.error("Failed to fetch titles:", error);
      }
    };

    if (user.userId) {
      fetchcolists();
    }
  }, [title, user.userId]);

  return (
    <>
      <Navbar />
      {/* Table to add a course marks */}
      <div className="flex justify-center flex-col p-4">
        <h2 className="font-bold text-2xl text-blue-600 mb-6">{title}</h2>
        <table className="min-w-full bg-white">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="w-12 py-2">Name</th>
              <th className="w-12 py-2">RollNo</th>
              {Co.map((rows) => (
                <th className="w-12 py-2">{}</th>
              ))}
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

export default AddCoMarksModal;
