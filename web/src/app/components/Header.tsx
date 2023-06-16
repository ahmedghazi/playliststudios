// "use client";
import Link from "next/link";
import React from "react";
import { getSettings } from "../utils/sanity-queries";
import { Season, Settings } from "../types/schema";
import PlayAll from "./PlayAll";
import clsx from "clsx";

export default async function Header(): Promise<JSX.Element> {
  const settings: Settings = await getSettings();
  // console.log(settings);

  return (
    <header>
      <div className='inner grid grid-cols-2 md:grid-cols-2 gap-md items-center  '>
        <Link href={"/"}>{settings.siteName}</Link>
        <div className='flex justify-between'>
          <PlayAll />
          <nav>
            <ul className='seasons flex'>
              {settings.nav?.map((item: Season | any, i: number) => (
                <li
                  key={i}
                  className={clsx("pl-sm", item.homePage ? "is-active" : "")}>
                  #{item.title}
                </li>
              ))}
              <li className='pl-sm'>...</li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

// export default async Header;
