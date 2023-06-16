import React, { useEffect, useState } from "react";
import { usePageContext } from "../context/PageContext";
import { SanityImageAsset } from "../types/schema";
import Modal from "./ui/Modal";
import { urlFor } from "../utils/sanity-utils";
import Image from "next/image";

const Poster = () => {
  const [poster, setPoster] = useState<SanityImageAsset | any>(null);
  const { studio, play } = usePageContext();

  useEffect(() => {
    // console.log(studio.poster);
    if (studio && studio.poster && studio.poster) {
      setPoster(studio.poster);
    }
  }, [studio]);

  return (
    <Modal isActive={play}>
      {poster && poster?.url && (
        <Image
          src={urlFor(poster.url, 1500)}
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
  );
};

export default Poster;
