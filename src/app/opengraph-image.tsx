import { ImageResponse } from "next/og";

export const alt = "MG Bebidas & Tabacaria, Cascavel - PR";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Imagem de pré-visualização do link (WhatsApp, Instagram, Google), na identidade preto e dourado.
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#131110",
          border: "6px solid #c9a24b",
          color: "#f2ede4",
        }}
      >
        <div style={{ display: "flex", fontSize: 150, fontWeight: 700, color: "#e7c877", letterSpacing: 8 }}>MG</div>
        <div style={{ display: "flex", fontSize: 64, marginTop: 8 }}>Bebidas & Tabacaria</div>
        <div style={{ display: "flex", fontSize: 34, marginTop: 28, color: "#c9a24b" }}>
          Narguilé, essências e bebidas em Cascavel - PR
        </div>
        <div style={{ display: "flex", fontSize: 26, marginTop: 20, color: "#a39a8a" }}>
          Todos os dias, 14h às 01h
        </div>
      </div>
    ),
    { ...size }
  );
}
