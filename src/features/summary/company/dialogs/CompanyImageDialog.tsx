import PrimaryButton from "@Components/PrimaryButton";
import { Box, Stack, Typography } from "@mui/material";
import { useMemo, useRef, useState } from "react";
import ReactCrop, { type Crop } from "react-image-crop";
import { FileDrop } from "react-file-drop";
import "react-image-crop/dist/ReactCrop.css";
import "../../../../assets/css/company.css";
import VisibilityComp from "@Components/VisibilityComp";

function CompanyImageDialog() {
  const expectedExtensions = ["png", "jpg", "jpeg"];

  const inputRef = useRef<any>();

  const [crop, setCrop] = useState<Crop>();
  const [image, setImage] = useState<null | ArrayBuffer | string>();

  const readyCrop = useMemo(() => Boolean(image), [image]);

  const fileHandler = (files: FileList | null) => {
    if (!files) return;
    const arrayList = files[0].name.split(".") as any[];
    const extension = arrayList[arrayList.length - 1];

    if (extension !== undefined && expectedExtensions.includes(extension)) {
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        console.log(reader);
        setImage(reader.result);
      });
      reader.readAsDataURL(files[0]);
    } else {
      alert("file type not supported");
    }
  };

  const filePicker = () => {
    inputRef?.current?.click();
  };

  return (
    <Box p={4} pb={1} sx={{ backgroundColor: "white" }}>
      <Stack>
        <Typography variant="h1" fontSize={20} children="Company Image" />
        <VisibilityComp visibility={readyCrop}>
          <ReactCrop
            style={{ marginTop: 10 }}
            crop={crop}
            onChange={(c) => setCrop(c)}
          >
            <img src={image as string} />
          </ReactCrop>
        </VisibilityComp>
        <VisibilityComp visibility={!readyCrop}>
          <FileDrop onTargetClick={filePicker} onDrop={(f) => fileHandler(f)}>
            <p className="placeholder">
              DRAG FILE HERE <br /> OR <span>BROWSE</span>
            </p>
            <input
              ref={inputRef}
              accept=".png, .jpg, .jpeg"
              value=""
              style={{ visibility: "hidden", opacity: 0 }}
              type="file"
              onChange={(e) => fileHandler(e.target.files)}
            />
          </FileDrop>
        </VisibilityComp>

        <Box mt={4} display="flex" justifyContent="end">
          <Stack direction="row" spacing={1}>
            <PrimaryButton
              variant="outlined"
              fontWeight="normal"
              color="black"
              children="Delete"
            />
            <PrimaryButton
              variant="contained"
              fontWeight="normal"
              color="white"
              children="Save"
            />
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
}

export default CompanyImageDialog;
