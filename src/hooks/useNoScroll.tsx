import { useEffect } from "react";

export default function useNoScroll(bool: boolean) {
 useEffect(() => {
  if (document) {
   const body = document.getElementsByTagName("body").item(0);
   if (bool) {
    body.classList.add("no-scroll");
   } else {
    body.classList.remove("no-scroll");
   }
  }
 }, [bool]);
}
