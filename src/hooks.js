import { useState } from "react";
export const useStatex = (data) => {
  const temp = useState(data);

  const binding = (e) => {
    e.persist();
    const inputName = e.target.getAttribute("name");

    if (typeof data == "object") {
      if (data[inputName] === undefined) {
        console.error("jsx name property should match state property");
      } else {
        temp[1]((state) => {
          return { ...state, [inputName]: e.target.value };
        });
      }
    } else {
      temp[1](e.target.value);
    }
  };
  return [...temp, binding];
};
