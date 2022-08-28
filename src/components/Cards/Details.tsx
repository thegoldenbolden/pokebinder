import Image from "next/image";
import { Fragment } from "react";

import styles from "../../styles/card.module.scss";
import Label from "./Labels";

const Details = ({ card }) => {
 return (
  <>
   <section tabIndex={0} className={styles["details"]}>
    {card.flavorText && <i style={{ width: "100%", margin: "2rem 0" }}>{card.flavorText}</i>}
    <div className={styles["labels"]}>
     {card.artist && <Label name={["Artist"]} value={[card.artist]} />}
     {card.rarity && <Label name={["Rarity"]} value={[card.rarity]} />}
     {card.nationalPokedexNumbers && (
      <Label name={["National Pokedex"]} value={card.nationalPokedexNumbers} />
     )}
     {card.types && <Label name={["Types"]} value={[card.types.join(", ")]} />}
     {card.subtypes && <Label name={["Subtypes"]} value={[card.subtypes.join(", ")]} />}
     {card.hp && <Label name={["HP"]} value={[card.hp]} />}
     {card.number && (
      <Label
       name={["Number"]}
       value={[`${card.number}${card.set.total ? ` / ${card.set.total}` : ""}`]}
      />
     )}
     {card.evolvesFrom && <Label name={["Evolves From"]} value={[card.evolvesFrom]} />}
     {card.evolvesTo && <Label name={["Evolves Into"]} value={[card.evolvesTo]} />}
     {card.weaknesses && (
      <Label
       name={["Weaknesses"]}
       value={card.weaknesses.map((weakness, i) => {
        return [
         <div key={i} style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <Image
           src={`/types/${weakness.type.toLowerCase()}.png`}
           height={17}
           width={17}
           alt={`${weakness.type} logo`}
          />
          <span>{weakness.value}</span>
         </div>,
        ];
       })}
      />
     )}
     {card.resistances && (
      <Label
       name={["Resistances"]}
       value={card.resistances.map((resistance, i) => {
        return [
         <div key={i} style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <Image
           src={`/types/${resistance.type.toLowerCase()}.png`}
           height={17}
           width={17}
           alt={`${resistance.type} logo`}
          />
          <span>{resistance.value}</span>
         </div>,
        ];
       })}
      />
     )}
     {card.retreatCost && (
      <Label
       name={["Retreat Cost"]}
       value={card.retreatCost.map((retreat, i) => {
        return [
         <Image
          key={i}
          src={`/types/${retreat.toLowerCase()}.png`}
          height={17}
          width={17}
          alt={`${retreat} logo`}
         />,
        ];
       })}
      />
     )}
     {card.legalities &&
      Object.entries(card.legalities).map((entry, i) => {
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
   </section>
   {card.abilities?.length > 0 && (
    <section tabIndex={0} className={styles["abilities"]}>
     <h2>Abilities</h2>
     <ul>
      {card.abilities.map((ability, i) => {
       return (
        <li key={`${ability.name}-${i}`}>
         <div className={styles["ability"]}>
          <div className={styles["labels"]}>
           <Label name={[ability.type]} value={[ability.name]} />
          </div>
          <p>{ability.text}</p>
         </div>
        </li>
       );
      })}
     </ul>
    </section>
   )}
   {card.attacks?.length > 0 && (
    <section tabIndex={0} className={styles["attacks"]}>
     <h2>Attacks</h2>
     <ul>
      {card.attacks.map((attack, i) => {
       return (
        <li key={`${attack.name}-${i}`}>
         <div className={styles["attack"]}>
          <div className={styles["labels"]}>
           {attack.cost && attack.cost.length > 0 && (
            <Label
             name={attack.cost.map((cost, i) => {
              return (
               <Image
                key={`${cost}-${i}`}
                src={`/types/${cost.toLowerCase()}.png`}
                alt={`${cost} logo`}
                height={17}
                width={17}
               />
              );
             })}
             value={[attack.name]}
            />
           )}
          </div>
          {attack.damage?.length > 0 && (
           <span className={styles["dmg"]}>
            <span>Damage: </span>
            {attack.damage}
           </span>
          )}
         </div>
         <p>{attack.text}</p>
        </li>
       );
      })}
     </ul>
    </section>
   )}
   {card.rules?.length > 0 && (
    <section tabIndex={0} className={styles["rules"]}>
     <h2>Rules</h2>
     <ul>
      {card.rules.map((rule, i) => {
       return (
        <li key={`rules-${i}`}>
         <p>{rule}</p>
        </li>
       );
      })}
     </ul>
    </section>
   )}
  </>
 );
};

export default Details;
