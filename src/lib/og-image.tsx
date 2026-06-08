import { ImageResponse } from "@takumi-rs/image-response";
import { readFile } from "node:fs/promises";
import React from "react";

/**
 * Format a Date object to human readable
 *
 * ex. Jun 4, 2026
 */
function formatDate(d?: Date) {
  const date = d ? d : new Date();
  return date.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
}

const content = {
  windowTitle: "resume.desertthunder.dev",
  location: "Austin, TX",
  badge: "Open to Work",
  name: "Owais Jamil",
  tagline: "Senior Software Engineer & Writer",
  github: "github.com/desertthunder",
  updatedAt: formatDate(),
};

const colors = {
  bg: "#0f0f0f",
  bgMuted: "#161616",
  bgRaised: "#1f1f1f",
  border: "#393939",
  borderStrong: "#525252",
  text: "#f2f4f8",
  textMuted: "#c1c7cd",
  textSubtle: "#8d8d8d",
  blue: "#33b1ff",
  blueStrong: "#0f62fe",
  cyan: "#3ddbd9",
  purple: "#be95ff",
  magenta: "#ff7eb6",
  green: "#42be65",
  white: "#ffffff",
};

const h = React.createElement;

const projectRoot = new URL(`file://${process.cwd()}/`);
const recursiveFontBaseUrl = new URL("node_modules/@fontsource-variable/recursive/files/", projectRoot);
const atkinsonFontBaseUrl = new URL("node_modules/@fontsource-variable/atkinson-hyperlegible-next/files/", projectRoot);
const jetbrainsFontBaseUrl = new URL("node_modules/@fontsource-variable/jetbrains-mono/files/", projectRoot);

const fonts = Promise.all([
  readFile(new URL("recursive-latin-full-normal.woff2", recursiveFontBaseUrl)).then((data) => ({
    name: "Recursive Variable",
    data,
    weight: 700,
    style: "normal" as const,
  })),
  readFile(new URL("atkinson-hyperlegible-next-latin-wght-normal.woff2", atkinsonFontBaseUrl)).then((data) => ({
    name: "Atkinson Hyperlegible Next Variable",
    data,
    weight: 400,
    style: "normal" as const,
  })),
  readFile(new URL("jetbrains-mono-latin-wght-normal.woff2", jetbrainsFontBaseUrl)).then((data) => ({
    name: "JetBrains Mono Variable",
    data,
    weight: 400,
    style: "normal" as const,
  })),
]);

export async function generateOGImage() {
  return new ImageResponse(
    h(
      "div",
      {
        style: {
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          backgroundColor: colors.bg,
          fontFamily: '"Atkinson Hyperlegible Next Variable", system-ui, sans-serif',
          position: "relative",
          overflow: "hidden",
        },
      },
      h("div", {
        style: {
          position: "absolute",
          inset: 0,
          opacity: 0.22,
          backgroundImage:
            `linear-gradient(${colors.border} 1px, transparent 1px), ` +
            `linear-gradient(90deg, ${colors.border} 1px, transparent 1px)`,
          backgroundSize: "48px 48px",
        },
      }),
      h(
        "div",
        {
          style: {
            display: "flex",
            flexDirection: "column",
            flex: 1,
            position: "relative",
            margin: "60px",
            border: `2px solid ${colors.blue}`,
            borderRadius: "18px",
            overflow: "hidden",
            backgroundColor: colors.bgMuted,
            boxShadow: `0 0 0 1px ${colors.cyan}33, 0 34px 90px rgba(0, 0, 0, 0.42)`,
          },
        },
        h(
          "div",
          {
            style: {
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              backgroundColor: colors.bgRaised,
              borderBottom: `1px solid ${colors.border}`,
              padding: "16px 24px",
              fontFamily: '"JetBrains Mono Variable", ui-monospace, monospace',
            },
          },
          h(
            "div",
            { style: { display: "flex", alignItems: "center", gap: "12px" } },
            h(
              "div",
              { style: { display: "flex", gap: "8px" } },
              h("div", {
                style: { width: "12px", height: "12px", borderRadius: "50%", backgroundColor: colors.magenta },
              }),
              h("div", {
                style: { width: "12px", height: "12px", borderRadius: "50%", backgroundColor: colors.purple },
              }),
              h("div", {
                style: { width: "12px", height: "12px", borderRadius: "50%", backgroundColor: colors.green },
              }),
            ),
            h("div", {
              style: { width: "1px", height: "16px", backgroundColor: colors.borderStrong, marginLeft: "8px" },
            }),
            h("span", { style: { color: colors.text, fontSize: "20px" } }, content.windowTitle),
          ),
          h("span", { style: { color: colors.textMuted, fontSize: "18px" } }, content.location),
        ),
        h(
          "div",
          {
            style: {
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              padding: "54px 56px",
              maxWidth: "880px",
            },
          },
          h(
            "div",
            {
              style: {
                display: "flex",
                alignSelf: "flex-start",
                marginBottom: "22px",
                padding: "8px 12px",
                border: `1px solid ${colors.borderStrong}`,
                borderRadius: "999px",
                color: colors.cyan,
                fontFamily: '"JetBrains Mono Variable", ui-monospace, monospace',
                fontSize: "18px",
              },
            },
            content.badge,
          ),
          h(
            "h1",
            {
              style: {
                fontFamily: '"Recursive Variable", Georgia, serif',
                fontSize: "76px",
                fontWeight: "700",
                color: colors.white,
                lineHeight: 1,
                letterSpacing: "-0.045em",
                margin: 0,
                marginBottom: "26px",
                whiteSpace: "nowrap",
              },
            },
            content.name,
          ),
          h(
            "p",
            { style: { margin: 0, fontSize: "32px", color: colors.text, lineHeight: 1.35, whiteSpace: "nowrap" } },
            content.tagline,
          ),
        ),
        h(
          "div",
          {
            style: {
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              backgroundColor: colors.bgRaised,
              borderTop: `1px solid ${colors.border}`,
              padding: "14px 24px",
              fontFamily: '"JetBrains Mono Variable", ui-monospace, monospace',
              fontSize: "18px",
              color: colors.textMuted,
            },
          },
          h("span", null, content.github),
          h("span", { style: { color: colors.blue } }, `Updated ${content.updatedAt}`),
        ),
      ),
    ),
    { width: 1200, height: 630, format: "png", fonts: await fonts },
  );
}
