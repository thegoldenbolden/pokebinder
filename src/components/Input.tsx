import { useState } from "react";
import { InputComponent } from "../types";
const Input = ({ label, type, props, inputRef }: InputComponent) => {
 const [value, setValue] = useState("");

 return (
  <>
   <label htmlFor={label} className="sr-only">
    {label}
   </label>
   <input
    id={label}
    type={type ?? "text"}
    value={value}
    onChange={(e) => setValue(e.target.value)}
    {...(inputRef && { ref: inputRef })}
    {...props}
   />
  </>
 );
};

export default Input;
