import Link from "next/link";

import styles from "../../styles/card.module.scss";
import Label from "./Labels";
import { Fragment } from "react";
import Image from "../Image";

const Set = ({ set }) => {
 return (
  <section className={styles["sets"]} tabIndex={0}>
   <h2 style={{ display: "flex", gap: ".5em", margin: ".5em 0", alignItems: "center" }}>
    <Image
     className={styles["symbol"]}
     height={40}
     width={40}
     src={`${set.images.symbol}`}
     alt={`${set.name} symbol`}
    />
    <Link prefetch={false} href={`/search?sets=${set.id}`}>
     <a>{set.name}</a>
    </Link>
   </h2>
   <div className={styles["labels"]}>
    {set.series && <Label name={["Series"]} value={[set.series]} />}
    {set.ptcgoCode && <Label name={["PTCGO Code"]} value={[set.ptcgoCode]} />}
    {set.releaseDate && <Label name={["Release Date"]} value={[set.releaseDate]} />}
    {set.updatedAt && <Label name={["Updated"]} value={[set.updatedAt]} />}
    {set.printedTotal && set.total && (
     <Label name={["Printed"]} value={[`${set.printedTotal} / ${set.total}`]} />
    )}
    {set.legalities &&
     Object.entries(set.legalities).map((entry, i) => {
      const [legal, value] = entry as [string, string];
      return (
       <Fragment key={i}>
        <Label
         name={[`${legal[0].toUpperCase() + legal.substring(1)}`]}
         value={[value[0].toUpperCase() + value.substring(1)]}
        />
       </Fragment>
      );
     })}
   </div>
   <Image className={styles["logo"]} src={`${set.images.logo}`} alt={`${set.name} logo`} />
  </section>
 );
};

export default Set;
