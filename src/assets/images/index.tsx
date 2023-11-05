/// Image Props
interface AssetImageProps {
  src: string;
  height?: number;
  width?: number;
  style?: React.CSSProperties | undefined;
}

type ImageProps = Omit<AssetImageProps, "src">;

function AssetImage(props: AssetImageProps) {
  const { height, width, src, style } = props;
  return <img style={style} src={src} width={width} height={height} />;
}

/**
 *  Asset Images
 * @param props given [width] - [height]
 */
const Images = {
  /**
   * Logo White
   */
  logoWhite: (props?: ImageProps) => {
    return (
      <AssetImage
        src="https://expervice.s3.eu-west-1.amazonaws.com/logo/logo_white.png"
        {...props}
      />
    );
  },

  /**
   * Logo Black
   */
  logoBlack: (props?: ImageProps) => {
    return (
      <AssetImage
        src="https://expervice.s3.eu-west-1.amazonaws.com/logo/logo_black.png"
        {...props}
      />
    );
  },

  /**
   * Logo Text White
   */
  logoTextWhite: (props?: ImageProps) => {
    return (
      <AssetImage
        src="https://expervice.s3.eu-west-1.amazonaws.com/logo/logo_text_white.png"
        {...props}
      />
    );
  },

  /**
   * Logo Text Black
   */
  logoTextBlack: (props?: ImageProps) => {
    return (
      <AssetImage
        src="https://expervice.s3.eu-west-1.amazonaws.com/logo/logo_text_black.png"
        {...props}
      />
    );
  },

  /**
   * Logo Text With White
   */
  logoTextWithWhite: (props?: ImageProps) => {
    return (
      <AssetImage
        src="https://expervice.s3.eu-west-1.amazonaws.com/logo/logo_text_with_white.png"
        {...props}
      />
    );
  },

  /**
   * Logo Text With Black
   */
  logoTextWithBlack: (props?: ImageProps) => {
    return (
      <AssetImage
        src="https://expervice.s3.eu-west-1.amazonaws.com/logo/logo_text_with_black.png"
        {...props}
      />
    );
  },

  /**
   * Contact Image
   */
  contactUs: (props?: ImageProps) => {
    return (
      <AssetImage
        src="https://expervice.s3.eu-west-1.amazonaws.com/contact.jpeg"
        {...props}
      />
    );
  },

  /**
   * Google-Play Image
   */
  googlePlay: (props?: ImageProps) => {
    return (
      <AssetImage
        src="https://expervice.s3.eu-west-1.amazonaws.com/store/google_store.svg"
        {...props}
      />
    );
  },

  /**
   * App-Store Image
   */
  appStore: (props?: ImageProps) => {
    return (
      <AssetImage
        src="https://expervice.s3.eu-west-1.amazonaws.com/store/app_store.svg"
        {...props}
      />
    );
  },

  /**
   * Facebook White Icon
   */
  facebookWhite: (props?: ImageProps) => {
    return (
      <AssetImage
        src="https://expervice.s3.eu-west-1.amazonaws.com/social/facebook_white.png"
        {...props}
      />
    );
  },

  /**
   * Logo Black Icon
   */
  facebookBlack: (props?: ImageProps) => {
    return (
      <AssetImage
        src="https://expervice.s3.eu-west-1.amazonaws.com/social/facebook_black.png"
        {...props}
      />
    );
  },

  /**
   * Instagram White Icon
   */
  instagramWhite: (props?: ImageProps) => {
    return (
      <AssetImage
        src="https://expervice.s3.eu-west-1.amazonaws.com/social/instagram_white.png"
        {...props}
      />
    );
  },

  /**
   * Instagram Black Icon
   */
  instagramBlack: (props?: ImageProps) => {
    return (
      <AssetImage
        src="https://expervice.s3.eu-west-1.amazonaws.com/social/instagram_black.png"
        {...props}
      />
    );
  },

  /**
   * Linkedin White Icon
   */
  linkedinWhite: (props?: ImageProps) => {
    return (
      <AssetImage
        src="https://expervice.s3.eu-west-1.amazonaws.com/social/linkedin_white.png"
        {...props}
      />
    );
  },

  /**
   * Linkedin White Icon
   */
  linkedinBlack: (props?: ImageProps) => {
    return (
      <AssetImage
        src="https://expervice.s3.eu-west-1.amazonaws.com/social/linkedin_black.png"
        {...props}
      />
    );
  },

  /**
   * Twitter White Icon
   */
  twitterWhite: (props?: ImageProps) => {
    return (
      <AssetImage
        src="https://expervice.s3.eu-west-1.amazonaws.com/social/twitter_white.png"
        {...props}
      />
    );
  },

  /**
   * Twitter Black Icon
   */
  twitterBlack: (props?: ImageProps) => {
    return (
      <AssetImage
        src="https://expervice.s3.eu-west-1.amazonaws.com/social/twitter_black.png"
        {...props}
      />
    );
  },

  /**
   * Youtube Black Icon
   */
  youtubeBlack: (props?: ImageProps) => {
    return (
      <AssetImage
        src="https://expervice.s3.eu-west-1.amazonaws.com/social/youtube_black.png"
        {...props}
      />
    );
  },
};

export default Images;
