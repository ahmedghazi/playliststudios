import Playlist from "@/app/components/Playlist";
import website from "@/app/config/website";
import { SanityImageAsset, Studio } from "@/app/types/schema";
import { getSeason } from "@/app/utils/sanity-queries";
import { Metadata } from "next";
import React from "react";

type Props = {
  params: {
    slug: string;
  };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const data = await getSeason(params.slug);
  // console.log(data);
  const image: SanityImageAsset | any = data.seo?.metaImage?.asset;
  return {
    title: data.seo?.metaTitle || website.title,
    description: data.seo?.metaDescription || website.description,
    openGraph: {
      images: [image?.url || website.image],
    },
  };
}

const Page: ({ params }: Props) => Promise<JSX.Element> = async ({
  params,
}) => {
  const data = await getSeason(params.slug);
  const playlist: Studio[] | any = data.playlist;
  const themeColor: string | any = data.themeColor || "blue";

  return (
    <div className='page-home p-sm md:p-md'>
      {playlist && <Playlist input={playlist} themeColor={themeColor} />}
    </div>
  );
};

export default Page;
