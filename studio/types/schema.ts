import type {
  SanityReference,
  SanityKeyedReference,
  SanityAsset,
  SanityImage,
  SanityFile,
  SanityGeoPoint,
  SanityBlock,
  SanityDocument,
  SanityImageCrop,
  SanityImageHotspot,
  SanityKeyed,
  SanityImageAsset,
  SanityImageMetadata,
  SanityImageDimensions,
  SanityImagePalette,
  SanityImagePaletteSwatch,
} from "sanity-codegen";

export type {
  SanityReference,
  SanityKeyedReference,
  SanityAsset,
  SanityImage,
  SanityFile,
  SanityGeoPoint,
  SanityBlock,
  SanityDocument,
  SanityImageCrop,
  SanityImageHotspot,
  SanityKeyed,
  SanityImageAsset,
  SanityImageMetadata,
  SanityImageDimensions,
  SanityImagePalette,
  SanityImagePaletteSwatch,
};

/**
 * Season
 *
 *
 */
export interface Season extends SanityDocument {
  _type: "season";

  /**
   * seo — `seo`
   *
   *
   */
  seo?: Seo;

  /**
   * homePage — `boolean`
   *
   *
   */
  homePage?: boolean;

  /**
   * Title — `string`
   *
   * Le nom de la page
   */
  title?: string;

  /**
   * Slug — `slug`
   *
   * URL based on the title (no space, or char other than a-z-0-9
   */
  slug?: { _type: "slug"; current: string };

  /**
   * Theme Color — `string`
   *
   *
   */
  themeColor?: string;

  /**
   * playlist — `array`
   *
   *
   */
  playlist?: Array<SanityKeyedReference<Studio>>;
}

/**
 * Studio
 *
 *
 */
export interface Studio extends SanityDocument {
  _type: "studio";

  /**
   * Title — `string`
   *
   *
   */
  title?: string;

  /**
   * Logo — `image`
   *
   *
   */
  logo?: {
    _type: "image";
    asset: SanityReference<SanityImageAsset>;
    crop?: SanityImageCrop;
    hotspot?: SanityImageHotspot;
  };

  /**
   * Thumbnail — `image`
   *
   *
   */
  thumbnail?: {
    _type: "image";
    asset: SanityReference<SanityImageAsset>;
    crop?: SanityImageCrop;
    hotspot?: SanityImageHotspot;
  };

  /**
   * Poster — `image`
   *
   *
   */
  poster?: {
    _type: "image";
    asset: SanityReference<SanityImageAsset>;
    crop?: SanityImageCrop;
    hotspot?: SanityImageHotspot;
  };

  /**
   * trackName — `string`
   *
   *
   */
  trackName?: string;

  /**
   * trackArtist — `string`
   *
   *
   */
  trackArtist?: string;

  /**
   * trackDuration — `string`
   *
   *
   */
  trackDuration?: string;

  /**
   * trackUrl — `string`
   *
   * youtube url
   */
  trackUrl?: string;
}

/**
 * Settings
 *
 *
 */
export interface Settings extends SanityDocument {
  _type: "settings";

  /**
   * SEO — `seo`
   *
   *
   */
  seo?: Seo;

  /**
   * Site Name — `string`
   *
   *
   */
  siteName?: string;

  /**
   * nav — `array`
   *
   *
   */
  nav?: Array<SanityKeyedReference<Season>>;

  /**
   * Crédits — `blockContent`
   *
   *
   */
  credits?: BlockContent;

  /**
   * Message 404 — `blockContent`
   *
   *
   */
  message404?: BlockContent;
}

export type Seo = {
  _type: "seo";
  /**
   * Meta title — `string`
   *
   *
   */
  metaTitle?: string;

  /**
   * Meta description — `string`
   *
   *
   */
  metaDescription?: string;

  /**
   * Meta image — `image`
   *
   *
   */
  metaImage?: {
    _type: "image";
    asset: SanityReference<SanityImageAsset>;
    crop?: SanityImageCrop;
    hotspot?: SanityImageHotspot;
  };
};

export type BlockContent = Array<
  | SanityKeyed<SanityBlock>
  | SanityKeyed<{
      _type: "image";
      asset: SanityReference<SanityImageAsset>;
      crop?: SanityImageCrop;
      hotspot?: SanityImageHotspot;
    }>
  | SanityKeyed<Embed>
>;

export type Embed = {
  _type: "embed";
  /**
   * url — `url`
   *
   *
   */
  url?: string;
};

export type LinkExternal = {
  _type: "linkExternal";
  /**
   * Label — `string`
   *
   *
   */
  label?: string;

  /**
   * Link — `string`
   *
   *
   */
  link?: string;
};

export type LinkInternal = {
  _type: "linkInternal";
  /**
   * label — `string`
   *
   *
   */
  label?: string;

  /**
   * link — `reference`
   *
   *
   */
  link?: SanityReference<Studio | Season>;
};

export type Documents = Season | Studio | Settings;
