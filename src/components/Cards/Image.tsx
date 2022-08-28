import Link from "next/link";
import Image from "../Image";
import styles from "../../styles/search.module.scss";
import { KeyboardEvent, useRef, useState } from "react";

type Card = {
 image: string;
 name: string;
 link?: string;
 alt: string;
 priority?: boolean;
 focused?: string;
 handleKeyDown?: (e: KeyboardEvent<HTMLAnchorElement>, id: string) => void;
};

const Card = (card: Card) => {
 if (!card.image) return <div className={styles["img-placeholder"]}></div>;
 return card.link ? <LinkedCard {...card} /> : <NoLinkCard {...card} />;
};

const LinkedCard = (card: Card) => {
 return (
  <Link prefetch={false} href={`${card.link}`}>
   <a
    onKeyDown={(e) => {
     if (e.key === "Tab") {
      card.handleKeyDown(e, card.link);
     }
    }}
    {...(card.focused == card.link && {
     ["data-focused"]: true,
    })}
   >
    <Image
     className="image"
     blurDataURL={`${card.image}`}
     placeholder="blur"
     src={`${card.image}`}
     alt={`${card.alt}`}
    />
   </a>
  </Link>
 );
};

const NoLinkCard = (card) => {
 return (
  <Image
   className="image"
   blurDataURL={`${card.image}`}
   placeholder="blur"
   priority={card.priority ?? false}
   src={`${card.image}`}
   alt={`${card.alt}`}
  />
 );
};

export default Card;
