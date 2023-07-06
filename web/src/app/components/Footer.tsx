import React from "react";
import website from "../config/website";
import { BlockContent, Settings } from "../types/schema";
import { getSettings } from "../utils/sanity-queries";
import { PortableText } from "@portabletext/react";
import components from "../utils/portableTextComponents";

// type Props = {};

export default async function Footer(): Promise<JSX.Element> {
  const settings: Settings = await getSettings();

  return (
    <footer className='p-md'>
      <div className='grid md:grid-cols-2 gap-md- gap-0'>
        <div className='col-span-2 md:col-span-1'>
          © {website.title} {new Date().getFullYear()}
        </div>

        <div className='text md:pl-lg'>
          <PortableText
            value={settings.credits as BlockContent}
            components={components}
          />
        </div>
      </div>
    </footer>
  );
}

// export default Footer;
