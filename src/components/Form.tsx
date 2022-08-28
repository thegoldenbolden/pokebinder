import {
 ChangeEvent,
 FormEvent,
 KeyboardEvent,
 useContext,
 useEffect,
 useReducer,
 useRef,
 useState,
} from "react";
import { Action, FormProps, InitialState, Payload } from "../types";
import styles from "../styles/form.module.scss";
import { MdOutlineClearAll, MdOutlineClose, MdOutlineSearch } from "react-icons/md";
import { useRouter } from "next/router";
import { ThemeContext } from "../context/useTheme";

const initial: InitialState = {
 cards: [],
 sets: [],
 artists: [],
 types: [],
 subtypes: [],
 supertypes: [],
 rarities: [],
};

const reducer = (state: InitialState, payload: Payload) => {
 const array = state[payload.key];
 if (!array && payload.type !== Action.Clear && payload.type !== Action.Text) {
  if (process.env.NODE_ENV == "development") {
   throw new Error("Invalid Key");
  } else {
   return;
  }
 }

 switch (payload.type) {
  default:
   throw new Error("Reducer Type Not Found");
  case Action.Clear:
   return { ...initial };
  case Action.Add:
   const added = array.filter((value) => payload.value.toLowerCase() !== value.toLowerCase());
   return {
    ...state,
    [payload.key]: [...added, payload.value],
   };
  case Action.Remove:
   const removed = array.filter((value) => payload.value.toLowerCase() !== value.toLowerCase());
   return { ...state, [payload.key]: removed };
  case Action.Set:
   return { ...state, [payload.key]: payload.value };
  case Action.Text:
   return { ...state, [payload.key]: payload.value };
 }
};

