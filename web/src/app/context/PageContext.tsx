"use client";
import React, {
  createContext,
  useContext,
  ReactNode,
  useEffect,
  useState,
} from "react";
import { usePathname } from "next/navigation";
import { Studio } from "../types/schema";

interface StudioProps extends Studio {
  index: number;
}

type ContextProps = {
  settings: object;
  studio: StudioProps;
  setStudio: Function;
  currentStudioIndex: number | undefined;
  setCurrentStudioIndex: Function;
  play: boolean;
  setPlay: Function;
};

const PageContext = createContext<ContextProps>({} as ContextProps);

interface PageContextProps {
  // location?: object;
  children: ReactNode;
  // pageContext: object;
}

export const PageContextProvider = ({ children }: PageContextProps) => {
  const [currentStudioIndex, setCurrentStudioIndex] = useState<number>();
  const [studio, setStudio] = useState<StudioProps>({} as StudioProps);
  const [play, setPlay] = useState<boolean>(false);
  const pathname = usePathname();
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
        play,
        setPlay,
      }}>
      {children}
    </PageContext.Provider>
  );
};

export const usePageContext = () => useContext(PageContext);
