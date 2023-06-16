"use client";
import React, { useEffect, useState } from "react";
import StudioUI from "./StudioUI";
import Modal from "./ui/Modal";
import { SanityImageAsset, Studio } from "../types/schema";
import { subscribe, unsubscribe } from "pubsub-js";
import Image from "next/image";
import AudioPlayer from "./ui/AudioPlayer";
import { usePageContext } from "../context/PageContext";
import { urlFor } from "../utils/sanity-utils";
import Poster from "./Poster";

type Props = {
  input: Studio[];
};

// const myCustomImageBuilder = (imageUrlBuilder, options) => {
// 	return imageUrlBuilder
// 		.width(options.width || Math.min(options.originalImageDimensions.width, 800))
// 		.blur(20)
// 		.flipHorizontal()
// 		.saturation(-100)
// 		.fit('clip');
// };

const Playlist = ({ input }: Props) => {
  const [poster, setPoster] = useState<SanityImageAsset | any>(null);

  const { studio, setStudio, currentStudioIndex, setCurrentStudioIndex } =
    usePageContext();

  useEffect(() => {
    // document.addEventListener("click", () => {
    //   setCurrentStudioIndex(Math.round(Math.random() * (input.length - 1)));
    // });

    const tokenEnded = subscribe("AUDIO_END", (e, d) => {
      console.log(e);
      const next = studio.index + 1 < input.length ? studio.index + 1 : 0;
      setCurrentStudioIndex(next);
    });
    return () => {
      unsubscribe(tokenEnded);
    };
  }, []);

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
    });
  }, [currentStudioIndex]);

  return (
    <div className='playlist'>
      {/* <pre>{JSON.stringify(studio, null, 2)}</pre> */}
      <div className='playlist'>
        {input?.map((item, i: number) => (
          <StudioUI key={item.title} index={i} input={item} />
        ))}
      </div>
      <Poster />
      {studio && studio.trackUrl && <AudioPlayer url={studio.trackUrl} />}
    </div>
  );
};

export default Playlist;
