import React, { useState } from "react";

const AddCourseModal = ({
  isModalOpen,
  closeModal,
  handleSubmit,
  title,
  setTitle,
  namelist_id,
  setNamelistId,
  rows,
  handleTableRowChange,
  handleAddTableRow,
  titles,
}) => {
  if (!isModalOpen) return null;

  return (
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
  );
};

export default AddCourseModal;
