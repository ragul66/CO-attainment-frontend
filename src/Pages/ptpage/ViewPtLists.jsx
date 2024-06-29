import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import AddPtModal from "./AddPt.modal";

export default function ViewPtLists() {
  const [isModalOpen, setIsModalOpen] = useState(false);

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
        console.log("Error occured while fetching");
      }
    };

    fetchTitles();
  }, []);

  return (
    <>
      <Navbar />
      <div className="flex justify-end p-2 font-primary">
        <button
          className="bg-green-600 text-xl p-2 w-48 text-white border-2 border-none rounded-md mt-4"
          onClick={() => setIsModalOpen(true)}
        >
          Add PtList
        </button>
      </div>
      <AddPtModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
