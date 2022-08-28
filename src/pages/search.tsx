import axios from "axios";
// import dynamic from "next/dynamic";
import { useState } from "react";
import { GetStaticProps, GetStaticPropsContext } from "next";

import Cards from "../components/Cards";
import Head from "../components/Head";
import Modal from "../components/Modal";
import useNoScroll from "../hooks/useNoScroll";
import styles from "../styles/search.module.scss";
import { BASE_URL } from "../lib";
import { SearchStaticProps, Set } from "../types";
import Form from "../components/Form";

const Search = (props: SearchStaticProps) => {
 const [viewForm, setViewForm] = useState(false);
 useNoScroll(viewForm);

 // If user enters "/" open search form.
 const handleSearch = (e) => {
  e.stopPropagation();
  if (e.key === "/") {
   setViewForm(true);
  }
 };

 return (
  <>
   <Head title={"Search"} />
   <main onKeyDown={handleSearch} className={styles["main"]}>
    <Cards isModalOpen={viewForm} openModal={() => setViewForm(true)} />
   </main>
   {viewForm && (
    <Modal closeModal={() => setViewForm(false)}>
     <Form {...props} close={() => setViewForm(false)} />
    </Modal>
   )}
  </>
 );
};

export const getStaticProps: GetStaticProps = async (context: GetStaticPropsContext) => {
 const options = { headers: { "X-Api-Key": `${process.env.TCG_KEY}` } };

 const [sets, rarities, types, subtypes] = await Promise.all([
  await axios.get(`${BASE_URL}/sets?select=name,series,id,total&orderBy=name`, options),
  await axios.get(`${BASE_URL}/rarities?orderBy=name`, options),
  await axios.get(`${BASE_URL}/types?orderBy=name`, options),
  await axios.get(`${BASE_URL}/subtypes?orderBy=name`, options),
 ]).catch((e) => [null, null, null, null]);

 return {
  revalidate: 60 * 60 * 24,
  props: {
   sets:
    sets?.data?.data?.map(
     (set: any): Set => ({
      name: set.name == "Shiny Vault" ? `${set.series}: ${set.name}` : set.name,
      id: set.id,
     })
    ) ?? [],
   rarities: rarities.data.data ?? [],
   types: types.data.data ?? [],
   subtypes: subtypes.data.data ?? [],
   supertypes: ["Energy", "Pokémon", "Trainer"],
  },
 };
};

export default Search;
