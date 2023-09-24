
import {BrowserRouter, Route,  Routes} from "react-router-dom";



import './App.css';
import Signup from "./Components/Signup";

import Headder from "./Components/Headder";
import Login from "./Components/Login";
import Home from "./Components/Home";
import Userdashboard from "./Components/Userdashboard";
import Admindashboard from "./Components/Admindashboard";
import Userheader from "./Components/Userheader";
import Movie from "./Components/Movie";
import Bookedtickets from "./Components/Bookedtickets";


function App() {
  return (
    <div >
    <BrowserRouter>
    <Routes>
      {/* <Route path='/Header' element={<Header/>}  /> */}
    
      <Route path="/header" element={<Headder/>}/>
      <Route path="/userheader" element={<Userheader/>}/>
      <Route path="/signup" element={<Signup/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/" exact element={<Home/>}/>
      <Route path="/userdashboard" element={<Userdashboard/>}/>
      <Route path="/admindashboard" element={<Admindashboard/>}/>
      <Route path="/movie" element={<Movie/>}/>
      <Route path="/bookedtickets" element={<Bookedtickets />} />
    </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
