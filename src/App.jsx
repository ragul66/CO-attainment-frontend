import { BrowserRouter, Route, Routes } from "react-router-dom";
import Namelist from "./Pages/Namelist";
import AddNamelist from "./Pages/AddNamelist";
import AddCourse from "./Pages/Course";
// import AddMarks from "./Pages/AddMarks";
import PtLists from "./Pages/PtList";
import AddCourses from "./Pages/AddCourses";
import Login from "./Pages/Login";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/namelist" element={<Namelist />} />
          <Route path="/namelist/:title" element={<AddNamelist />} />
          <Route path="/course" element={<AddCourse />} />
          <Route path="/course/:title" element={<AddCourses />} />
          {/* <Route path="/addmarks" element={<AddMarks />} /> */}
          <Route path="/pt" element={<PtLists />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
