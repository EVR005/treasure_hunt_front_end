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
    <div className="m-2">
      <div className="grid bg-indigo-950 divide-y-2 divide-white">
        <div className="grid grid-cols-3 divide-x-2 divide-white text-white text-2xl">
          <div className="py-5 flex justify-center items-center">S.No</div>
          <div className="flex justify-center items-center">Player Name</div>
          <div className="flex justify-center items-center">Score</div>
        </div>
        {users &&
          users.map((val, k) => (
            <div
              user_key={k}
              className="grid grid-cols-3 divide-x-2 divide-white text-white text-lg"
            >
              <div className="flex justify-center items-center py-5">
                {k + 1}
              </div>
              <div className="flex justify-center items-center">
                {val.userlogin.username}
              </div>
              <div className="flex justify-center items-center">
                {val.score}
              </div>
            </div>
          ))}
        <div className="flex justify-center py-2 bg-indigo-950">
          <div
            className="grid grid-cols-2 place-items-center w-full"
            aria-label="Pagination"
          >
            <button
              onClick={leftAction}
              className="w-fit rounded-md bg-indigo-950 p-1 text-center text-sm border-2 font-semibold text-white shadow-sm hover:bg-white hover:text-indigo-950 hover:border-indigo-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"

              // className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              {/* <span>Prev</span> */}
              <ChevronLeftIcon className="h-9 w-9" aria-hidden="true" />
            </button>

            <button
              href="#"
              onClick={rightAction}
              className="w-fit rounded-md bg-indigo-950 p-1 text-center text-sm border-2 font-semibold text-white shadow-sm hover:bg-white hover:text-indigo-950 hover:border-indigo-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"

              // className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              {/* <span>Next</span> */}
              <ChevronRightIcon className="h-9 w-9" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
