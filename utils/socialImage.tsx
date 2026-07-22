import { ImageResponse } from "next/og";
import { siteConfig } from "@/utils/seo";

export const socialImageAlt = `${siteConfig.name} — Full-Stack Developer portfolio`;
export const socialImageSize = { width: 1200, height: 630 };
export const socialImageContentType = "image/png";

export function createSocialImage(): ImageResponse {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "72px 80px",
        background: "#faf9f6",
        color: "#1c2228",
        fontFamily: "Arial, Helvetica, sans-serif",
      }}
    >
      <div style={{ display: "flex", fontSize: 28, fontWeight: 700 }}>
        Suthang<span style={{ color: "#77736d" }}>.</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
        <div style={{ display: "flex", color: "#625f5a", fontSize: 26 }}>
          Full-Stack Developer · Computer Engineering
        </div>
        <div style={{ display: "flex", maxWidth: 980, fontSize: 76, fontWeight: 700, letterSpacing: -3.5, lineHeight: 1.02 }}>
          {siteConfig.name}
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", color: "#625f5a", fontSize: 24 }}>
        <span>{siteConfig.alternateName}</span>
        <span>{siteConfig.domain}</span>
      </div>
    </div>,
    socialImageSize,
  );
}
