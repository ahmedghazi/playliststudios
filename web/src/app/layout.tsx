import Footer from "./components/Footer";
import Header from "./components/Header";
import { PageContextProvider } from "./context/PageContext";
import "./styles/tailwind.css";
import "./styles/index.scss";
import { useEffect } from "react";
import Cursor from "./components/ui/Cursor";
// import "./globals.css";
const config = require("./config/website");

export const metadata = {
  title: {
    template: `%s | ${config.title}`,
  },
  description: config.description,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body>
        <div id='page'>
          <PageContextProvider>
            <Header />
            <main>{children}</main>
            <Footer />
          </PageContextProvider>
        </div>

        {/* <Cursor /> */}
      </body>
    </html>
  );
}