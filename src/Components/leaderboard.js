import axios from "axios";
import { useEffect, useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import "../styles/leaderboard.css";

const Leaderboard = () => {
  // const [index, setIndex] = useState(0);
  let index = 0;
  const [users, setUsers] = useState("");
  const perpage = 10;

  const token = JSON.parse(localStorage.getItem("accesstoken"));
  const headers = { Authorization: `Bearer ${token}` };
  let params = {
    id: JSON.parse(localStorage.getItem("player_id")),
    index: index,
  };

  const leftAction = () => {
    // if (index > 0) --index;
    if (JSON.parse(localStorage.getItem("index")) > 0) {
      index = JSON.parse(localStorage.getItem("index"));
      params.index = --index;
      localStorage.setItem("index", JSON.stringify(index));
      // console.log("index : " + index);
      axios
        .get("https://treasure-hunt-smoy.onrender.com/playerdetail", {
          headers,
          params,
        })
        .then((res) => {
          // users = res.data;
          setUsers(res.data);
          // console.log(res.data);
        })
        .catch((err) => {
          // console.log(err);
        });
    }
  };
  const rightAction = async () => {
    // if (index < 4) setIndex((x) => ++x);
    let max = await axios.get(
      "https://treasure-hunt-smoy.onrender.com/getcount",
      {
        params,
        headers,
      }
    );
    let max_count = Math.ceil(max.data[0].count / perpage);
    // console.log(max_count);
    if (JSON.parse(localStorage.getItem("index")) < max_count - 1) {
      index = JSON.parse(localStorage.getItem("index"));
      params.index = ++index;
      localStorage.setItem("index", JSON.stringify(index));
      // console.log("index : " + index);
      axios
        .get("https://treasure-hunt-smoy.onrender.com/playerdetail", {
          headers,
          params,
        })
        .then((res) => {
          // users = res.data;
          setUsers(res.data);
          // console.log(res.data);
        })
        .catch((err) => {
          // console.log(err);
        });
    }
  };

  useEffect(() => {
    // const token = JSON.parse(localStorage.getItem("accesstoken"));
    // const headers = { Authorization: `Bearer ${token}` };
    // const params = {
    //   id: JSON.parse(localStorage.getItem("player_id")),
    //   index: 0,
    // };
    params.index = 0;
    localStorage.setItem("index", JSON.stringify(index));
    axios
      .get("https://treasure-hunt-smoy.onrender.com/playerdetail", {
        headers,
        params,
      })
      .then((res) => {
        // users = res.data;
        setUsers(res.data);
        // console.log(res.data);
      })
      .catch((err) => {
        // console.log(err);
      });
  }, []);
  return (
    <div>
      <table className="table-auto w-screen mt-40">
        <thead>
          <th></th>
          <th>Player Name</th>
          <th>Score</th>
        </thead>
        <tbody>
          {users &&
            users.map((val, k) => (
              <tr user_key={k}>
                <td>{k + 1}</td>
                <td>{val.userlogin.username}</td>
                <td>{val.score}</td>
              </tr>
            ))}
        </tbody>
      </table>

      <div>
        <nav
          className="isolate inline-flex -space-x-px rounded-md shadow-sm"
          aria-label="Pagination"
        >
          <button
            onClick={leftAction}
            className="w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"

            // className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
          >
            <span>Previous</span>
            {/* <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" /> */}
          </button>

          <button
            href="#"
            onClick={rightAction}
            className="w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"

            // className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
          >
            <span>Next</span>
            {/* <ChevronRightIcon className="h-5 w-5" aria-hidden="true" /> */}
          </button>
        </nav>
      </div>
    </div>
  );
};

export default Leaderboard;
