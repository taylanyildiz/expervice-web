import { QRCodeCanvas } from "qrcode.react";

interface QRCodeViewProps {
  value?: string | null | undefined;
  size?: number;
  color?: string;
}

function QRCodeView(props: QRCodeViewProps) {
  const { value, size, color } = props;
  return (
    <div
      style={{
        alignItems: "center",
        display: "flex",
        margin: 0,
        padding: 0,
        maxWidth: size,
        color: "red",
      }}
    >
      <QRCodeCanvas
        style={{
          padding: 0,
          margin: 0,
          height: "auto",
          maxWidth: "100%",
          width: "100%",
        }}
        bgColor="transparent"
        fgColor={color ?? "black"}
        value={value ?? "https://expervice.com"}
      />
    </div>
  );
}

export default QRCodeView;
