import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const AddCourse = () => {
  const navigate = useNavigate();
  const [titles, setTitles] = useState();
  const user = JSON.parse(localStorage.getItem("user"));
  const [rows, setRows] = useState([
    { title: "", nameList: "", tableRows: [""] },
  ]);

  const handleAddRow = () => {
    setRows([...rows, { title: "", nameList: "", tableRows: [""] }]);
  };

  const handleAddTableRow = (index) => {
    const values = [...rows];
    values[index].tableRows.push("");
    setRows(values);
  };

  const handleInputChange = (index, event) => {
    const values = [...rows];
    values[index][event.target.name] = event.target.value;
    setRows(values);
  };

  const handleTableRowChange = (rowIndex, tableRowIndex, event) => {
    const values = [...rows];
    values[rowIndex].tableRows[tableRowIndex] = event.target.value;
    setRows(values);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(rows);
  };

  useEffect(() => {
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
        console.log("error occured while fetching");
      }
    };

    fetchTitles();
  }, []);

  return (
    <>
      <Navbar />
      <h2 className="flex justify-center mt-5 mb-5 text-3xl">Add Course</h2>
      <div className="container mx-auto p-4 w-fit border-2 border-none shadow-sm shadow-gray-500 rounded-lg mt-5 font-primary">
        <form onSubmit={handleSubmit}>
          {rows.map((row, rowIndex) => (
            <div key={rowIndex} className="flex flex-col mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Title
              </label>
              <input
                type="text"
                name="title"
                placeholder="Enter the Title"
                value={row.title}
                onChange={(event) => handleInputChange(rowIndex, event)}
                className="border border-gray-300 p-2 mb-2 rounded"
              />
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Namelist
              </label>
              <select
                name="nameList"
                value={row.nameList}
                onChange={(event) => handleInputChange(rowIndex, event)}
                className="border border-gray-300 p-2 mb-2 rounded-lg"
              >
                <option value="" disabled>
                  Select name
                </option>
                {titles.map((title, index) => {
                  <option value={index}>{title.titles}</option>;
                })}
              </select>
              {row.tableRows.map((tableRow, tableRowIndex) => (
                <input
                  key={tableRowIndex}
                  type="text"
                  placeholder="Table Row Name"
                  value={tableRow}
                  onChange={(event) =>
                    handleTableRowChange(rowIndex, tableRowIndex, event)
                  }
                  className="border border-gray-300 p-2 mb-2 rounded-lg"
                />
              ))}
              <button
                type="button"
                onClick={() => handleAddTableRow(rowIndex)}
                className="bg-blue-600 text-sm p-2 w-fit  text-white border-2 border-none rounded-md mt-1 mb-4"
              >
                Add Table Row
              </button>
            </div>
          ))}
          {/* <div className="space-x-4 ">
            <button
              type="button"
              onClick={handleAddRow}
              className="bg-blue-600 text-xl p-2 w-44  text-white border-2 border-none rounded-md mt-1 mb-4"
            >
              Add Field
            </button>
            <button
              type="submit"
              className="bg-green-600 text-xl p-2 w-44 text-white border-2 border-none rounded-md mt-4"
              onClick={() => navigate("/course/add")}
            >
              Submit
            </button>
          </div> */}
        </form>
      </div>
    </>
  );
};

export default AddCourse;
