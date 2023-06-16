"use client";
import React from "react";
import { usePageContext } from "../context/PageContext";

type Props = {};

const PlayAll = (props: Props) => {
  const { currentStudioIndex, setCurrentStudioIndex, play, setPlay } =
    usePageContext();

  const _onClick = () => {
    if (currentStudioIndex === undefined) setCurrentStudioIndex(0);
    setPlay(!play);
  };

  const _getLabel = (): string => {
    let label = "PLAY ALL";
    if (play === false) {
      if (currentStudioIndex !== undefined) label = "RESUME";
    }
    if (play) {
      label = "PAUSE";
    }
    return label;
  };

  return (
    <button onClick={_onClick}>
      {_getLabel()}
      {/* {play ? "PAUSE" : "PLAY ALL"} */}
    </button>
  );
};

export default PlayAll;
