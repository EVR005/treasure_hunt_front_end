import { PaperClipIcon } from "@heroicons/react/20/solid";
import axios from "axios";

const Example = (props) => {
  return (
    <div>
      <div className="px-4 pt-10 sm:px-0">
        <div className="font-semibold leading-7 text-gray-900 text-4xl">
          Player Profile
        </div>
      </div>
      <div className="mt-6 border-t border-gray-100 text-2xl">
        <dl className="divide-y divide-gray-100">
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="font-medium leading-6 text-gray-900">Username</dt>
            <dd className="mt-1 leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {props.username}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="font-medium leading-6 text-gray-900">Score</dt>
            <dd className="mt-1 leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {props.score}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="font-medium leading-6 text-gray-900">
              Email address
            </dt>
            <dd className="mt-1 leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {props.email}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="font-medium leading-6 text-gray-900">Phone</dt>
            <dd className="mt-1 leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {props.phone}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
};

export default Example;
