import React, { useState } from "react";
import { publish } from "pubsub-js";
import ReactPlayer from "react-player";
import { usePageContext } from "@/app/context/PageContext";
import website from "@/app/config/website";

type Props = {
  url: String;
};
const AudioPlayer = ({ url }: Props) => {
  const [duration, setDuration] = useState<number>(0);
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

  const _onDuration = (duration: number) => {
    // console.log(duration);
    setDuration(duration);
  };
  const _onReady = (p: any) => {
    // console.log(event);
  };

  const _onProgress = (progress: object) => {
    // console.log(progress);
    publish("AUDIO_PROGRESS", {
      trackUrl: url,
      progress: progress,
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
  return (
    <div className='player-audio fixed hidden-'>
      <ReactPlayer
        url={url as string}
        playing={true}
        muted={false}
        playsinline
        config={config}
        width='100%'
        height='auto'
        onDuration={_onDuration}
        onReady={_onReady}
        onEnded={_onEnded}
        onProgress={_onProgress}
      />
    </div>
  );
};

export default AudioPlayer;
