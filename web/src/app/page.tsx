import type { Metadata } from "next";
import website from "./config/website";
import { getHomeSeason } from "./utils/sanity-queries";
import Playlist from "./components/Playlist";
import { SanityImageAsset, Studio } from "./types/schema";

export const revalidate = 3600; // revalidate every hour
// export const runtime = "edge";

export async function generateMetadata(): Promise<Metadata> {
  const data = await getHomeSeason();
  const image: SanityImageAsset | any = data.seo?.metaImage?.asset;
  return {
    title: data.seo?.metaTitle || website.title,
    description: data.seo?.metaDescription || website.description,
    openGraph: {
      images: [image?.url || website.image],
    },
  };
}

export default async function Home() {
  const data = await getHomeSeason();
  const playlist: Studio[] | any = data.playlist;
  const themeColor: string | any = data.themeColor;

  return (
    <div className='page-home p-sm md:p-md'>
      {playlist && <Playlist input={playlist} themeColor={themeColor} />}
    </div>
  );
}
