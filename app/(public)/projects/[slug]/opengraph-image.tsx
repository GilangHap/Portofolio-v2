import { ImageResponse } from "next/og";
import { getProjectBySlug } from "@/app/actions/projects";

export const alt = "Project Preview";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  const title = project?.title || "Project";
  const description = project?.short_description || "";

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
          padding: "80px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "24px",
          }}
        >
          <span
            style={{
              color: "#39FF14",
              fontSize: "28px",
              fontWeight: 900,
              letterSpacing: "-1px",
            }}
          >
            GH.
          </span>
          <span
            style={{
              color: "#888888",
              fontSize: "20px",
              marginLeft: "16px",
            }}
          >
            Portfolio
          </span>
        </div>

        <div
          style={{
            fontSize: "64px",
            fontWeight: 900,
            color: "#ffffff",
            textTransform: "uppercase",
            letterSpacing: "-2px",
            lineHeight: 1.1,
            marginBottom: "20px",
            maxWidth: "900px",
          }}
        >
          {title}
        </div>

        {description && (
          <div
            style={{
              fontSize: "24px",
              color: "#888888",
              lineHeight: 1.4,
              maxWidth: "800px",
            }}
          >
            {description.length > 120
              ? description.substring(0, 120) + "..."
              : description}
          </div>
        )}

        <div
          style={{
            position: "absolute",
            bottom: "60px",
            left: "80px",
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <div
            style={{
              width: "12px",
              height: "12px",
              borderRadius: "50%",
              background: "#39FF14",
            }}
          />
          <span style={{ color: "#888888", fontSize: "18px" }}>
            Fullstack Developer
          </span>
        </div>

        <div
          style={{
            position: "absolute",
            top: "0",
            right: "0",
            width: "8px",
            height: "100%",
            background: "#39FF14",
          }}
        />
      </div>
    ),
    { ...size }
  );
}
