import createImageUrlBuilder from "@sanity/image-url";
// import { definePreview } from 'next-sanity/preview'
// import { sanityConfig } from './config'
import { sanityConfig } from "./sanity-client";
// import { SanityAsset } from "@sanity/image-url/lib/types/types";

const imageBuilder = createImageUrlBuilder(sanityConfig);

export function urlFor(source: any, width: number = 2000) {
  // console.log(source);
  // if (!source?.asset?._ref) {
  //   return undefined;
  // }

  return imageBuilder
    ?.image(source)
    .width(width)
    .auto("format")
    .fit("crop")
    .url();
}
// export const usePreview = definePreview({
//   projectId: sanityConfig.projectId,
//   dataset: sanityConfig.dataset,
// })
