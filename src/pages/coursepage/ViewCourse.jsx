import React from "react";
import Navbar from "../../components/Navbar";

const additionalHeaders = ["Course", "Grade", "Grades"]; // Example headers, can be modified as needed
const students = [
  { studentName: "John Doe", rollNo: "001", course: "Math", grade: "A" },
  { studentName: "Jane Smith", rollNo: "002", course: "Science", grade: "B" },
  // Add more student objects as needed
];

export default function ViewCourse() {
  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-semibold text-gray-800 my-4">
          Hello ViewCourse
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="py-2 px-4 text-left font-medium ">
                  Student Name
                </th>
                <th className="py-2 px-4 text-left font-medium ">Roll No</th>
                {additionalHeaders.map((header) => (
                  <th key={header} className="py-2 px-4 text-left font-medium ">
                    {header}
                  </th>
                ))}
                <th className="py-2 px-4 text-left font-medium ">Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student, index) => (
                <tr key={index} className="border-b">
                  <td className="py-2 px-4">{student.studentName}</td>
                  <td className="py-2 px-4">{student.rollNo}</td>
                  {additionalHeaders.map((header) => (
                    <td key={header} className="py-2 px-4">
                      {student[header.toLowerCase()]}
                    </td>
                  ))}
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
      </div>
    </>
  );
}
