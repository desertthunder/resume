import type { APIRoute } from "astro";
import { getEntry } from "astro:content";
import type { Resume } from "../types/resume";

export const prerender = true;

const PAGE_WIDTH = 78;
const CONTENT_INDENT = "       ";
const HANGING_INDENT = "              ";

const compact = (parts: Array<string | undefined | null>) => parts.filter(Boolean).join(" ");
const normalize = (value: string | undefined) => value?.trim() || undefined;
const manName = (name: string | undefined) => (name ?? "resume").toLowerCase().replace(/[^a-z0-9]+/g, "_");
const sectionTitle = (title: string) => `${title.toUpperCase()}\n\n`;
const paragraph = (text: string | undefined) => (text ? `${wrapLine(text)}\n` : "");

function dateRange(startDate?: string, endDate?: string) {
  if (!startDate && !endDate) return undefined;
  return `${startDate ?? ""}${startDate || endDate ? " - " : ""}${endDate ?? "present"}`;
}

function wrapLine(text: string, indent = CONTENT_INDENT, subsequentIndent = indent) {
  const words = text.replace(/\s+/g, " ").trim().split(" ").filter(Boolean);
  if (words.length === 0) return indent.trimEnd();

  const lines: string[] = [];
  let current = indent;
  let width = PAGE_WIDTH;

  for (const word of words) {
    const separator = current.trim().length === 0 ? "" : " ";
    if (`${current}${separator}${word}`.length > width && current.trim().length > 0) {
      lines.push(current.trimEnd());
      current = `${subsequentIndent}${word}`;
      width = PAGE_WIDTH;
    } else {
      current = `${current}${separator}${word}`;
    }
  }

  lines.push(current.trimEnd());
  return lines.join("\n");
}

function item(heading: string, body: Array<string | undefined>) {
  const lines = [`${CONTENT_INDENT}${heading}`];
  for (const line of body.filter(Boolean)) {
    lines.push(wrapLine(line!, HANGING_INDENT, HANGING_INDENT));
  }
  return lines.join("\n");
}

function renderResumeAsManPage(resume: Resume) {
  const basics = resume.basics;
  const name = basics?.name ?? "Resume";
  const command = manName(name);
  const title = `${command.toUpperCase()}(7)`;
  const header = `${title.padEnd(35)}`.slice(0, PAGE_WIDTH);
  const location = compact([basics?.location?.city, basics?.location?.region, basics?.location?.countryCode]);

  const contact = [
    basics?.email && `Email: ${basics.email}`,
    basics?.phone && `Phone: ${basics.phone}`,
    basics?.url && `Web: ${basics.url}`,
    "\n",
    ...(basics?.profiles?.map((profile) => compact([`${profile.network}:`, profile.url && `${profile.url}`])) ?? []),
  ].filter(Boolean);

  const sections: string[] = [
    header,
    "",
    sectionTitle("Name") + paragraph(`${name} - ${basics?.label ?? basics?.summary ?? "software resume"}`),
    sectionTitle("Synopsis") + paragraph(`${command} [--experience] [--skills] [--projects] [--education]`),
  ];

  if (contact.length > 0) {
    sections.push(sectionTitle("Contact") + contact.map((line) => wrapLine(line!)).join("\n") + "\n");
  }

  if (basics?.summary) {
    sections.push(sectionTitle("Description") + paragraph(basics.summary));
  }

  if (resume.work?.length) {
    sections.push(
      sectionTitle("Experience") +
        resume.work
          .map((work) => {
            const heading = compact([
              normalize(work.position),
              work.name && `at ${work.name}`,
              dateRange(work.startDate, work.endDate) && `(${dateRange(work.startDate, work.endDate)})`,
            ]);
            return item(heading, [work.summary, ...(work.highlights?.map((highlight) => `${highlight}`) ?? [])]);
          })
          .join("\n\n") +
        "\n",
    );
  }

  if (resume.skills?.length) {
    sections.push(
      sectionTitle("Skills") +
        resume.skills.map((skill) => item(skill.name ?? "Skill", [skill.keywords?.join(", ")])).join("\n\n") +
        "\n",
    );
  }

  if (resume.projects?.length) {
    sections.push(
      sectionTitle("Projects") +
        resume.projects
          .map((project) =>
            item(compact([project.name, project.url && `(${project.url})`]), [
              project.description,
              ...(project.highlights?.map((highlight) => `${highlight}`) ?? []),
            ]),
          )
          .join("\n\n") +
        "\n",
    );
  }

  if (resume.education?.length) {
    sections.push(
      sectionTitle("Education") +
        resume.education
          .map((education) =>
            item(
              compact([
                education.institution,
                dateRange(education.startDate, education.endDate) &&
                  `(${dateRange(education.startDate, education.endDate)})`,
              ]),
              [compact([education.studyType, education.area])],
            ),
          )
          .join("\n\n") +
        "\n",
    );
  }

  if (resume.awards?.length) {
    sections.push(
      sectionTitle("Awards") +
        resume.awards
          .map((award) => item(compact([award.title, award.date && `(${award.date})`]), [award.awarder, award.summary]))
          .join("\n\n") +
        "\n",
    );
  }

  sections.push(sectionTitle("See Also") + paragraph("resume.pdf(7), desertthunder.dev(7)"));
  sections.push(`${new Date().getFullYear().toString().padEnd(39)}${title}`);

  return `${sections.join("\n").replace(/\n{3,}/g, "\n\n")}\n`;
}

export const GET: APIRoute = async () => {
  const resumeEntry = await getEntry("resumes", "data");

  if (!resumeEntry) {
    return new Response("Resume data not found\n", { status: 404 });
  }

  return new Response(renderResumeAsManPage(resumeEntry.data), {
    headers: { "Content-Disposition": 'inline; filename="resume.txt"', "Content-Type": "text/plain; charset=utf-8" },
  });
};
