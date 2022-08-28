import { Dispatch, FC, HTMLInputTypeAttribute, MutableRefObject, PropsWithChildren, SetStateAction } from "react";

export type HeadingProps = { scroll?: boolean; state: InitialState; close: any; reset: any };

export interface Card {
 id: string;
 name: string;
 set: { name: string; id: string };
 images?: { small?: string; large?: string };
}

type Legality = { unlimited?: string, expanded?: string, standard?: string, regulation?: string };
type Attack = {
   name: string;
   cost?: string[];
   convertedEnergyCost?: number;
   damage?: string;
   text?: string;
  }

type WeaknessOrResistance = { type: string; value: string; };
type Ability = { name: string, text: string, type: string };

type Provider = {
	url?: string;
	updatedAt: string;
	prices?: {
		[key: string]: number;
   trendPrice?: number;
   avg1?: number;
   avg7?: number;
   avg30?: number;
	}
}

export interface Set { id: string; name: string; }
export interface SetExpanded extends Set {
 series: string;
 printedTotal: number;
 total: number;
 legalities?: Legality;
 releaseDate?: string;
 updatedAt?: string;
 images?: {  logo: string; };
}

export interface CardExpanded extends Card {
 supertype: string;
 subtypes?: string[];
 hp?: string;
 types?: string[];
 rules?: string[];
 flavorText: string;
 attacks?: Attack[]
 weaknesses?: WeaknessOrResistance[];
 resistances?: WeaknessOrResistance[];
 retreatCost?: string[];
 convertedRetreatCost?: number;
 set: SetExpanded;
 number: string;
 artist?: string;
 rarity?: string;
 nationalPokedexNumbers: number[];
 regulationMark?: string;
 evolvesFrom?: string[];
 evolvesTo?: string[];
 abilities?: Ability[];
 legalities?: Legality[];
 images?: { small?: string; large?: string; };
 tcgplayer?: Provider;
 cardmarket?: Provider;
}


export enum Action { Clear = 0, Add = 1, Remove = 2, Set = 3, Text = 4};
export type Payload = { type: Action;	value?: string;	key?: keyof InitialState }

export type InitialState = {
 cards: string[];
 artists: string[];
 sets: string[];
 subtypes: string[];
 supertypes: string[];
 rarities: string[];
 types: string[];
};

export type InputComponent = {
 props?: any;
 label: string;
 type: HTMLInputTypeAttribute;
 name?: string;
	inputRef: MutableRefObject<any>
}
export type SearchStaticProps = {
	sets: { id: string, name: string }[];
	rarities: string[];
	types: string[];
	subtypes: string[];
	supertypes: string[];
}

export type FormProps = SearchStaticProps & { close: () => void };


export type SearchPageProps = { page: number, setPage: Dispatch<SetStateAction<number>>, direction: "back" | "next", cards: number };
export type PageButtonProps = FC<PropsWithChildren & SearchPageProps>;