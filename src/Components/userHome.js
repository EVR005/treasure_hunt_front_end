import NavBar from "./navbar";
import Leaderboard from "./leaderboard";
import Menu from "./begingame";

const userHome = () => {
  let comp_choose = JSON.parse(localStorage.getItem("comp_choose"));
  return (
    <div>
      <NavBar></NavBar>
    </div>
  );
};

export default userHome;
