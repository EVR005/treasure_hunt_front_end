import AdminNavBar from "./adminNavBar";

const userHome = () => {
  let comp_choose = JSON.parse(localStorage.getItem("comp_choose"));
  return (
    <div>
      <AdminNavBar></AdminNavBar>
    </div>
  );
};

export default userHome;
