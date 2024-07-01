import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter, Route, Routes } from "react-router-dom";
import Modal from "react-modal";
import "./index.css";
import ViewCourse from "./Pages/coursepage/ViewCourse";
import ViewCourses from "./Pages/coursepage/ViewCourses";
import Login from "./Pages/loginpage/Login";
import ViewNamelist from "./Pages/namelistpage/ViewNamelist";
import ViewNamelists from "./Pages/namelistpage/ViewNamelists";
import ViewPtList from "./Pages/ptpage/ViewPtList";
import ViewPtLists from "./Pages/ptpage/ViewPtLists";
import SelectCoatt from "./Pages/co-attainment/SelectCoatt";

// Set the app element for react-modal
Modal.setAppElement("#root");

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/namelists" element={<ViewNamelists />} />
        <Route path="/namelists/:namelistid" element={<ViewNamelist />} />
        <Route path="/courses" element={<ViewCourses />} />
        <Route path="/courses/:courseid" element={<ViewCourse />} />
        <Route path="/ptlists" element={<ViewPtLists />} />
        <Route path="/ptlists/:ptlistid" element={<ViewPtList />} />
        <Route path="coattainment" element={<SelectCoatt />} />
      </Routes>
    </HashRouter>
  </React.StrictMode>
);