const Form = (props: FormProps) => {
 const router = useRouter();
 const { mode } = useContext(ThemeContext);
 const [state, dispatch] = useReducer(reducer, initial);
 const [searching, setSearching] = useState(false);
 const firstFocus = useRef(null);
 const lastFocus = useRef(null);
 const getSelectedTotal = (key: keyof InitialState) => Object.keys(state[key]).length;

 // Add url query to state.
 useEffect(() => {
  Object.entries(router.query).forEach((entry) => {
   let [key, values] = entry as [keyof InitialState, string[]];
   values = values instanceof Array ? values : [values];
   values.forEach((value) => {
    dispatch({ type: Action.Set, key, value: value.split(/,+/g) as any });
   });
  });
 }, [router.query]);

 // Set focus to first button in form
 useEffect(() => {
  const cardsInput = document?.getElementById("cards");
  if (cardsInput) {
   cardsInput.focus();
  }
 }, []);

 const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  if (searching) return;
  setSearching(true);
  // Add filters to state, and begin searching.
  const query = {};
  const keys = ["cards", "artists", "sets", "rarities", "subtypes", "supertypes", "types"];
  keys.forEach((key: keyof InitialState, i) => {
   let el: any, values: any[];
   if (i < 2) {
    // Add text input.
    el = e.currentTarget.elements.namedItem(key) as HTMLInputElement;
    if (el.value.length == 0) return;
    values = el.value.split(/,+/g).filter((e) => e);
   } else {
    // Add select input.
    el = e.currentTarget.elements.namedItem(key) as HTMLSelectElement;
    values = [...el.selectedOptions].map((option) => option.value);
   }

   // Set form values to state
   dispatch({ type: Action.Set, key, value: values as any });
   if (values.length > 0) {
    query[key] = values.join(",");
   }
  });

  router.push({ pathname: "/search", query }).then(() => {
   props.close();
   setSearching(false);
  });
 };

 // Add or remove items to state from select list.
 const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
  const key = e.currentTarget.name as keyof InitialState;
  const options = [...e.currentTarget.selectedOptions].map((option) => option.value);

  // If selected options does not include an item from state, remove it.
  state[key].forEach((value) => {
   if (!options.includes(value)) {
    dispatch({ type: Action.Remove, key, value });
   }
  });

  // If state does not include selected options then add it.
  options.forEach((value) => {
   if (!state[key].includes(value)) {
    dispatch({ type: Action.Add, key, value });
   }
  });
 };

 // Update state for artists and/or card name.
 const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
  const key = e.currentTarget.name as keyof InitialState;
  dispatch({ type: Action.Text, key, value: e.target.value });
 };

 // Focus trap
 const handleTab = (e: KeyboardEvent<HTMLFormElement>) => {
  e.stopPropagation();
  if (e.key === "Escape") {
   props.close();
  }

  if (e.key !== "Tab") return;
  if (!e.shiftKey && firstFocus?.current && e.target == lastFocus?.current) {
   e.preventDefault();
   firstFocus.current.focus();
  }

  if (e.shiftKey && lastFocus?.current && e.target == firstFocus?.current) {
   e.preventDefault();
   lastFocus.current.focus();
  }
 };

 return (
  <form
   onKeyDown={handleTab}
   className={`${mode} ${styles["search-form"]}`}
   onSubmit={handleSubmit}
  >
   <div className={styles["title"]}>
    <div>
     <h1>{searching ? "Searching.." : "Search"}</h1>
     <div className={styles["controls"]}>
      <button ref={firstFocus} data-tooltip="search" className={styles["submit"]} type="submit">
       <MdOutlineSearch />
      </button>
      <button
       className={styles["clear"]}
       type="reset"
       data-tooltip="reset"
       onClick={() => dispatch({ type: Action.Clear })}
      >
       <MdOutlineClearAll />
      </button>
      <button className={styles["close"]} data-tooltip="close" type="button" onClick={props.close}>
       <MdOutlineClose />
      </button>
     </div>
    </div>
    <p>
     To search for multiple sets, rarities, subtypes, supertypes and types.&nbsp;
     <span>Hold Ctrl or &#8984; while selecting.</span>
    </p>
   </div>
   <div>
    <label htmlFor="cards">Card</label>
    <input
     onChange={handleInputChange}
     value={state.cards}
     id="cards"
     name="cards"
     placeholder="Umbreon, Shining Charizard, Espeon"
     type="text"
    />
   </div>
   <div>
    <label htmlFor="artists">Artists</label>
    <input
     onChange={handleInputChange}
     value={state.artists}
     id="artists"
     name="artists"
     placeholder="e.g. 5ban Graphics, Masakazu Fukuda"
     type="text"
    />
   </div>
   <div>
    <label htmlFor="sets">
     Sets <sub>{getSelectedTotal("sets")} selected</sub>
    </label>
    <select onChange={handleSelectChange} value={state.sets} name="sets" id="sets" multiple>
     {props.sets.map((set: { [key: string]: string }) => (
      <option key={set.id} value={set.id.toLowerCase()}>
       {set.name}
      </option>
     ))}
    </select>
   </div>
   <div>
    <label htmlFor="rarities">
     Rarities <sub>{getSelectedTotal("rarities")} selected</sub>
    </label>
    <select
     onChange={handleSelectChange}
     value={state.rarities}
     name="rarities"
     id="rarities"
     multiple
    >
     {props.rarities.map((rarity: string) => (
      <option key={rarity} value={rarity}>
       {rarity}
      </option>
     ))}
    </select>
   </div>
   <div>
    <label htmlFor="subtypes">
     Subtypes <sub>{getSelectedTotal("subtypes")} selected</sub>
    </label>
    <select
     onChange={handleSelectChange}
     value={state.subtypes}
     name="subtypes"
     id="subtypes"
     multiple
    >
     {props.subtypes.map((subtype: string) => (
      <option key={subtype} value={subtype.toLowerCase()}>
       {subtype}
      </option>
     ))}
    </select>
   </div>
   <div>
    <label htmlFor="supertypes">
     Supertypes <sub>{getSelectedTotal("supertypes")} selected</sub>
    </label>
    <select
     onChange={handleSelectChange}
     value={state.supertypes}
     name="supertypes"
     id="supertypes"
     multiple
    >
     {props.supertypes.map((supertype: string) => (
      <option key={supertype} value={supertype.toLowerCase()}>
       {supertype}
      </option>
     ))}
    </select>
   </div>
   <div>
    <label htmlFor="types">
     Types <sub>{getSelectedTotal("types")} selected</sub>
    </label>
    <select
     ref={lastFocus}
     onChange={handleSelectChange}
     value={state.types}
     name="types"
     id="types"
     multiple
    >
     {props.types.map((type: string) => (
      <option key={type} value={type.toLowerCase()}>
       {type}
      </option>
     ))}
    </select>
   </div>
  </form>
 );
};

export default Form;
