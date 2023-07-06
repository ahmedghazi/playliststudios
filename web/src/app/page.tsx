import type { Metadata } from "next";
import website from "./config/website";
import { getHomeSeason } from "./utils/sanity-queries";
import Playlist from "./components/Playlist";
import { Studio } from "./types/schema";

export const revalidate = 3600; // revalidate every hour
// export const runtime = "edge";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: website.title,
    description: website.description,
  };
}

export default async function Home() {
  const data = await getHomeSeason();
  const playlist: Studio[] | any = data.playlist;

  // useEffect(() => {
  //   console.log(data);
  // }, []);
  return (
    <div className='page-home p-sm md:p-md'>
      {playlist && <Playlist input={playlist} />}
    </div>
  );
}
