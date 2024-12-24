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
      <div
        role="list"
        className="grid divide-y-2 divide-white border-2 border-white  bg-indigo-950"
      >
        <div className="text-center text-7xl text-white py-6">Clues</div>
        <div className="grid grid-cols-5 divide-x-2 divide-white text-white max-[450px]:text-lg min-[450px]:text-2xl">
          <div className="flex items-center justify-center">S.No</div>
          <div className="flex justify-center py-5">Picture</div>
          <div className="flex items-center justify-center">Clue</div>
          <div className="flex items-center justify-center">Answer</div>
          <div className="flex flex-wrap gap-1 justify-center items-center py-2">
            Buttons
          </div>
        </div>
        {cluesData.length
          ? cluesData.map((clue, k) => (
              <div
                key={k}
                clue_no={k}
                className="grid grid-cols-5 divide-x-2 divide-white text-white"
              >
                <div className="flex items-center justify-center">{k + 1}</div>
                <div className="flex justify-center py-5">
                  <img
                    className="h-12 w-12 flex-none rounded-full bg-gray-50"
                    src={clue.image}
                    alt=""
                  />
                </div>
                <div className="flex items-center justify-center">
                  {clue.clue}
                </div>
                <div className="flex items-center justify-center">
                  {clue.answer}
                </div>
                <div className="flex flex-wrap gap-1 justify-center items-center py-2">
                  <button
                    onClick={(e) => handleDeleteExperiences(e)}
                    className="border-white border-black border-2 rounded-md h-9 w-9"
                    clue_key={k}
                    // type="submit"
                  >
                    <TrashIcon className="" aria-hidden="true"></TrashIcon>
                  </button>
                  <button
                    onClick={(e) => moveUp(e)}
                    className="border-white border-black border-2 rounded-md p-1 h-9 w-9"
                    clue_key={k}
                    // type="submit"
                  >
                    <ChevronUpIcon
                      className=""
                      aria-hidden="true"
                    ></ChevronUpIcon>
                  </button>
                  <button
                    onClick={(e) => moveDown(e)}
                    className="border-white border-black border-2 rounded-md p-1 h-9 w-9"
                    clue_key={k}
                    // type="submit"
                  >
                    <ChevronDownIcon
                      className=""
                      aria-hidden="true"
                    ></ChevronDownIcon>
                  </button>
                </div>
              </div>
            ))
          : ""}
      </div>
    </div>
  );
};

export default Clues;
