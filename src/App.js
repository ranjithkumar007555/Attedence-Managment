import { BrowserRouter, Routes, Route } from "react-router-dom";
import Loginpage from "./components/Loginpage";
import Dashboard from "./components/Dashboard";
import Addstudent from "./components/Addstudent";
import Attedence from "./components/Attedence";
import Studentregister from "./components/Studentregister";

//Screens


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={< Loginpage/>} />
        <Route path="/dashboard" element={< Dashboard/>} />
        <Route path="/addstudent" element={< Addstudent/>} />
        <Route path="/attedence" element={< Attedence/>} />
        <Route path="/studentregister" element={< Studentregister/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
