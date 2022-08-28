import { FC, PropsWithChildren } from "react";

import Header from "../components/Header";
import Footer from "../components/Footer";

const Layout: FC<PropsWithChildren> = ({ children }) => {
 return (
  <>
   <Header />
   {children}
   <Footer />
  </>
 );
};

export default Layout;
