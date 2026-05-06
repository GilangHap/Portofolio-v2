import { ImageResponse } from "next/og";

export const alt = "GH. | Fullstack Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0a0a0a",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "400px",
            height: "400px",
            borderRadius: "50%",
            background: "rgba(57, 255, 20, 0.08)",
            filter: "blur(80px)",
          }}
        />

        <div
          style={{
            fontSize: "80px",
            fontWeight: 900,
            color: "#39FF14",
            letterSpacing: "-3px",
            marginBottom: "8px",
          }}
        >
          GH.
        </div>

        <div
          style={{
            fontSize: "36px",
            fontWeight: 900,
            color: "#ffffff",
            textTransform: "uppercase",
            letterSpacing: "8px",
            marginBottom: "16px",
          }}
        >
          FULLSTACK DEVELOPER
        </div>

        <div
          style={{
            fontSize: "20px",
            color: "#888888",
            maxWidth: "600px",
            textAlign: "center",
            lineHeight: 1.5,
          }}
        >
          Building modern, performant, and scalable web applications
        </div>

        <div
          style={{
            position: "absolute",
            bottom: "40px",
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <div
            style={{
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              background: "#39FF14",
            }}
          />
          <span style={{ color: "#888888", fontSize: "16px" }}>
            Available for opportunities
          </span>
        </div>

        <div
          style={{
            position: "absolute",
            top: "0",
            left: "0",
            right: "0",
            height: "4px",
            background: "#39FF14",
          }}
        />
      </div>
    ),
    { ...size }
  );
}
