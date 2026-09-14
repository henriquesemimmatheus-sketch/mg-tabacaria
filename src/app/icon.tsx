import { ImageResponse } from "next/og";

export const size = {
  width: 32,
  height: 32,
};
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#131110",
          border: "1px solid #c9a24b",
          borderRadius: "50%",
          color: "#e7c877",
          fontSize: 15,
          fontWeight: 600,
          letterSpacing: "-0.5px",
        }}
      >
        MG
      </div>
    ),
    { ...size }
  );
}
