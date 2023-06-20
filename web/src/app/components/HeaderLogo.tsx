"use client";
import React, { useEffect, useState } from "react";
import { usePageContext } from "../context/PageContext";
import Image from "next/image";
import { SanityImageAsset } from "sanity-codegen";

type Props = {
  siteName: string;
};

const HeaderLogo = (props: Props) => {
  // const [current, setCurrent] = useState();
  const { studio, play } = usePageContext();
  const [logo, setLogo] = useState<SanityImageAsset | any>(null);
  const [title, setTitle] = useState<string | any>(null);

  useEffect(() => {
    if (studio.title) setTitle(studio.title);
  }, [studio]);
  // console.log(props);
  return (
    <div className='header-logo'>
      {/* <pre>{JSON.stringify(studio.logo, null, 2)}</pre> */}
      {title && <span className='hidden-sm pr-sm'>{title} for</span>}
      <span>{props.siteName}</span>
      {/* {title && (
        <span>
          {title} for {props.siteName}
        </span>
      )} */}
      {/* {logo && (
        <Image
          src={logo.asset.url}
          width={logo.asset?.metadata?.dimensions.aspectRatio * 19}
          height={19}
          alt={props.siteName || "alt"}
          sizes='100vw'
          style={{
            width: `calc(${logo.asset?.metadata?.dimensions.aspectRatio} * 19px)`,
            height: "19px",
          }}
          // blurDataURL={studio.logo.asset?.metadata?.lqip} //automatically provided
          // placeholder='blur' // Optional blur-up while loading
        />
      )} */}
    </div>
  );
};

export default HeaderLogo;
