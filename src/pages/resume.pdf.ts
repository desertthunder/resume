import { pdf } from "@react-pdf/renderer";
import type { APIRoute } from "astro";
import { getEntry } from "astro:content";
import React from "react";
import ResumePdf from "../components/pdf/ResumePdf";

export const prerender = true;

export const GET: APIRoute = async () => {
  const resumeEntry = await getEntry("resumes", "data");

  if (!resumeEntry) {
    return new Response("Resume data not found", { status: 404 });
  }

  const pdfBuffer = await pdf(
    React.createElement(ResumePdf, { resume: resumeEntry.data }) as React.ReactElement,
  ).toBuffer();

  return new Response(pdfBuffer, {
    headers: { "Content-Disposition": 'inline; filename="resume.pdf"', "Content-Type": "application/pdf" },
  });
};
