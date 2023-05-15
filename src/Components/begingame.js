// import NavBar from "./navbar";
import { useEffect, useState } from "react";
import axios from "axios";
import Clue from "./clue";
import { useForm } from "react-hook-form";

const BeginGame = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [showWinModal, setShowWinModal] = useState(false);
  const [showCompleteModal, setShowCompleteModal] = useState(false);
  const [showRestartModal, setShowRestartModal] = useState(false);
  const [showIncorrectModal, setShowIncorrectModal] = useState(false);

  const {
    register,
    formState: { errors: errors1 },
    control,
    reset,
    setValue,
    handleSubmit,
  } = useForm();
  const [visibility, setVisibility] = useState(true);
  // const [player_data, setPlayerData] = useState({});
  const [score, setScore] = useState(0);
  const [wronghits, setWrongHits] = useState(0);
  const [gametime, setGameTime] = useState(0);
  const [image, setImage] = useState("");
  const [clue, setClue] = useState("");
  const [answer, setAnswer] = useState("");
  const [right_path, setRightPath] = useState(true);
  const [comp, setComp] = useState(
    <Clue
      className="h-screen"
      clue={clue ? clue : ""}
      image={image ? image : ""}
      // answer={answer ? answer : ""}
    ></Clue>
  );
  const token = JSON.parse(localStorage.getItem("accesstoken"));
  const headers = { Authorization: `Bearer ${token}` };
  let params = { id: JSON.parse(localStorage.getItem("player_id")) };

  // useEffect(() => {
  //   setVisibility(props.visibility);
  // }, []);

  const answer_submit = async (data) => {
    if (data.answer == answer) {
      setScore((x) => x + 1);
      // console.log("Score : ", score);
      await axios.post(
        "https://treasure-hunt-smoy.onrender.com/updatescore",
        {
          score: score + 1,
          gametime: 0,
          wronghits: wronghits,
        },
        { params, headers }
      );
      let max = await axios.get(
        "https://treasure-hunt-smoy.onrender.com/getmax",
        {
          params,
          headers,
        }
      );
      // console.log("max :" + max.data[0].count);
      let max_count = max.data[0].count;
      // console.log(score);
      if (score + 1 == max_count) {
        setShowWinModal(true);
      } else setShowModal(true);
    } else {
      setShowIncorrectModal(true);
      setWrongHits((x) => ++x);
    }
  };

  const nextQuestion = async () => {
    params.score = score + 1;
    // console.log("host :" + score);
    const clue_details = await axios.get(
      "https://treasure-hunt-smoy.onrender.com/loadclue",
      {
        headers,
        params,
      }
    );
    // console.log("kiii");
    // console.log(clue_details);
    setImage(clue_details.data.image);
    setClue(clue_details.data.clue);
    setAnswer(clue_details.data.answer);
    setRightPath(clue_details.data.right_path);
    setComp(
      <Clue
        className="h-screen"
        clue={clue_details.data.clue}
        // score={temp.data.score}
        image={clue_details.data.image}
      />
    );
    setShowModal(false);
  };

  const TryAgain = () => {
    setShowIncorrectModal(false);
  };

  const resumegame = async () => {
    try {
      setVisibility(false);
      const temp = await axios
        .get("https://treasure-hunt-smoy.onrender.com/currentplayer", {
          headers,
          params,
        })
        // .then((res) => console.log(res.data))
        .catch((err) => console.log(err));
      setScore(temp.data.score);
      // console.log(temp.data.score);
      let max = await axios.get(
        "https://treasure-hunt-smoy.onrender.com/getmax",
        {
          params,
          headers,
        }
      );
      // console.log("max :" + max.data[0].count);
      setGameTime(temp.data.gametime);
      setWrongHits(temp.data.wronghits);
      // console.log(temp.data);
      let max_count = max.data[0].count;
      // console.log(temp.data.score);
      if (temp.data.score == max_count) {
        setShowCompleteModal(true);
        setComp("");
      } else {
        params.score = temp.data.score + 1;
        const clue_details = await axios.get(
          "https://treasure-hunt-smoy.onrender.com/loadclue",
          {
            headers,
            params,
          }
        );
        setImage(clue_details.data.image);
        setClue(clue_details.data.clue);
        setAnswer(clue_details.data.answer);
        setRightPath(clue_details.data.right_path);
        // console.log("hi");
        // console.log(clue_details);
        setComp(
          <Clue
            className="h-screen"
            clue={clue_details.data.clue}
            // score={temp.data.score}
            image={clue_details.data.image}
            // answer={clue_details.data.answer}
          ></Clue>
        );
      }
    } catch (err) {
      // console.log(err);
    }
  };

  const BackToMenu = () => {
    setShowWinModal(false);
    setVisibility(true);
  };

  const Close = () => {
    setShowCompleteModal(false);
    setVisibility(true);
  };

  const Restart = async () => {
    setShowRestartModal(true);
    // setVisibility(true);
    params.score = 1;
    setScore(0);
    // console.log("host :" + score);
    await axios.post(
      "https://treasure-hunt-smoy.onrender.com/updatescore",
      {
        score: 0,
        gametime: 0,
        wronghits: 0,
      },
      { params, headers }
    );
    const clue_details = await axios.get(
      "https://treasure-hunt-smoy.onrender.com/loadclue",
      {
        headers,
        params,
      }
    );
    // console.log("kiii");
    // console.log(clue_details);
    setImage(clue_details.data.image);
    setClue(clue_details.data.clue);
    setAnswer(clue_details.data.answer);
    setRightPath(clue_details.data.right_path);
    setComp(
      <Clue
        className="h-screen"
        clue={clue_details.data.clue}
        // score={temp.data.score}
        image={clue_details.data.image}
      />
    );
    setShowRestartModal(false);
    setVisibility(false);
  };

  return (
    <div className="h-screen">
      {/* <NavBar></NavBar> */}
      <div
        className="justify-center items-center h-screen w-screen space-x-10"
        style={{ display: visibility ? "flex" : "none" }}
      >
        <button
          type="submit"
          //   onClick={handleSubmit(signup_submit)}
          onClick={resumegame}
          className="block w-80 text-4xl h-40 rounded-md bg-indigo-600 px-3.5 py-2.5 text-center font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Let's begin
        </button>
        <button
          type="submit"
          onClick={Restart}
          //   onClick={handleSubmit(signup_submit)}
          className="block w-80 text-4xl h-40 rounded-md bg-indigo-600 px-3.5 py-2.5 text-center font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Restart
        </button>
      </div>
      <div style={{ display: visibility ? "none" : "flex" }}>
        <div className="bg-gray-100 w-screen h-screen">
          {showIncorrectModal ? (
            <>
              <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative w-8/12 my-6 mx-auto max-w-3xl">
                  {/*content*/}
                  <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                    {/*header*/}
                    <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                      <h3 className="text-2xl justify-center align-center font-semibold">
                        Ouh!
                      </h3>
                    </div>
                    {/*body*/}
                    <div className="text-3xl leading-none font-semibold">
                      {" "}
                      That's not right!
                    </div>
                    {/*footer*/}
                    <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                      <button
                        className="bg-red-500 text-white active:bg-red-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={TryAgain}
                      >
                        Try Again
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
            </>
          ) : null}
          {showCompleteModal ? (
            <>
              <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative w-8/12 my-6 mx-auto max-w-3xl">
                  {/*content*/}
                  <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                    {/*header*/}
                    <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                      <h3 className="text-2xl justify-center align-center font-semibold">
                        Sorry!
                      </h3>
                    </div>
                    {/*body*/}
                    <div className="text-3xl leading-none font-semibold">
                      {" "}
                      You've Already Won!
                    </div>
                    {/*footer*/}
                    <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                      <button
                        className="bg-red-500 text-white active:bg-red-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={Close}
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
            </>
          ) : null}
          {showWinModal ? (
            <>
              <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative w-8/12 my-6 mx-auto max-w-3xl">
                  {/*content*/}
                  <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                    {/*header*/}
                    <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                      <h3 className="text-2xl justify-center align-center font-semibold">
                        Congratulations!
                      </h3>
                    </div>
                    {/*body*/}
                    <div className="text-3xl leading-none font-semibold">
                      {" "}
                      You Win!
                    </div>
                    {/*footer*/}
                    <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                      <button
                        className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={BackToMenu}
                      >
                        Back To Menu
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
            </>
          ) : null}
          {showModal ? (
            <>
              <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative w-8/12 my-6 mx-auto max-w-3xl">
                  {/*content*/}
                  <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                    {/*header*/}
                    <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                      <h3 className="text-2xl justify-center align-center font-semibold">
                        Congratulations!
                      </h3>
                    </div>
                    {/*body*/}
                    <div className="text-3xl leading-none font-semibold">
                      {" "}
                      You got it right!
                    </div>
                    {/*footer*/}
                    <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                      <button
                        className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={nextQuestion}
                      >
                        Next Question
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
            </>
          ) : null}
          {/* <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"> */}
          <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-xl lg:py-32">
            <div className="mt-6 space-y-12 lg:grid lg:grid-cols-1 lg:gap-x-6 lg:space-y-0">
              {/* {callouts.map((callout) => ( */}
              <div className="group relative">
                {/* <h2 className="text-2xl font-bold text-gray-900 mb-5">{clue}</h2>
                <div className="relative h-80 overflow-hidden rounded-lg bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-75 sm:h-64">
                  <img
                    //   src="https://tailwindui.com/img/ecommerce-images/home-page-02-edition-01.jpg"
                    src={image}
                    alt="Wood table with porcelain mug, leather journal, brass pen, leather key ring, and a houseplant."
                    className="h-full w-full object-cover object-center"
                  />
                </div> */}
                {comp}
                <div className="mt-2.5">
                  <input
                    {...register("answer", {
                      required: true,
                      pattern: /^[a-zA-Z0-9\s.]+$/i,
                    })}
                    style={{ border: errors1.answer && " solid 2px red" }}
                    type="text"
                    // name="username"
                    // id="username"
                    autoComplete="organization"
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                <button
                  type="submit"
                  onClick={handleSubmit(answer_submit)}
                  className="mt-5 block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Submit
                </button>
                {/* <h3 className="mt-6 text-sm text-gray-500">
              <a href="#">
                <span className="absolute inset-0" />
                Desk and Office
              </a>
            </h3>
            <p className="text-base font-semibold text-gray-900">
              Work from home accessories
            </p> */}
              </div>
              {/* ))} */}
            </div>
          </div>
          {/* </div> */}
        </div>
      </div>
    </div>
  );
};

export default BeginGame;
