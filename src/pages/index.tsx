import { useContext, useRef } from "react";
import Link from "next/link";
import { MdOutlineArrowCircleUp, MdOutlineCalendarToday } from "react-icons/md";

import styles from "../styles/Home.module.scss";
import Image from "../components/Image";
import Head from "../components/Head";
import { BASE_URL } from "../lib";
import axios from "axios";
import Input from "../components/Input";
import Router from "next/router";
import { ThemeContext } from "../context/useTheme";

const Home = ({ released }) => {
 const setRef = useRef(null);
 const inputRef = useRef(null);
 const { mode } = useContext(ThemeContext);

 const horizontalScroll = (direction: number) => {
  if (setRef.current) {
   setRef.current.scrollTo({
    behavior: "smooth",
    left: setRef.current.scrollLeft + direction * setRef.current.offsetWidth,
   });
  }
 };

 const handleSubmit = (e) => {
  e.preventDefault();
  const value = inputRef.current.value.split(/[, ]+/g).filter((e) => e);
  Router.push({ pathname: "/search", query: { cards: inputRef.current?.value ?? "" } });
 };

 return (
  <>
   <Head />
   <main className={styles["main"]}>
    <div className={styles["landing"]}>
     <div>
      <h1>
       Welcome to <span>Poké</span>
       <span id="binder">Binder</span>
      </h1>
      <p>The Ultimate Pokémon Card Database</p>
      <form onSubmit={handleSubmit}>
       <Input
        type="text"
        inputRef={inputRef}
        label="cards"
        name="cards"
        props={{
         placeholder: "Search cards",
         className: mode,
         ariaLabelledby: "search pokemon cards",
         ariaDescribedBy: "use a command to search for multiple cards",
        }}
       />
       <p>Use a comma to search for multiple cards at once!</p>
       <p>
        Ex.&nbsp;<strong>bulbasaur</strong>,&nbsp;<strong>psyduck</strong>,&nbsp;
        <strong>togepi</strong>
       </p>
      </form>
     </div>
    </div>
    {released.length > 0 && (
     <div className={styles["recent"]}>
      <div className={`inverse ${styles["recent-h"]}`}>
       <h2>Most Recent Sets</h2>
       <div>
        <MdOutlineArrowCircleUp
         role="button"
         onClick={(e) => horizontalScroll(-1)}
         style={{ transform: "rotate(-90deg)" }}
        />
        <MdOutlineArrowCircleUp
         role="button"
         onClick={(e) => horizontalScroll(1)}
         style={{ transform: "rotate(90deg)" }}
        />
       </div>
      </div>
      <div ref={setRef} className={styles["container"]}>
       {released.map((set, i) => {
        return (
         <div className={`bg ${styles["set"]}`} key={i}>
          <Image className={styles["logo"]} src={`${set.images.logo}`} alt={`${set.name} logo`} />
          <div className={styles["name"]}>
           <div>
            <Image
             className={styles["symbol"]}
             src={`${set.images.symbol}`}
             alt={`${set.name} symbol`}
            />
            <Link prefetch={false} href={`/search?sets=${set.id}`}>
             <a aria-label={`view cards from ${set.name}`}>{set.name}</a>
            </Link>
           </div>
           <div>
            <MdOutlineCalendarToday />
            <span>Released {set.releaseDate}</span>
           </div>
          </div>
         </div>
        );
       })}
      </div>
     </div>
    )}
   </main>
  </>
 );
};

export default Home;

export const getStaticProps = async () => {
 const options = { headers: { "X-Api-Key": `${process.env.TCG_KEY}` } };

 const [released] = await Promise.all([
  await axios.get(
   `${BASE_URL}/sets?select=name,id,images,releaseDate&orderBy=-releaseDate&pageSize=25`,
   options
  ),
 ]).catch((e) => null);

 return {
  revalidate: 60 * 60 * 24,
  props: { released: released?.data?.data ?? [] },
 };
};
