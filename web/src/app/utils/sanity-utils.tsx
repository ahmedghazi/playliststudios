import { createClient, groq } from "next-sanity";
import { Podcast } from "../types/schema";

export async function getPodcasts(): Promise<Podcast[]> {
  const client = createClient({
    projectId: process.env.SANITY_PROJECT_ID,
    dataset: "production",
    apiVersion: "2023-03-04",
    useCdn: true,
  });

  return client.fetch(groq`*[_type == "podcast"] | order(_createdAt desc)`);
}

// export async function getAllTags(): Promise<string[]> {
//   const client = createClient({
//     projectId: process.env.SANITY_PROJECT_ID,
//     dataset: "production",
//     apiVersion: "2023-03-04",
//     useCdn: true,
//   });

//   return client.fetch(groq`*[_type == "podcast"]`);
// }
