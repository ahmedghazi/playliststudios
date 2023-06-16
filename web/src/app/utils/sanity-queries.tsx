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

export async function getSeason(): Promise<Season> {
  return client.fetch(
    groq`*[_type == "season" && homePage == true][0]{
      ...,
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

// export async function getProject(slug: string): Promise<Project> {
//   return client.fetch(
//     groq`*[_type == "project" && slug.current == $slug][0]{
//       ...,
//       imageCover {
//         ...,
//         asset->
//       }
//     }`,
//     { slug: slug }
//   )
// }

// export async function getSpace(slug: string): Promise<Space> {
//   return client.fetch(
//     groq`*[_type == "space" && slug.current == $slug][0]{
//       ...,
//       imageCover {
//         ...,
//         asset->
//       }
//     }`,
//     { slug: slug }
//   )
// }
