import Footer from "./components/Footer";
import Header from "./components/Header";
import { PageContextProvider } from "./context/PageContext";
import "./styles/tailwind.css";
import "./styles/index.scss";
import { useEffect } from "react";
import Cursor from "./components/ui/Cursor";
// import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
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
      <head>
        <link
          rel='apple-touch-icon'
          sizes='180x180'
          href='https://www.playliststudios.com/apple-touch-icon.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='32x32'
          href='https://www.playliststudios.com/favicon-32x32.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='16x16'
          href='https://www.playliststudios.com/favicon-16x16.png'
        />
        <link
          rel='manifest'
          href='https://www.playliststudios.com/site.webmanifest'
        />
        <meta name='msapplication-TileColor' content='#da532c' />
        <meta name='theme-color' content='#da532c' />
      </head>
      <body>
        <div id='page'>
          <PageContextProvider>
            <Header />
            <main>{children}</main>
            <Footer />
          </PageContextProvider>
          <Analytics />
        </div>

        <Cursor color='var(--color-theme)' size={30} />
      </body>
    </html>
  );
}
