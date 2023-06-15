import React, { useEffect, useState } from "react";
import { SanityImageAsset, Studio } from "../types/schema";
import Image from "next/image";
import { subscribe, unsubscribe } from "pubsub-js";
import { usePageContext } from "../context/PageContext";
import clsx from "clsx";
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
  const { studio, setStudio, currentStudioIndex, setCurrentStudioIndex } =
    usePageContext();

  useEffect(() => {
    const tokenActive = subscribe("STUDIO_ACTIVE", (e, d) => {
      if (d === index) {
        setActive(true);
      }
    });
    const tokenNext = subscribe("STUDIO_NEXT", (e, d) => {});

    const tokenProgress = subscribe("AUDIO_PROGRESS", (e, d) => {
      if (d.trackUrl === input.trackUrl) {
        // const perc = d.progress.playedSeconds / d.duration;
        // console.log(perc);
        setProgress(d.progress.played);
      }
    });

    return () => {
      unsubscribe(tokenActive);
      unsubscribe(tokenNext);
      unsubscribe(tokenProgress);
    };
  }, []);

  useEffect(() => {
    setCurrentStudioIndex(index);
  }, [active]);

  useEffect(() => {
    // console.log(studio);
    if (currentStudioIndex !== index) return;

    setStudio({
      title: input.title,
      poster: poster,
      trackUrl: input.trackUrl,
    });
  }, [currentStudioIndex, active]);

  const _onClick = () => {
    setActive(!active);
  };

  return (
    <article
      className={clsx(
        "studio-ui mb-md text-lg cursor-pointer",
        currentStudioIndex === index ? "is-active" : ""
      )}
      onClick={_onClick}>
      <div className='grid md:grid-cols-2 gap-lg'>
        <div className='infos flex b-t b-b bg-bg'>
          <div className='w-1/2 flex justify-between studio-infos '>
            <div className='flex flex-col justify-between p-txt'>
              <h2>{input.title}</h2>
              <div className='icon-play'>play</div>
            </div>
            <div className='thumbnail aspect-square bg-red'></div>
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
        <div className='logo'>
          {input.logo && (
            <Image
              src={logo.url}
              width={logo?.metadata?.dimensions.width}
              height={logo?.metadata?.dimensions.height}
              alt={input.title || "alt"}
              sizes='100vw'
              style={{
                width: "100%",
                height: "auto",
              }}
              blurDataURL={logo?.metadata?.lqip} //automatically provided
              placeholder='blur' // Optional blur-up while loading
            />
          )}
        </div>
      </div>
    </article>
  );
};

export default StudioUI;
