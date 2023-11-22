import PrimaryButton from "@Components/PrimaryButton";
import { Avatar, Box, Stack, Typography } from "@mui/material";
import { useMemo, useState } from "react";
import { type Crop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import "../../../../assets/css/company.css";
import VisibilityComp from "@Components/VisibilityComp";
import FileCustomDrop from "@Components/FileCustomDrop";
import { getCroppedImg } from "@Utils/functions";
import ImageCropper from "@Components/ImageCropper";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import { useUser } from "../helper/company_helper";
import CompanyRepository from "@Repo/company_repository";
import { useDialog } from "@Utils/hooks/dialog_hook";

function CompanyImageDialog() {
  /// User store
  const { company } = useUser();
  const companyImage = company?.company_image?.image_url;

  /// Crop Image src and element state
  const [src, setSrc] = useState<string | ArrayBuffer | null>(null);
  const [newSrc, setNewSrc] = useState<string | ArrayBuffer | null>(null);
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [crop, setCrop] = useState<Crop | null>(null);

  /// Ready image to crop
  const readyCrop = useMemo(() => Boolean(src), [src]);

  /// Company repository
  const companyRepo = new CompanyRepository();

  /// Dialog hook
  const { openLoading, closeDialog, openConfirm } = useDialog();

  const onSave = async () => {
    if (image && crop?.width && crop?.height) {
      const formData = (await getCroppedImg(image!, crop)).formData;
      const result = await openLoading(async () => {
        return await companyRepo.updateImage(formData);
      });
      if (!result) return;
      closeDialog();
    }
  };

  const onDelete = async () => {
    if (companyImage) {
      const confirm = await openConfirm(
        "Delete Image",
        "Are you sure to delete image?"
      );
      if (!confirm) return;
      return await openLoading(async () => {
        return await companyRepo.deleteImage();
      });
    }
    setSrc(null);
    setImage(null);
    setNewSrc(null);
  };

  /// Changed cropper
  const handleChanCrop = (image: HTMLImageElement | null, crop: Crop) => {
    setCrop(crop);
    setImage(image);
  };

  /// Completed cropper
  const handleCompCrop = async (image: HTMLImageElement | null, crop: Crop) => {
    const croppedImageUrl = (await getCroppedImg(image!, crop)).url;
    if (!croppedImageUrl) return;
    setNewSrc(croppedImageUrl);
  };

  return (
    <Box p={2} pb={1} sx={{ backgroundColor: "white" }}>
      <Stack>
        <Stack direction="row" spacing={1} alignItems="center">
          <Avatar
            sx={{ height: 60, width: 60, mt: 1 }}
            src={(newSrc as string | null) ?? companyImage}
            children={<InsertPhotoIcon />}
          />
          <Typography variant="h1" fontSize={20} children="Company Image" />
        </Stack>

        {/* Image Crop */}
        <VisibilityComp visibility={readyCrop}>
          <ImageCropper
            src={src}
            onChanged={handleChanCrop}
            onCompleted={handleCompCrop}
          />
        </VisibilityComp>

        {/* Drag File */}
        <VisibilityComp visibility={!readyCrop}>
          <FileCustomDrop onChanged={setSrc} />
        </VisibilityComp>

        <Box mt={4} display="flex" justifyContent="end">
          <Stack direction="row" spacing={1}>
            <PrimaryButton
              variant="outlined"
              fontWeight="normal"
              color="black"
              children="Delete"
              onClick={onDelete}
            />
            <PrimaryButton
              variant="contained"
              fontWeight="normal"
              color="white"
              children="Save"
              onClick={onSave}
            />
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
}

export default CompanyImageDialog;
