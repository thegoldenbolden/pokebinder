import NextHead from "next/head";

const Head = ({ title = null, description = "" }) => {
 return (
  <NextHead>
   <title>{`${title ? title : "PokéBinder"}`}</title>
   <meta
    name="description"
    content={description ?? "PokéBinder is the best place to find any Pokémon card."}
   />
   <meta charSet="UTF-8" />
   <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
   <meta name="viewport" content="width=device-width, initial-scale=1.0" />
   <meta name="keywords" content="pokemon,tcg,cards" />
   <meta name="robots" content="index,nofollow" />
   <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
   <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
   <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
   <link rel="manifest" href="/site.webmanifest" />
   <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#000000" />
   <meta name="apple-mobile-web-app-title" content="PokéBinder" />
   <meta name="application-name" content="PokéBinder" />
   <meta name="msapplication-TileColor" content="#000000" />
   <meta name="theme-color" content="#7cb6d7" />
  </NextHead>
 );
};

export default Head;
