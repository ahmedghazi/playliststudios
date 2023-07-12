import React, { useEffect, useState } from "react";
import { publish } from "pubsub-js";
import ReactPlayer from "react-player";
import { usePageContext } from "@/app/context/PageContext";
import website from "@/app/config/website";

type Props = {
  url: String;
};
const AudioPlayer = ({ url }: Props) => {
  const [duration, setDuration] = useState<number>(0);
  const [playing, setPlaying] = useState<boolean>(false);
  const { play } = usePageContext();

  // useEffect(() => {
  //   setPlaying(play);
  // }, [play]);

  const _secondsToHms = (t: number) => {
    const d = Number(t);
    var h = Math.floor(d / 3600);
    var m = Math.floor((d % 3600) / 60);
    var s = Math.floor((d % 3600) % 60);
    return (
      (h > 0 ? h + ":" + (m < 10 ? "0" : "") : "") +
      m +
      ":" +
      (s < 10 ? "0" : "") +
      s
    );
  };

  const _onDuration = (d: number) => {
    // console.log(duration);
    setDuration(d);
  };
  const _onReady = (p: any) => {
    // console.log(event);
  };

  const _onProgress = (p: object) => {
    // console.log(progress);
    publish("AUDIO_PROGRESS", {
      trackUrl: url,
      progress: p,
      duration: duration,
    });
  };

  const _onEnded = () => {
    publish("AUDIO_END");
  };

  const config = {
    youtube: {
      playerVars: {
        iv_load_policy: 3,
        cc_load_policy: 0,
        modestbranding: 1,
        showinfo: 0,
        rel: 0,
        origin: website.url,
      },
    },
  };

  const _onBuffer = () => {
    // console.log("_onBuffer");
    publish("BUFFER");
  };
  const _onBufferEnd = () => {
    // console.log("_onBufferEnd");
    publish("BUFFER_END");
  };

  return (
    <div className='player-audio fixed hidden'>
      <ReactPlayer
        url={url as string}
        playing={play}
        muted={false}
        playsinline
        config={config}
        width='100%'
        height='auto'
        onDuration={_onDuration}
        onReady={_onReady}
        onEnded={_onEnded}
        onProgress={_onProgress}
        onBuffer={_onBuffer}
        onBufferEnd={_onBufferEnd}
      />
    </div>
  );
};

export default AudioPlayer;
