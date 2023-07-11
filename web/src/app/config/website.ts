const website = {
  pathPrefix: "/", // Prefix for all links. If you deploy your site to example.com/portfolio your pathPrefix should be "portfolio"
  title: "PLAYLIST STUDIOS", // Navigation and Site Title
  titleAlt: "PS", // Title for JSONLD
  description:
    "Welcome to Playlist Studios. Studios around the world. Free Listening Get your A2 Risography copy 50 ltd now !",
  headline: "", // Headline for schema.org JSONLD
  url: "https://playliststudios.com", // Domain of your site. No trailing slash!
  image: "https://playliststudios.com/playlist-studios-poster.jpeg", // Used for SEO
  ogLanguage: "fr_FR", // Facebook Language

  // JSONLD / Manifest
  faviconLetter: "P",
  favicon: "src/images/logo.png", // Used for manifest favicon generation
  shortName: "aeai", // shortname for manifest. MUST be shorter than 12 characters
  author: "aeai", // Author for schemaORGJSONLD
  themeColor: "#000000",
  backgroundColor: "#000000",

  instagram: "",
  twitter: "", // Twitter Username
  facebook: "", // Facebook Site Name
  googleAnalyticsID: "",

  skipNavId: "reach-skip-nav", // ID for the "Skip to content" a11y feature
};

export default website;
