import { useEffect, useState } from "react";
import ReactCrop, { Crop, PixelCrop, centerCrop } from "react-image-crop";

interface ImageCropperProps {
  src: string | ArrayBuffer | null;
  onChanged: (image: HTMLImageElement | null, crop: Crop) => void;
  onCompleted?: (image: HTMLImageElement | null, crop: Crop) => void;
}

function ImageCropper(props: ImageCropperProps) {
  const { src, onChanged, onCompleted } = props;

  /// Crop state
  const [crop, setCrop] = useState<Crop>({
    unit: "px",
    width: 200,
    height: 200,
    x: 0,
    y: 0,
  });

  /// Image
  const [image, setImage] = useState<HTMLImageElement | null>(null);

  /// Center Crop
  function centeredCrop(mediaWidth: number, mediaHeight: number) {
    return centerCrop(
      {
        unit: "px",
        width: 200,
        height: 200,
        x: 0,
        y: 0,
      },
      mediaWidth,
      mediaHeight
    );
  }

  /// Handle cropper changed
  const handleChange = (crop: PixelCrop) => {
    setCrop(crop);
    onChanged(image, crop);
  };

  /// Handle cropper complete
  const handleComplete = (crop: PixelCrop) => {
    onCompleted?.(image, crop);
  };

  useEffect(() => {
    onCompleted?.(image, crop);
  }, [image]);

  return (
    <ReactCrop
      ruleOfThirds
      maxHeight={200}
      minHeight={200}
      maxWidth={200}
      minWidth={200}
      style={{ marginTop: 10 }}
      crop={crop}
      onChange={handleChange}
      onComplete={handleComplete}
    >
      <img
        src={src as string}
        onLoad={(e) => {
          const height = e.currentTarget.height;
          const width = e.currentTarget.width;
          const newImage = new Image(width, height);
          newImage.src = e.currentTarget.src;
          setImage(newImage);
          setCrop(centeredCrop(width, height));
        }}
      />
    </ReactCrop>
  );
}

export default ImageCropper;
