import styles from "../../styles/card.module.scss";

const Labels = ({ name, value }) => {
 return (
  <div className={styles["label"]}>
   <div className={styles["left"]}>
    {name.map((n, i) => (
     <span key={`name-${i}`}>{n}</span>
    ))}
   </div>
   <div className={styles["right"]}>
    {value.map((v, i) => (
     <span key={`value-${i}`}>{v}</span>
    ))}
   </div>
  </div>
 );
};

export default Labels;
