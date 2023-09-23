import test from "./social-media/facebook_black.png";

/// Icon Props
interface IconProps {
    height?: number;
    width?: number;
}

/// Icon Props
interface AssetIconProps {
    height?: number;
    width?: number;
    src: string;
}

/// Icon Asset
function AssetIcon(props: AssetIconProps) {
    const { height, width, src } = props;
    return <img src={new URL(src, import.meta.url).href} width={width} height={height} />
}

/**
 * Icon Props Type
 * 
 * default 
 * [height] 40
 * 
 * default
 * [width] 40
 */
type IconPropsType = (props?: IconProps) => React.ReactNode;

/// [Icon] type
type IconsType = Record<string, IconPropsType>;

/**
 *  Asset Icon
 * @param props given [width] - [height]
 */
const Icons = {

    /**
     * Facebook White Icon
     */
    facebookWhite: (props?: IconProps) => {
        return <AssetIcon src="./social-media/facebook_white.png" {...props} />
    },

    /**
    * Logo Black Icon
    */
    facebookBlack: (props?: IconProps) => {
        return <AssetIcon src="./social-media/facebook_black.png" {...props} />
    },

    /**
    * Instagram White Icon
    */
    instagramWhite: (props?: IconProps) => {
        return <AssetIcon src="./social-media/instagram_white.png" {...props} />
    },

    /**
    * Instagram Black Icon
    */
    instagramBlack: (props?: IconProps) => {
        return <AssetIcon src="./social-media/instagram_black.png" {...props} />
    },

    /**
    * Linkedin White Icon
    */
    linkedinWhite: (props?: IconProps) => {
        return <AssetIcon src="./social-media/linkedin_white.png" {...props} />
    },

    /**
    * Linkedin White Icon
    */
    linkedinBlack: (props?: IconProps) => {
        return <AssetIcon src="./social-media/linkedin_black.png" {...props} />
    },

    /**
    * Twitter White Icon
    */
    twitterWhite: (props?: IconProps) => {
        return <AssetIcon src="./social-media/twitter_white.png" {...props} />
    },

    /**
    * Twitter Black Icon
    */
    twitterBlack: (props?: IconProps) => {
        return <AssetIcon src="./social-media/twitter_black.png" {...props} />
    },

    /**
    * Youtube Black Icon
    */
    youtubeBlack: (props?: IconProps) => {
        return <AssetIcon src="./social-media/youtube_black.png" {...props} />
    },
}

export default Icons;




