export const BASE_URL = "https://api.pokemontcg.io/v2";
export const PAGE_SIZE = 60;
export const formatQuery = (params: any) => {
 const index = ["name", "artist", "set.id", "types", "subtypes", "supertype", "rarity"];
 const keys = ["cards", "artists", "sets", "types", "subtypes", "supertypes", "rarities"];
 let format: any = [];
 keys.forEach((key, idx) => {
  if (params[key]) {
   const values =
    typeof params[key] == "string"
     ? params[key].split(/[,]+/g).map((e) => e.trim())
     : `${params[key]}`;

   format.push(
    `(${values
     .map((name: string) => {
      name = name.trim();
      return key == "sets" ? `set.id:"${name}" OR set.name:"${name}"` : `${index[idx]}:"${name}"`;
     })
     .join(" OR ")})`
   );
  }
 });
 return format.length > 0 ? `&q=${format.join(" ")}` : "";
};
