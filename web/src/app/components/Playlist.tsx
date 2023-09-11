"use client";
import React, { useEffect, useState } from "react";
import StudioUI from "./StudioUI";
import Modal from "./ui/Modal";
import { SanityImageAsset, Studio } from "../types/schema";
import { subscribe, unsubscribe } from "pubsub-js";
import Image from "next/image";
import AudioPlayer from "./ui/AudioPlayer";
import { usePageContext } from "../context/PageContext";
// import { urlFor } from "../utils/sanity-utils";
import Poster from "./Poster";
import clsx from "clsx";
// import initReactFastclick from "react-fastclick";
import FaviconLetter from "./ui/FaviconLetter";

type Props = {
  input: Studio[];
  themeColor: string;
};

const Playlist = ({ input, themeColor }: Props) => {
  const [poster, setPoster] = useState<SanityImageAsset | any>(null);
  const [buffer, setBuffer] = useState<boolean>(false);

  const { studio, setStudio, currentStudioIndex, setCurrentStudioIndex } =
    usePageContext();

  // useEffect(() => {
  //   initReactFastclick();
  // }, []);

  useEffect(() => {
    // document.addEventListener("click", () => {
    //   setCurrentStudioIndex(Math.round(Math.random() * (input.length - 1)));
    // });
    console.log(themeColor);
    document.documentElement.style.setProperty("--color-theme", themeColor);
    document.documentElement.style.setProperty("--color-primary", themeColor);

    const tokenEnded = subscribe("AUDIO_END", (e, d) => {
      // console.log(e)
      const next = studio.index + 1 < input.length ? studio.index + 1 : 0;
      console.log(e, next);
      setCurrentStudioIndex(next);
    });

    const tokenBuffer = subscribe("BUFFER", (e, d) => {
      setBuffer(true);
    });
    const tokenBufferEnd = subscribe("BUFFER_END", (e, d) => {
      setBuffer(false);
    });
    const tokenProgress = subscribe("AUDIO_PROGRESS", (e, d) => {
      setBuffer(false);
    });

    return () => {
      unsubscribe(tokenEnded);
      unsubscribe(tokenBuffer);
      unsubscribe(tokenBufferEnd);
      unsubscribe(tokenProgress);
    };
  }, [studio, setCurrentStudioIndex]);

  useEffect(() => {
    // console.log(studio.poster);
    if (studio && studio.poster && studio.poster) {
      setPoster(studio.poster);
    }
  }, [studio]);

  useEffect(() => {
    if (currentStudioIndex === undefined) return;
    console.log("setting current studio", currentStudioIndex);
    setStudio({
      index: currentStudioIndex,
      title: input[currentStudioIndex].title,
      poster: input[currentStudioIndex].poster?.asset,
      trackUrl: input[currentStudioIndex].trackUrl,
      logo: input[currentStudioIndex].logo,
      studioUrl: input[currentStudioIndex].studioUrl,
    });
  }, [currentStudioIndex]);

  return (
    <div className='playlist md:grid grid-cols-2 gap-x-lg-'>
      <div className='feed z-20-'>
        {input?.map((item, i: number) => (
          <StudioUI key={item.title} index={i} input={item} />
        ))}
      </div>
      <div className='poster-container hidden-sm'>
        <Poster />
      </div>
      <div className='poster-container sm-only'>
        <Poster />
      </div>

      {studio && studio.trackUrl && <AudioPlayer url={studio.trackUrl} />}
      <div className={clsx("loader", buffer ? "is-active" : "")}>
        <div className='inner'>Buffering ...</div>
      </div>
      <FaviconLetter texte={"P"} background={themeColor} foreground={"white"} />
    </div>
  );
};

export default Playlist;
