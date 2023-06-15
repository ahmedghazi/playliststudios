import { createClient, groq } from "next-sanity"

export const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: "production",
  apiVersion: "2023-03-04",
  useCdn: true,
})
