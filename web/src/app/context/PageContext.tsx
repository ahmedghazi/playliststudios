"use client";
import React, {
  createContext,
  useContext,
  ReactNode,
  useEffect,
  useState,
} from "react";
import { usePathname } from "next/navigation";
import { SanityImageAsset, SanityReference, Studio } from "../types/schema";

interface StudioProps extends Studio {
  index: number;
  // logoAsset?: {
  //   asset: SanityReference<SanityImageAsset>;
  // };
  // posterAsset?: {
  //   asset: SanityReference<SanityImageAsset>;
  // };
}

type ContextProps = {
  settings: object;
  studio: StudioProps;
  setStudio: Function;
  currentStudioIndex: number | undefined;
  setCurrentStudioIndex: Function;
};

const PageContext = createContext<ContextProps>({} as ContextProps);

interface PageContextProps {
  // location?: object;
  children: ReactNode;
  // pageContext: object;
}

export const PageContextProvider = (props: PageContextProps) => {
  // const [poster, setPoster] = useState<string>("");
  // const [track, setTrack] = useState<string>("");
  const [currentStudioIndex, setCurrentStudioIndex] = useState<number>();
  const [studio, setStudio] = useState<StudioProps>({} as StudioProps);

  const { children } = props;
  const pathname = usePathname();
  // console.log(pathname);
  const settings = {
    pathname,
  };

  useEffect(() => {
    _format();
    window.addEventListener("resize", _format);

    return () => {
      window.removeEventListener("resize", _format);
    };
  }, []);

  const _format = () => {
    const wh = window.innerHeight;

    document.documentElement.style.setProperty("--app-height", wh + "px");

    const header = document.querySelector("header");
    let headerBounding = {} || { height: 50 };
    if (header) {
      headerBounding = header.getBoundingClientRect();

      document.documentElement.style.setProperty(
        "--header-height",
        headerBounding.height + "px"
      );
    }
  };

  return (
    <PageContext.Provider
      value={{
        settings,
        studio,
        setStudio,
        currentStudioIndex,
        setCurrentStudioIndex,
      }}>
      {children}
    </PageContext.Provider>
  );
};

// export default PageContext;
// export { PageContext, PageContextProvider };

export const usePageContext = () => useContext(PageContext);
