import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter, Route, Routes } from "react-router-dom";
import AddNamelist from "./Pages/AddNamelist";
import AddCourse from "./Pages/Course";
import Namelist from "./Pages/Namelist";
// import AddMarks from "./Pages/AddMarks";
import AddCourses from "./Pages/AddCourses";
import Login from "./Pages/Login";
import PtLists from "./Pages/PtList";
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   <HashRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/namelist" element={<Namelist />} />
          <Route path="/namelist/:title" element={<AddNamelist />} />
          <Route path="/course" element={<AddCourse />} />
          <Route path="/course/:title" element={<AddCourses />} />
          {/* <Route path="/addmarks" element={<AddMarks />} /> */}
          <Route path="/pt" element={<PtLists />} />
        </Routes>
      </HashRouter>
  </React.StrictMode>,
)
