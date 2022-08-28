import Image from "next/future/image";
import { useState, useEffect } from "react";

const CustomImage = (props) => {
 const [src, setSrc] = useState(`${props.src}`);

 useEffect(() => {
  setSrc(`${props.src}`);
 }, [props.src]);

 return (
  <Image
   alt=""
   src={src}
   blurDataURL={`${props.src}`}
   onError={() => setSrc("/back.png")}
   height={300}
   width={200}
   {...props}
  />
 );
};

export default CustomImage;
