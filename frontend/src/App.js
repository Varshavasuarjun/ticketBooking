
import {BrowserRouter, Route,  Routes} from "react-router-dom";



import './App.css';
import Signup from "./Components/Signup";

import Headder from "./Components/Headder";
import Login from "./Components/Login";
import Home from "./Components/Home";
import Userdashboard from "./Components/Userdashboard";
import Admindashboard from "./Components/Admindashboard";


function App() {
  return (
    <div >
    <BrowserRouter>
    <Routes>
      {/* <Route path='/Header' element={<Header/>}  /> */}
    
      <Route path="/header" element={<Headder/>}/>
      <Route path="/signup" element={<Signup/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/" exact element={<Home/>}/>
      <Route path="/userdashboard" element={<Userdashboard/>}/>
      <Route path="/admindashboard" element={<Admindashboard/>}/>
    </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
