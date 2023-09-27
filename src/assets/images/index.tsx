
/// Image Props
interface ImageProps {
    height?: number;
    width?: number;
}

/// Image Props
interface AssetImageProps {
    height?: number;
    width?: number;
    src: string;
}

function AssetImage(props: AssetImageProps) {
    const { height, width, src } = props;
    return <img src={new URL(src, import.meta.url).href} width={width} height={height} />
}

/// Image Props Type
type ImagePropsType = (props?: ImageProps) => React.ReactNode;

/// [Images] type
type ImagesType = Record<string, ImagePropsType>;

/**
 *  Asset Images
 * @param props given [width] - [height]
 */
const Images = {

    /**
     * Logo White
     */
    logoWhite: (props?: ImageProps) => {
        return <AssetImage src="./logo/logo_white.png" {...props} />
    },

    /**
    * Logo Black
    */
    logoBlack: (props?: ImageProps) => {
        return <AssetImage src="./logo/logo_black.png" {...props} />
    },

    /**
    * Logo Text White
    */
    logoTextWhite: (props?: ImageProps) => {
        return <AssetImage src="./logo/logo_text_white.png" {...props} />
    },

    /**
    * Logo Text Black
    */
    logoTextBlack: (props?: ImageProps) => {
        return <AssetImage src="./logo/logo_text_black.png" {...props} />
    },

    /**
    * Logo Text With White
    */
    logoTextWithWhite: (props?: ImageProps) => {
        return <AssetImage src="./logo/logo_text_with_white.png" {...props} />
    },

    /**
    * Logo Text With Black
    */
    logoTextWithBlack: (props?: ImageProps) => {
        return <AssetImage src="./logo/logo_text_with_black.png" {...props} />
    },

    /**
    * Contact Image
    */
    contactUs: (props?: ImageProps) => {
        return <AssetImage src="./contact.jpeg" {...props} />
    },

    /**
    * Google-Play Image
    */
    googlePlay: (props?: ImageProps) => {
        return <AssetImage src="./store/google_store.svg" {...props} />
    },

    /**
    * App-Store Image
    */
    appStore: (props?: ImageProps) => {
        return <AssetImage src="./store/app_store.svg" {...props} />
    },
}


export default Images;




