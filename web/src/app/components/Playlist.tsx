"use client";
import React, { useEffect, useState } from "react";
import StudioUI from "./StudioUI";
import Modal from "./ui/Modal";
import { SanityImageAsset, Studio } from "../types/schema";
import { subscribe, unsubscribe } from "pubsub-js";
import Image from "next/image";
import AudioPlayer from "./ui/AudioPlayer";
import { usePageContext } from "../context/PageContext";

type Props = {
  input: Studio[];
};

const Playlist = ({ input }: Props) => {
  // const [poster, setPoster] = useState<SanityImageAsset>(null);
  const [poster, setPoster] = useState<SanityImageAsset | any>(null);

  const { studio, setStudio, currentStudioIndex, setCurrentStudioIndex } =
    usePageContext();

  useEffect(() => {
    // document.addEventListener("click", () => {
    //   setCurrentStudioIndex(Math.round(Math.random() * (input.length - 1)));
    // });

    const tokenEnded = subscribe("AUDIO_END", (e, d) => {
      // console.log(e);
      const next = studio.index + 1 < input.length ? studio.index + 1 : 0;
      setCurrentStudioIndex(next);
    });
    return () => {
      unsubscribe(tokenEnded);
    };
  }, []);

  useEffect(() => {
    if (studio && studio.poster && studio.poster.asset) {
      setPoster(studio.poster?.asset);
    }
  }, [studio]);

  useEffect(() => {
    if (!currentStudioIndex) return;
    setStudio({
      index: currentStudioIndex,
      title: input[currentStudioIndex].title,
      posterAsset: input[currentStudioIndex].poster?.asset,
      trackUrl: input[currentStudioIndex].trackUrl,
    });
  }, [currentStudioIndex]);
  // console.log({ currentStudioIndex });
  return (
    <div className='playlist'>
      {/* <pre>{JSON.stringify(studio, null, 2)}</pre> */}
      <div className='playlist'>
        {input?.map((item, i: number) => (
          <StudioUI key={item.title} index={i} input={item} />
        ))}
      </div>
      {poster && (
        <Modal>
          {poster && poster?.url && (
            <Image
              src={poster.url}
              width={poster?.metadata?.dimensions.width}
              height={poster?.metadata?.dimensions.height}
              alt={studio.title || "alt"}
              sizes='100vw'
              style={{
                width: "100%",
                height: "auto",
              }}
              blurDataURL={poster?.metadata?.lqip} //automatically provided
              placeholder='blur' // Optional blur-up while loading
            />
          )}
        </Modal>
      )}
      {studio.trackUrl && <AudioPlayer url={studio.trackUrl} />}
    </div>
  );
};

export default Playlist;
