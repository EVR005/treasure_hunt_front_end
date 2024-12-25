import { PaperClipIcon } from "@heroicons/react/20/solid";
import axios from "axios";

const profileProps = [
  { propname: "Username", propkey: "username" },
  { propname: "Score", propkey: "score" },
  { propname: "Email Address", propkey: "email" },
  { propname: "Phone", propkey: "phone" },
];

const Example = (props) => {
  return (
    <div className="grid bg-indigo-950 text-white m-1 divide-y-2 divide-white">
      <div className="font-semibold leading-7 text-4xl py-5">
        Player Profile
      </div>
      {profileProps.map((profileProp, profilePropKey) => {
        return (
          <div
            className="grid grid-cols-2 text-xl divide-x-2 divide-white"
            key={profilePropKey}
          >
            <div className="py-5">{profileProp.propname}</div>
            <div className="py-5 break-words">
              {props[`${profileProp.propkey}`]}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Example;
