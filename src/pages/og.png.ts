import type { APIRoute } from "astro";
import { generateOGImage } from "../lib/og-image";

export const prerender = true;

export const GET: APIRoute = async () => {
  try {
    const imageResponse = await generateOGImage();

    return new Response(imageResponse.body, {
      headers: { "Content-Type": "image/png", "Cache-Control": "public, max-age=31536000, immutable" },
    });
  } catch (error) {
    console.error("Error generating OG image:", error);
    return new Response("Error generating image", { status: 500 });
  }
};
