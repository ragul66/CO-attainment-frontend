import React, { useState } from "react";

export default function Modal({ isOpen, onClose }) {
  const [rows, setRows] = useState([
    {
      title: "",
      maxMark: "",
      questions: [{ questionNumber: "", option: "understand" }],
    },
  ]);

  const handleAddRow = () => {
    setRows([
      ...rows,
      {
        title: "",
        maxMark: "",
        questions: [{ questionNumber: "", option: "understand" }],
      },
    ]);
  };

  const handleAddQuestion = (rowIndex) => {
    const newRows = rows.map((row, i) =>
      i === rowIndex
        ? {
            ...row,
            questions: [
              ...row.questions,
              { questionNumber: "", option: "understand" },
            ],
          }
        : row
    );
    setRows(newRows);
  };

  const handleRowChange = (index, field, value) => {
    const newRows = rows.map((row, i) =>
      i === index ? { ...row, [field]: value } : row
    );
    setRows(newRows);
  };

  const handleQuestionChange = (rowIndex, questionIndex, field, value) => {
    const newRows = rows.map((row, i) =>
      i === rowIndex
        ? {
            ...row,
            questions: row.questions.map((question, j) =>
              j === questionIndex ? { ...question, [field]: value } : question
            ),
          }
        : row
    );
    setRows(newRows);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center overflow-y-auto">
      <div className="bg-white p-4 rounded-md w-1/2">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl">Add PtList</h2>
          <button className="text-red-600" onClick={onClose}>
            X
          </button>
        </div>
        <form>
          {rows.map((row, rowIndex) => (
            <div key={rowIndex} className="mb-4">
              {rowIndex === 0 && (
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    TitleName
                  </label>
                  <input
                    type="text"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
              )}
              <div className="flex space-x-2 mb-2">
                <input
                  type="text"
                  placeholder="Title"
                  className="mt-1 block p-2 border border-gray-300 rounded-md w-1/2"
                  value={row.title}
                  onChange={(e) =>
                    handleRowChange(rowIndex, "title", e.target.value)
                  }
                />
                <input
                  type="number"
                  placeholder="Max Mark"
                  className="mt-1 block p-2 border border-gray-300 rounded-md w-1/2"
                  value={row.maxMark}
                  onChange={(e) =>
                    handleRowChange(rowIndex, "maxMark", e.target.value)
                  }
                />
              </div>
              <button
                type="button"
                className="bg-blue-600 text-white p-2 rounded-md mb-2"
                onClick={() => handleAddQuestion(rowIndex)}
              >
                Add Col
              </button>
              {row.questions.map((question, questionIndex) => (
                <div key={questionIndex} className="flex space-x-2 mb-2">
                  <input
                    type="number"
                    placeholder="Question Number"
                    className="mt-1 block p-2 border border-gray-300 rounded-md w-1/4"
                    value={question.questionNumber}
                    onChange={(e) =>
                      handleQuestionChange(
                        rowIndex,
                        questionIndex,
                        "questionNumber",
                        e.target.value
                      )
                    }
                  />
                  <select
                    className="mt-1 block p-2 border border-gray-300 rounded-md w-1/4"
                    value={question.option}
                    onChange={(e) =>
                      handleQuestionChange(
                        rowIndex,
                        questionIndex,
                        "option",
                        e.target.value
                      )
                    }
                  >
                    <option value="understand">Understand</option>
                    <option value="apply">Apply</option>
                    <option value="analyse">Analyse</option>
                    <option value="assignment">Assignment</option>
                  </select>
                </div>
              ))}
            </div>
          ))}
          <button
            type="button"
            className="bg-green-600 text-white p-2 rounded-md mb-2"
            onClick={handleAddRow}
          >
            Add Row
          </button>
          <button
            type="submit"
            className="bg-red-600 text-white p-2 rounded-md ml-4"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
