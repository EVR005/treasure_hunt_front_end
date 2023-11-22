import { useState, useEffect } from "react";
// import LoopData from "./loopData";
import axios from "axios";

const FormModal = () => {
  const [sizeTooLargeModal, setSizeTooLargeModal] = useState(true);
  const [showModal, setShowModal] = useState(true);
  const [petData, setPetData] = useState([]);
  const [url, setUrl] = useState([]);
  const [pageRefresh, setPageRefresh] = useState(false);
  // const [imageUploadDone,setImageUploadDone]=useState(false);

  const uploadSingleImage = (file) => {};
  const uploadMultipleImages = (images) => {};
  // setFileToBase(file);

  const setFileToBase = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const handleImage = () => {
    const files = document.getElementById("file").files;
    // console.log(files);
  };
  const setPetDetails = async () => {
    const petname = document.getElementById("petname");
    const location = document.getElementById("location");
    const description = document.getElementById("desc");
    const files = document.getElementById("file").files;
    // console.log(files);
    if (
      !petname.value ||
      !location.value ||
      // !description.value ||
      files.length === 0
    ) {
      alert("Please fill all the fields.");
      return;
    }

    if (files.length === 1) {
      var base64 = await setFileToBase(files[0]);
      var imgType = files[0].type;
      const match = imgType.match(/\/([^/]+)$/);
      console.log("\nimgTyope :" + match[1]);
      // uploadSingleImage(base64);

      const token = JSON.parse(localStorage.getItem("accesstoken"));
      const headers = { Authorization: `Bearer ${token}` };
      let params = {
        id: JSON.parse(localStorage.getItem("player_id")),
      };

      //url generation
      let temp = await axios
        .post(
          "https://treasure-hunt-smoy.onrender.com/setclue",
          {
            image: base64,
            imgtype: match[1],
          },
          { headers, params }
        )
        .then((url) => {
          // console.log("url : ");
          // console.log(url);
          axios
            .post(
              "https://treasure-hunt-smoy.onrender.com/setclue2",
              {
                clue: `${petname.value}`,
                answer: `${location.value.replaceAll(" ", "").toLowerCase()}`,
                right_path: true,
                image: url.data.image,
              },
              { headers, params }
            )
            .then((res) => {
              // console.log("It worked..");
              // console.log("Data: ", res.data);
              // console.log("Array value changed:");
              alert("Image uploaded successfully");
              setPageRefresh(!pageRefresh);
            })
            .catch((err) => {
              console.log("image too large");
              setSizeTooLargeModal(true);
            });
        })
        .catch((e) => {
          if (e.response.status === 413) setSizeTooLargeModal(true);
        });
    }
  };

  return (
    <div>
      {/* <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"> */}
      <div className="relative w-8/12 mb-6 mx-auto max-w-3xl z-40">
        {sizeTooLargeModal ? (
          <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
              <div className="relative w-8/12 my-6 mx-auto max-w-3xl">
                {/*content*/}
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                  {/*header*/}
                  <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                    <h3 className="text-2xl justify-center align-center font-semibold">
                      Oh No!
                    </h3>
                  </div>
                  {/*body*/}
                  <div className="text-3xl leading-none font-semibold">
                    {" "}
                    Incorrect Username or Password!
                  </div>
                  {/*footer*/}
                  <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                    <button
                      className="bg-red-500 text-white active:bg-red-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={setSizeTooLargeModal(false)}
                    >
                      Okay
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
          </>
        ) : null}
        {/*content*/}
        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
          {/*header*/}
          <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
            {/* <h3 className="text-2xl justify-center align-center font-semibold">
                Submit request form
              </h3> */}
            <button
              className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
              onClick={() => setShowModal(false)}
            >
              <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                ×
              </span>
            </button>
          </div>
          {/*body*/}
          <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="petname"
              >
                Clue
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="petname"
                type="text"
                placeholder="Enter Text Clue"
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="location"
              >
                Answer
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="location"
                type="text"
                placeholder="Enter Answer"
              />
            </div>
            {/* <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="desc"
              >
                Right Path
              </label>
              <textarea
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="desc"
                type="text"
                placeholder="Longer description preferred"
              ></textarea>
            </div> */}
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Image upload:
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="file"
                type="file"
                onChange={handleImage}
              />
            </div>
          </div>
          {/*footer*/}
          {/* <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b"> */}
          {/* <button
                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => setShowModal(false)}
              >
                Close
              </button> */}
          <button
            className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
            type="button"
            onClick={() => {
              setShowModal(false);
              setPetDetails();
            }}
          >
            Submit
          </button>
          {/* </div> */}
        </div>
      </div>
      {/* </div> */}
      {/* <div className="opacity-25 fixed inset-0 z-40 bg-black"></div> */}
      {/* </>
      ) : null} */}
    </div>
    // </div>
  );
};

export default FormModal;
