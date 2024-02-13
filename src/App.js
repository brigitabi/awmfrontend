import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import Statistics from "./pages/Statistics";
import CreateYourStatement from "./pages/CreateYourStatement";



function App() {
  return (
    <div>
      <Navbar />
    
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/statistics" element={<Statistics />} />
        <Route path="/create-your-statement" element={<CreateYourStatement />} />
      </Routes>
    </div>
  );
}

export default App;
