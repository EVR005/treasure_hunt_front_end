import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";

const Clue = (props) => {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-5">{props.clue}</h2>
      <div className="relative h-80 overflow-hidden rounded-lg bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-75 sm:h-64">
        <img
          //   src="https://tailwindui.com/img/ecommerce-images/home-page-02-edition-01.jpg"
          src={props.image}
          alt="clue image"
          className="h-full w-full object-cover object-center"
        />
      </div>
    </div>
  );
};

export default Clue;
