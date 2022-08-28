import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";
import { MdOutlineArrowBackIos, MdOutlineArrowForwardIos } from "react-icons/md";

import useCards from "../../hooks/useCards";
import { PAGE_SIZE } from "../../lib";
import styles from "../../styles/search.module.scss";
import { PageButtonProps } from "../../types";
import Image from "./Image";

// Bottom buttons for navigation.
function Pagination({ page, amount, setPage, total }) {
 return (
  <div className={styles["pagination"]}>
   {page > 1 && (
    <PageButtons direction="back" page={page} setPage={setPage} cards={amount}>
     Previous Page
    </PageButtons>
   )}
   {amount === PAGE_SIZE && page * amount <= total && (
    <PageButtons direction="next" page={page} setPage={setPage} cards={amount}>
     {amount === PAGE_SIZE && page * amount <= total ? "Next Page" : "No More Cards"}
    </PageButtons>
   )}
  </div>
 );
}

// Buttons for navigation between pages.
const PageButtons: PageButtonProps = ({ children, direction, page, setPage, cards }) => {
 if (direction == "back") {
  return (
   <button
    aria-label="previous page"
    aria-disabled={page == 1}
    disabled={page == 1}
    onClick={() => setPage((p) => (p == 1 ? 1 : p - 1))}
   >
    {children}
   </button>
  );
 }

 return (
  <button
   aria-label="next page"
   aria-disabled={cards == 0 || cards < PAGE_SIZE}
   disabled={cards == 0 || cards < PAGE_SIZE}
   onClick={() => setPage((p: number) => (cards == 0 ? p : p + 1))}
  >
   {children}
  </button>
 );
};

// Show total cards found and navigation buttons.
function Heading({ total, openModal, amount, page, setPage }) {
 return (
  <div className={`inverse ${styles["heading"]}`}>
   <h1>{total} results found</h1>
   <div className={styles["pg-ctrl"]}>
    <button aria-label="search" onClick={openModal} className={styles["search"]}>
     <BiSearch />
    </button>
    <PageButtons direction="back" page={page} setPage={setPage} cards={amount ?? null}>
     <MdOutlineArrowBackIos />
    </PageButtons>
    <PageButtons direction="next" page={page} setPage={setPage} cards={amount ?? null}>
     <MdOutlineArrowForwardIos />
    </PageButtons>
   </div>
  </div>
 );
}

// List all cards
function CardList({ data, isModalOpen, openModal, page }) {
 const [focused, setFocused] = useState(null);

 useEffect(() => {
  if (!isModalOpen) {
   const lastFocused = document?.querySelectorAll("[data-focused=true]")?.item(0);
   if (lastFocused) {
    (lastFocused as any).focus();
   }
  }
 }, [isModalOpen]);

 // Change recent ref every tab;
 const handleKeyDown = (e, id) => {
  if (e.key == "Tab") {
   setFocused(id);
  }
 };

 if (!data || data.length == 0) {
  return (
   <div className={styles["not-found"]}>
    <p>{page <= 1 ? "No cards were found." : "No more cards were found."}</p>
    <button aria-label="search again" onClick={openModal}>
     <strong>Search Again?</strong>
    </button>
   </div>
  );
 }

 return (
  <nav id="card-list" className={styles["cards"]}>
   <ul className={styles["cards"]}>
    {data.map((card) => {
     return (
      <li key={`${card.set.id}-${card.id}`}>
       <Image
        handleKeyDown={handleKeyDown}
        focused={focused}
        name={card.name}
        link={`/card/${card.set.id}/${card.id}`}
        image={card.images.small || card.images.large}
        alt={`${card.name} from ${card.set.name}`}
       />
      </li>
     );
    })}
   </ul>
  </nav>
 );
}

// Fetch and display all cards.
const Cards = ({ openModal, isModalOpen }) => {
 const router = useRouter();
 const [total, setTotal] = useState(0);
 const [page, setPage] = useState(1);
 const { cards: data, error, loading, total: totalCount } = useCards(page);

 // Reset to first page when path changes.
 useEffect(() => {
  setPage(1);
 }, [router.asPath]);

 // Scroll to top when page changes.
 useEffect(() => {
  window && window.scroll({ top: 0, behavior: "smooth" });
 }, [page]);

 useEffect(() => {
  totalCount !== total && !loading && setTotal(totalCount ?? 0);
 }, [totalCount, total, loading]);

 if (loading) {
  return (
   <>
    <Heading
     openModal={openModal}
     total={total}
     page={page}
     amount={data?.length}
     setPage={setPage}
    />
    <ul className={styles["cards"]}>
     {[...Array(20)].map((x, i) => (
      <li className={`image ${styles["img-placeholder"]}`} key={i} />
     ))}
    </ul>
   </>
  );
 }

 if (error) {
  return (
   <div className={styles["not-found"]}>
    <p>{error.message ?? error.statusText}</p>
    <button aria-label="Search again" onClick={openModal}>
     <strong>Search Again?</strong>
    </button>
   </div>
  );
 }

 return (
  <>
   <Heading
    openModal={openModal}
    total={total}
    page={page}
    amount={data?.length}
    setPage={setPage}
   />
   <CardList openModal={openModal} isModalOpen={isModalOpen} data={data} page={page} />
   {total > PAGE_SIZE && (
    <Pagination total={total} page={page} setPage={setPage} amount={data.length} />
   )}
  </>
 );
};

export default Cards;
