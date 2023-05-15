import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./Components/dashboard.js";
import Login from "./Components/login.js";
import Signup from "./Components/signup.js";
import BeginGame from "./Components/begingame.js";
import PageNotFound from "./Components/pagenotfound.js";
import UserHome from "./Components/userHome";
import Leaderboard from "./Components/leaderboard";
import AdminHome from "./Components/adminHome";
import Clue from "./Components/clue";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/pagenotfound" element={<PageNotFound />}></Route>
          <Route path="/adminHome" element={<AdminHome />}></Route>
          <Route path="/" element={<Login />}></Route>
          {/* <Route path="/begingame" element={<BeginGame />}></Route> */}
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/userHome" element={<UserHome />}></Route>
          <Route path="/clue" element={<Clue />}></Route>
          {/* <Route path="/leaderboard" element={<Leaderboard />}></Route> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
