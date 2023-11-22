import axios from "axios";
import { useState, useEffect } from "react";
import {
  TrashIcon,
  ChevronUpIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";

const Clues = () => {
  const [cluesData, setClues] = useState({});
  const [refresh, setRefresh] = useState(false);
  const token = JSON.parse(localStorage.getItem("accesstoken"));
  const headers = { Authorization: `Bearer ${token}` };
  let params = {
    id: JSON.parse(localStorage.getItem("player_id")),
  };
  useEffect(() => {
    axios
      .get("https://treasure-hunt-smoy.onrender.com/getclues", {
        headers,
        params,
      })
      .then((res) => setClues(res.data))
      .catch((err) => console.log("Can't fetch clues"));
  }, [refresh]);

  const handleDeleteExperiences = async (e) => {
    let ind = e.currentTarget.getAttribute("clue_key");
    params.index = cluesData[ind].id;
    params.url = cluesData[ind].image;
    await axios
      .delete("https://treasure-hunt-smoy.onrender.com/deleteClue/", {
        headers,
        params,
      })
      .catch((err) => {
        console.log(err);
      });
    cluesData.splice(params.index, 1);
    setRefresh((x) => !x);
    console.log(ind);
  };
  const moveUp = async (e) => {
    let ind = e.currentTarget.getAttribute("clue_key");
    let x = parseInt(ind);
    if (x != 0) {
      params.index = cluesData[x].id;
      params.prev = cluesData[x - 1].id;
      params.cur_clue = x + 1;
      params.prev_clue = x;
      await axios
        .get("https://treasure-hunt-smoy.onrender.com/moveup", {
          headers,
          params,
        })
        .then(() => {
          console.log("moved up successfully!");
        })
        .catch((err) => console.log("error in moving up!"));
      setRefresh((x) => !x);
    }
  };
  const moveDown = async (e) => {
    let ind = e.currentTarget.getAttribute("clue_key");
    let x = parseInt(ind);
    if (x != cluesData.length - 1) {
      params.index = cluesData[x].id;
      params.next = cluesData[x + 1].id;
      params.cur_clue = x + 1;
      params.next_clue = x + 2;
      await axios
        .get("https://treasure-hunt-smoy.onrender.com/movedown", {
          headers,
          params,
        })
        .then(() => {
          console.log("moved up successfully!");
        })
        .catch((err) => console.log("error in moving up!"));
      setRefresh((x) => !x);
    }
  };

  console.log(cluesData);

  return (
    <div>
      <ul role="list" className="divide-y divide-gray-100 table-fixed mx-20">
        <tbody>
          {cluesData.length
            ? cluesData.map((clue, k) => (
                <tr
                  key={k}
                  clue_no={k}
                  className="flex justify-between gap-x-6 py-5"
                >
                  <div>{k + 1}</div>
                  <img
                    className="h-12 w-12 flex-none rounded-full bg-gray-50 mx-48"
                    src={clue.image}
                    alt=""
                  />
                  <div className="min-w-0 flex-auto mx-48">
                    <p className="text-sm font-semibold leading-6 text-gray-900">
                      {clue.clue}
                    </p>
                  </div>
                  <div className="mx-36">
                    <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                      {clue.answer}
                    </p>
                  </div>
                  <div className="w-36">
                    <button
                      onClick={(e) => handleDeleteExperiences(e)}
                      className="btn btn-outline-light border border-black border-2 rounded-md p-1"
                      clue_key={k}
                      // type="submit"
                    >
                      <TrashIcon
                        className="block h-6 w-6"
                        aria-hidden="true"
                      ></TrashIcon>
                    </button>
                    <button
                      onClick={(e) => moveUp(e)}
                      className="btn btn-outline-light ms-1 border border-black border-2 rounded-md p-1"
                      clue_key={k}
                      // type="submit"
                    >
                      <ChevronUpIcon
                        className="block h-6 w-6"
                        aria-hidden="true"
                      ></ChevronUpIcon>
                    </button>
                    <button
                      onClick={(e) => moveDown(e)}
                      className="btn btn-outline-light ms-1 border border-black border-2 rounded-md p-1"
                      clue_key={k}
                      // type="submit"
                    >
                      <ChevronDownIcon
                        className="block h-6 w-6"
                        aria-hidden="true"
                      ></ChevronDownIcon>
                    </button>
                  </div>
                  {/* <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                  <p className="text-sm leading-6 text-gray-900">
                    {person.role}
                  </p>
                  {person.lastSeen ? (
                    <p className="mt-1 text-xs leading-5 text-gray-500">
                      Last seen{" "}
                      <time dateTime={person.lastSeenDateTime}>
                        {person.lastSeen}
                      </time>
                    </p>
                  ) : (
                    <div className="mt-1 flex items-center gap-x-1.5">
                      <div className="flex-none rounded-full bg-emerald-500/20 p-1">
                        <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                      </div>
                      <p className="text-xs leading-5 text-gray-500">Online</p>
                    </div>
                  )}
                </div> */}
                </tr>
              ))
            : ""}
        </tbody>
      </ul>
    </div>
  );
};

export default Clues;
