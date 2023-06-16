import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId, useCdn } from "./env";

export const sanityConfig = {
  projectId: projectId,
  dataset: dataset,
};
export const client = createClient({
  apiVersion,
  dataset,
  projectId,
  useCdn,
});
