// "use client";
import Link from "next/link";
import React from "react";
import { getSettings } from "../utils/sanity-queries";
import { Season, Settings } from "../types/schema";
import ButtonPlay from "./ButtonPlay";
import clsx from "clsx";
import HeaderLogo from "./HeaderLogo";
import website from "../config/website";

export default async function Header(): Promise<JSX.Element> {
  const settings: Settings = await getSettings();
  // console.log(settings);

  return (
    <header>
      <div className='inner flex justify-between md:grid grid-cols-2 md:grid-cols-2 gap-lg- items-center  '>
        <div className=''>
          <Link href={"/"}>
            {/* {settings.siteName} */}
            <HeaderLogo siteName={settings.siteName || "PlaylistStudios"} />
          </Link>
        </div>
        <div className='md:pl-lg w-1/2 md:w-auto '>
          <div className='flex justify-between'>
            <ButtonPlay />
            <nav className='ellipsis'>
              <ul className='seasons flex justify-end'>
                {settings.nav?.map((item: Season | any, i: number) => (
                  <li
                    key={i}
                    className={clsx("pl-sm", item.homePage ? "is-active" : "")}
                    style={{
                      opacity: 1 - i / 4,
                    }}>
                    #{item.title}
                  </li>
                ))}
                <li
                  className='pl-sm'
                  style={{
                    opacity: 0.25,
                  }}>
                  ...
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}

// export default async Header;
