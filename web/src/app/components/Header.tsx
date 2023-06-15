"use client";

import Link from "next/link";
import React from "react";
import website from "../config/website";
import { usePageContext } from "../context/PageContext";

type Props = {};

export default function Header(props: Props) {
  // const settings: Settings = await getSettings();
  // console.log(settings);
  const { setCurrentStudioIndex } = usePageContext();
  const _onClick = () => {
    setCurrentStudioIndex(0);
  };
  return (
    <header>
      <div className='inner grid grid-cols-2 md:grid-cols-2 gap-md items-center  '>
        <Link href={"/"}>{website.title}</Link>
        <div className='flex justify-between'>
          <button onClick={_onClick}>PLAY ALL</button>
          <nav>
            <ul className='seasons flex'>
              <li className='pl-sm'>#23</li>
              <li className='pl-sm'>#24</li>
              <li className='pl-sm'>#24</li>
              <li className='pl-sm'>...</li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

// export default async Header;
