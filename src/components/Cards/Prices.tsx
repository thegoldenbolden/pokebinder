import { Fragment } from "react";
import styles from "../../styles/card.module.scss";

const Price = ({ price, title, symbol = "€", color = "rgb(21, 112, 208)" }) => {
 return (
  <>
   {typeof price == "number" && (
    <li>
     <span className={styles["price-label"]}>{title.split(/(?=[A-Z])/g).join(" ")}</span>
     <span style={{ color }}>
      {symbol} {price}
     </span>
    </li>
   )}
  </>
 );
};

const Cardmarket = ({ cardmarket }) => {
 return (
  <div>
   <h2 className="flex space">
    {cardmarket.url ? (
     <a href={cardmarket.url} target={"_blank"} rel="noopener noreferrer">
      Buy From CardMarket
     </a>
    ) : (
     "CardMarket"
    )}
    {cardmarket?.updatedAt && <span>Updated at {cardmarket.updatedAt}</span>}
   </h2>
   <ul className={styles["price"]}>
    <Price title="Average Sell Price" price={cardmarket.prices.averageSellPrice} />
    <Price title="Low Price" price={cardmarket.prices.lowPrice} />
    <Price title="Trend Price" price={cardmarket.prices.trendPrice} />
    <Price title="Reverse Holo Trend" price={cardmarket.prices.reverseHoloTrend} />
    <Price title="Low Price Ex Plus" price={cardmarket.prices.lowPriceExPlus} />
    <Price title="1 Day Average" price={cardmarket.prices.avg1} />
    <Price title="7 Day Average" price={cardmarket.prices.avg7} />
    <Price title="30 Day Average" price={cardmarket.prices.avg30} />
    <Price title="Reverse Holo 1 Day Average" price={cardmarket.prices.reverseHoloAvg1} />
    <Price title="Reverse Holo 7 Day Average" price={cardmarket.prices.reverseHoloAvg7} />
    <Price title="Reverse Holo 30 Day Average" price={cardmarket.prices.reverseHoloAvg30} />
   </ul>
  </div>
 );
};

const TCGPlayer = ({ tcgplayer }) => {
 return (
  <div>
   <h2>
    {tcgplayer?.url ? (
     <a href={tcgplayer.url} target="_blank" rel="noreferrer noopener">
      Buy From TCGPlayer
     </a>
    ) : (
     "TCGPlayer"
    )}
    {tcgplayer?.updatedAt && <span>Updated at {tcgplayer?.updatedAt}</span>}
   </h2>
   <ul className={styles["price"]}>
    {Object.entries(tcgplayer.prices).map((entry: any, i) => {
     const [type, value] = entry;

     return (
      <Fragment key={`${i}-tcg`}>
       <Price
        title={`${type == "reverseHolofoil" ? "Reverse Holofoil" : type} Market`}
        symbol="$"
        price={value.market}
       />
       <Price
        title={`${type == "reverseHolofoil" ? "Reverse Holofoil" : type} Low`}
        symbol="$"
        price={value.low}
        color="green"
       />
       <Price
        title={`${type == "reverseHolofoil" ? "Reverse Holofoil" : type} Mid`}
        symbol="$"
        price={value.mid}
        color="orange"
       />
       <Price
        title={`${type == "reverseHolofoil" ? "Reverse Holofoil" : type} High`}
        symbol="$"
        price={value.high}
        color="red"
       />
      </Fragment>
     );
    })}
   </ul>
  </div>
 );
};

const Prices = ({ tcgplayer, cardmarket }) => {
 if (!tcgplayer && !cardmarket) {
  return <p style={{ textAlign: "center", margin: ".5rem 0" }}>No prices have been added.</p>;
 }

 return (
  <section tabIndex={0} className={styles["prices"]}>
   {tcgplayer.prices && <TCGPlayer tcgplayer={tcgplayer} />}
   {cardmarket.prices && <Cardmarket cardmarket={cardmarket} />}
  </section>
 );
};

export default Prices;
