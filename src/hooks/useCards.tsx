import axios from "axios";
import Router from "next/router";
import useSWR from "swr";
import { BASE_URL, formatQuery, PAGE_SIZE } from "../lib";

const useCards = (page: number) => {
 const { data, error } = useSWR(
  `${BASE_URL}/cards?page=${page}&select=id,name,images,set&pageSize=${PAGE_SIZE}&orderBy=-cardmarket.prices.averageSellPrice&q=${formatQuery(
   { ...Router.query }
  )}`,
  async (url) => {
   try {
    const response = await fetch(url);
    const res = await response.json();
    return { data: res.data, total: res.totalCount };
   } catch (e) {
    return e;
   }
  },
  {
   revalidateOnFocus: false,
   revalidateOnReconnect: false,
   revalidateIfStale: false,
   errorRetryCount: 1,
  }
 );

 return {
  total: data?.total ?? 0,
  cards: !data?.data ? [] : data?.data,
  loading: !data && !error,
  error: error,
 };
};

export default useCards;
