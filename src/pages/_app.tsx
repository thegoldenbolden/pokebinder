import "../styles/globals.scss";
import Layout from "../layouts";
import ErrorBoundary from "../components/ErrorBoundary";
import { ThemeProvider } from "../context/useTheme";
import { Analytics } from "@vercel/analytics/react";

const PokeBinder = ({ Component, pageProps }) => {
 return (
  <>
   <ErrorBoundary>
    <ThemeProvider>
     <Layout>
      <Component {...pageProps} />
     </Layout>
    </ThemeProvider>
   </ErrorBoundary>
   <Analytics />
  </>
 );
};

export default PokeBinder;
