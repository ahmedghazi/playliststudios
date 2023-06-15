"use client";
import React, {
  createContext,
  useContext,
  ReactNode,
  useEffect,
  useState,
} from "react";

const PlayerContext = createContext({});
type Props = {
  children: ReactNode;
};

export const PlayerContextWrapper = (props: Props) => {
  const { children } = props;
  const [track, setTrack] = useState<string>("");
  const [progress, setProgress] = useState<number>(0);
  // console.log(pathname);
  const settings = {};

  return (
    <PlayerContext.Provider
      value={{ settings, track, setTrack, progress, setProgress }}>
      {children}
    </PlayerContext.Provider>
  );
};

// export default PlayerContext;
// export { PlayerContext, PlayerContextProvider };

export const usePlayerContext = () => useContext(PlayerContext);
