import { createClient, groq } from "next-sanity";
import { client } from "./sanity-client";
import { Season, Settings } from "../types/schema";

export async function getSettings(): Promise<Settings> {
  return client.fetch(
    groq`*[_type == "settings"][0]{
      ...,
      nav[]->{...},

    }`
  );
}

export async function getHomeSeason(): Promise<Season> {
  return client.fetch(
    groq`*[_type == "season" && homePage == true][0]{
      ...,
      seo{
        ...,
        metaImage{
          ...,
          asset->
        }
      },
      playlist[]->{
        ...,
        logo {
          ...,
          asset->
        },
        poster {
          ...,
          asset->
        }
      }
    }`,
    {}
  );
}

export async function getSeason(slug: string): Promise<Season> {
  return client.fetch(
    groq`*[_type == "season" && slug.current == $slug][0]{
      ...,
      seo{
        ...,
        metaImage{
          ...,
          asset->
        }
      },
      playlist[]->{
        ...,
        logo {
          ...,
          asset->
        },
        poster {
          ...,
          asset->
        }
      }
    }`,
    { slug: slug }
  );
}
