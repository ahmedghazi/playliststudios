import React, { useEffect, useState } from "react";
import { SanityImageAsset, Studio } from "../types/schema";
import Image from "next/image";
import { publish, subscribe, unsubscribe } from "pubsub-js";
import { usePageContext } from "../context/PageContext";
import clsx from "clsx";
import { urlFor } from "../utils/sanity-utils";
import AudioPlayer from "./ui/AudioPlayer";
import Logo from "./Logo";
// import { log } from "console";

type Props = {
  index: number;
  input: Studio;
};

const StudioUI = ({ index, input }: Props) => {
  // console.log(progress);
  const logo: SanityImageAsset | any = input.logo?.asset;
  const poster: SanityImageAsset | any = input.poster?.asset;

  const [progress, setProgress] = useState<number>(0);
  const [active, setActive] = useState<boolean>(false);
  const {
    studio,
    setStudio,
    currentStudioIndex,
    setCurrentStudioIndex,
    play,
    setPlay,
  } = usePageContext();

  useEffect(() => {
    // const tokenActive = subscribe("STUDIO_ACTIVE", (e, d) => {
    //   console.log(e);
    //   setActive(d === index);
    // });

    const tokenProgress = subscribe("AUDIO_PROGRESS", (e, d) => {
      if (d.trackUrl === input.trackUrl) {
        // const perc = d.progress.playedSeconds / d.duration;
        // console.log(perc);
        setProgress(d.progress.played);
      }
    });

    return () => {
      // unsubscribe(tokenActive);
      unsubscribe(tokenProgress);
    };
  }, []);

  useEffect(() => {
    // console.log("here");
    // if (active) {
    //   setCurrentStudioIndex(index);
    // } else {
    //   setCurrentStudioIndex(undefined);
    // }
  }, [active]);

  useEffect(() => {
    // console.log(studio);
    console.log(currentStudioIndex);
    setActive(currentStudioIndex === index);
    // if (currentStudioIndex !== index) {
    //   setActive(false);
    // }

    // setStudio({
    //   title: input.title,
    //   poster: poster,
    //   trackUrl: input.trackUrl,
    // });
  }, [currentStudioIndex]);

  const _onClick = (e: React.MouseEvent) => {
    // setActive(!active);
    if (index !== currentStudioIndex) {
      setCurrentStudioIndex(index);
      setPlay(true);
    } else {
      // setActive()
      setPlay(!play);
      // publish("PLAYING")
    }
  };
  // console.log(active, input.title);
  return (
    <article
      className={clsx(
        "studio-ui mb-md text-lg cursor-pointer",
        currentStudioIndex === index ? "is-active" : ""
      )}
      onClick={_onClick}>
      <div className='grid md:grid-cols-2 grid-rows-2 md:grid-rows-1 gap-y-sm md:gap-y-0 gap-x-lg pointer-events-none'>
        <div className='infos flex b-t b-b bg-bg'>
          <div className='w-1/2 flex justify-between studio-infos '>
            <div className='flex flex-col justify-between p-txt'>
              <h2>{input.title}</h2>
              <div className='icon-play'>play</div>
            </div>
            <div className='thumbnail aspect-square overflow-hidden '>
              {/* <pre>{JSON.stringify(input.poster, null, 2)}</pre> */}
              <Image
                src={urlFor(input.poster, 100)}
                width={100}
                height={100}
                alt={input.title || "alt"}
              />
            </div>
          </div>
          <div className='w-1/2 track-infos flex justify-between gap-md p-txt'>
            <div className='track-infos-header max-w-full '>
              <div className='ellipsis'>{input.trackArtist}</div>
              <div className='ellipsis'>{input.trackName}</div>
            </div>
            <div className='timecode'>{input.trackDuration}</div>
          </div>
          <div
            className='progress absolute top-0 left-0 h-full w-full bg-red'
            style={{
              transform: `scaleX(${progress})`,
            }}></div>
        </div>
        <div className='logo'>{logo && <Logo url={logo.url} />}</div>
      </div>
    </article>
  );
};

export default StudioUI;
