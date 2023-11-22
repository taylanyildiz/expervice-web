import { useRef } from "react";
import { FileDrop } from "react-file-drop";

interface FileCustomDropProps {
  onChanged: (file: string | ArrayBuffer | null) => void;
}

const expectedExtensions = ["png", "jpg", "jpeg"];

function FileCustomDrop(props: FileCustomDropProps) {
  const { onChanged } = props;

  const inputRef = useRef<any>();

  const filePicker = () => {
    inputRef?.current?.click();
  };

  const fileHandler = (files: FileList | null) => {
    if (!files) return;
    const file = files[0];
    const arrayList = file.name.split(".") as any[];
    const extension = arrayList[arrayList.length - 1];

    if (
      extension !== undefined &&
      expectedExtensions.includes(extension.toLowerCase())
    ) {
      let reader = new FileReader();
      reader.addEventListener("load", () => {
        const image = reader.result;
        onChanged(image);
      });
      reader.readAsDataURL(file);
    } else {
      alert("File Dont Supported");
    }
  };

  return (
    <FileDrop onTargetClick={filePicker} onDrop={(f) => fileHandler(f)}>
      <p className="placeholder">
        DRAG FILE HERE <br /> OR <span>BROWSE</span>
      </p>
      <input
        ref={inputRef}
        accept="img/*"
        type="file"
        style={{ visibility: "hidden", opacity: 0 }}
        onChange={(e) => fileHandler(e.target.files)}
      />
    </FileDrop>
  );
}

export default FileCustomDrop;
