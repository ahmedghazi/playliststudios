import type { Metadata } from "next";
import website from "./config/website";
import { getSeason } from "./utils/sanity-queries";
import Playlist from "./components/Playlist";
import { Studio } from "./types/schema";

export const revalidate = 3600; // revalidate every hour

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: website.title,
    description: website.description,
  };
}

export default async function Home() {
  const data = await getSeason();
  const playlist: Studio[] | any = data.playlist;
  return (
    <div className='page-home p-sm md:p-md'>
      {playlist && <Playlist input={playlist} />}
    </div>
  );
}
