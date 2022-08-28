import Link from "next/link";
import { useContext } from "react";
import { MdOutlineDarkMode } from "react-icons/md";
import { ThemeContext } from "../context/useTheme";

const Header = () => {
 const { toggle } = useContext(ThemeContext);

 return (
  <header>
   <Link href="/">
    <a arua-aria-labelledby="go to home" className="logo">
     <span>Poké</span>
     <span id="binder">Binder</span>
    </a>
   </Link>
   <button aria-label="toggle dark mode" onClick={() => toggle()}>
    <MdOutlineDarkMode />
   </button>
  </header>
 );
};

export default Header;
