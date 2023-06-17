import React from "react";
import website from "../config/website";
import { BlockContent, Settings } from "../types/schema";
import { getSettings } from "../utils/sanity-queries";
import { PortableText } from "@portabletext/react";
import components from "../utils/portableTextComponents";

type Props = {};

export default async function Footer(): Promise<JSX.Element> {
  const settings: Settings = await getSettings();

  return (
    <footer className='p-md'>
      <div className='grid md:grid-cols-4 gap-md'>
        <div className='col-span-2'>
          © {website.title} {new Date().getFullYear()}
        </div>

        <div className='text '>
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
