// import { useStaticQuery, graphql } from "gatsby";
// import { SanitySettings } from "../../graphql-types";

export const useSiteMetadata = () => {
  // const { site } = useStaticQuery(
  //   graphql`
  //     query SiteMetaData {
  //       site {
  //         buildTime(formatString: "YYYY-MM-DD")
  //         siteMetadata {
  //           defaultTitle
  //           defaultDescription
  //           defaultImage
  //           siteUrl
  //         }
  //       }
  //     }
  //   `
  // );
  // console.log(global)
  return {
    // buildTime: site.buildTime,
    // site: site.siteMetadata,
  };
};
