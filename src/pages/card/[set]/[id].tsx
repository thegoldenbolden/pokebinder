import { GetStaticProps, GetStaticPaths, GetStaticPathsContext, GetStaticPropsContext } from "next";
import { useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";

import styles from "../../../styles/card.module.scss";
import Head from "../../../components/Head";
import Image from "../../../components/Cards/Image";
import Details from "../../../components/Cards/Details";

const loading = () => <p>Loading..</p>;
const Set = dynamic(() => import("../../../components/Cards/Set"), { loading });
const Prices = dynamic(() => import("../../../components/Cards/Prices"), { loading });
const CardsFromSet = ({ cards, set }) => {
 return (
  <>
   {cards?.length > 0 ? (
    <div className={styles["more"]}>
     <h2 style={{ textAlign: "center" }}>
      See more cards from&nbsp;
      <Link prefetch={false} href={`/search?sets=${set.id}`}>
       <a aria-label={`find more cards from ${set.name}`}>{set.name}</a>
      </Link>
     </h2>
     <div className={styles["cards"]}>
      {cards.map((c) => (
       <Image
        key={c.id}
        link={`/card/${set.id}/${c.id}`}
        image={`${c.images.small || c.images.large}`}
        name={`${c.name}`}
        alt={`${c.name} from ${set.name}`}
       />
      ))}
     </div>
    </div>
   ) : null}
  </>
 );
};

const Card = ({ card, cards }) => {
 const [active, setActive] = useState(0);
 if (!card) return <p>We were unable to find information about this card.</p>;

 return (
  <>
   <Head title={`${card.name ?? "Card"}`} />
   <main className={styles["card"]}>
    <div className={styles["content"]}>
     <Image
      priority={true}
      image={card.images.large}
      name={card.name}
      alt={`${card.name} from ${card.set.name}`}
     />
     <div className={styles["container"]}>
      <h1 tabIndex={0}>
       <div>
        {card.name}
        {card.level && <span>LV. {card.level}</span>}
       </div>
       <span>{card.supertype}</span>
      </h1>
      <ul className={styles["tabs"]}>
       {["Details", "Set", "Prices"].map((tab, i) => {
        return (
         <li key={tab} className={`${active == i ? `${styles["active"]} ` : ""}inverse`}>
          <button
           aria-label={
            i == 0 ? "view card details" : i == 1 ? "view card set info" : "view card prices"
           }
           style={{ width: "100%", height: "100%", background: "transparent" }}
           onClick={() => setActive(i)}
          >
           {tab}
          </button>
         </li>
        );
       })}
      </ul>
      {active == 1 ? (
       <Set set={card.set} />
      ) : active == 2 ? (
       <Prices tcgplayer={card.tcgplayer} cardmarket={card.cardmarket} />
      ) : (
       <Details card={card} />
      )}
     </div>
    </div>
    <CardsFromSet cards={cards} set={card.set} />
   </main>
  </>
 );
};

export default Card;

export const getStaticPaths: GetStaticPaths = (context: GetStaticPathsContext) => ({
 paths: [],
 fallback: "blocking",
});

export const getStaticProps: GetStaticProps = async (context: GetStaticPropsContext) => {
 const axios = (await import("axios")).default;
 const options = { headers: { "X-Api-Key": `${process.env.TCG_KEY}` } };
 const { id, set } = context.params;

 const [card, cards] = await Promise.all([
  await axios.get(`https://api.pokemontcg.io/v2/cards/${id}`, options).catch((e) => e),
  await axios
   .get(
    `https://api.pokemontcg.io/v2/cards?select=name,id,images&pageSize=5&orderBy=-cardmarket.prices.trendPrice&q=(set.id:${set}) (-id:${id})`,
    options
   )
   .catch((e) => e),
 ]);

 if (!card) {
  return {
   notFound: true,
  };
 }

 return {
  revalidate: 60 * 60 * 24,
  props: {
   card: card?.data?.data,
   cards: cards?.data?.data ?? [],
  },
 };
};
