import React from "react";
import { Document, Font, Link, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import path from "node:path";
import type { ReactNode } from "react";
import type { Resume } from "../../types/resume";
import { formatResumeDate, formatResumeDateRange } from "../../utils/date";

Font.register({
  family: "IBM Plex Serif",
  fonts: [
    {
      fontWeight: 400,
      src: path.join(
        process.cwd(),
        "node_modules/@fontsource/ibm-plex-serif/files/ibm-plex-serif-latin-400-normal.woff",
      ),
    },
    {
      fontWeight: 700,
      src: path.join(
        process.cwd(),
        "node_modules/@fontsource/ibm-plex-serif/files/ibm-plex-serif-latin-700-normal.woff",
      ),
    },
  ],
});

Font.register({
  family: "IBM Plex Sans",
  fonts: [
    {
      fontWeight: 400,
      src: path.join(process.cwd(), "node_modules/@fontsource/ibm-plex-sans/files/ibm-plex-sans-latin-400-normal.woff"),
    },
    {
      fontWeight: 600,
      src: path.join(process.cwd(), "node_modules/@fontsource/ibm-plex-sans/files/ibm-plex-sans-latin-600-normal.woff"),
    },
    {
      fontWeight: 700,
      src: path.join(process.cwd(), "node_modules/@fontsource/ibm-plex-sans/files/ibm-plex-sans-latin-700-normal.woff"),
    },
  ],
});

Font.registerHyphenationCallback((word) => [word]);

const colors = {
  surface: "#fcfcfd",
  surfaceMuted: "#f8fafc",
  text: "#020617",
  muted: "#475569",
  border: "#e2e8f0",
  accent: "#3b82f6",
  accentStrong: "#1d4ed8",
  accentDark: "#172554",
  white: "#ffffff",
};

const fontSizes = { xxs: 8.5, xs: 9.5, sm: 10.5, md: 12, lg: 15, xl: 21 };

const space = { 1: 4, 2: 6, 3: 8, 4: 10, 5: 12, 6: 16 };

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.surface,
    color: colors.text,
    flexDirection: "row",
    fontFamily: "IBM Plex Sans",
    fontSize: fontSizes.xs,
    lineHeight: 1.35,
  },
  sidebar: {
    backgroundColor: colors.surfaceMuted,
    borderRightColor: colors.border,
    borderRightWidth: 1,
    flexBasis: "31%",
    flexDirection: "column",
  },
  sidebarContent: { gap: space[5], padding: space[5] },
  header: {
    backgroundColor: colors.accent,
    color: colors.white,
    gap: space[3],
    paddingHorizontal: space[5],
    paddingVertical: space[6],
    textAlign: "center",
  },
  headerTitle: { fontFamily: "IBM Plex Serif", fontSize: fontSizes.xl, fontWeight: 700, lineHeight: 1.05 },
  headerSubtitle: { fontSize: fontSizes.md, fontWeight: 700 },
  main: { flexBasis: "69%", flexGrow: 1, padding: space[5] },
  projectPage: {
    backgroundColor: colors.surface,
    color: colors.text,
    fontFamily: "IBM Plex Sans",
    fontSize: fontSizes.xs,
    lineHeight: 1.35,
    padding: space[6],
  },
  section: { gap: space[2], marginBottom: space[5] },
  sectionHeading: { marginBottom: space[1] },
  sectionHeadingText: { fontFamily: "IBM Plex Serif", fontSize: fontSizes.lg, fontWeight: 700 },
  item: { marginTop: space[3] },
  itemHeading: { fontFamily: "IBM Plex Serif", fontSize: fontSizes.md, fontWeight: 700, marginBottom: space[1] },
  meta: { color: colors.muted, fontSize: fontSizes.xs, fontWeight: 600 },
  roleRow: { alignItems: "baseline", flexDirection: "row", justifyContent: "space-between", marginBottom: space[2] },
  role: { fontSize: fontSizes.sm, fontWeight: 700 },
  dates: { color: colors.muted, fontSize: fontSizes.xxs, letterSpacing: 0.3 },
  paragraph: { marginBottom: space[1] },
  bold: { fontWeight: 700 },
  link: { color: colors.accentStrong, textDecoration: "underline" },
  list: { gap: space[1], marginTop: space[1] },
  listItem: { flexDirection: "row", gap: space[2] },
  bullet: { color: colors.muted, width: 8 },
  bulletText: { flex: 1 },
  separator: { borderTopColor: colors.border, borderTopWidth: 1, marginTop: space[4] },
  contactRows: { gap: space[1] },
  contactRow: { flexDirection: "row", flexWrap: "wrap" },
  skillGroup: { marginTop: space[2] },
  skillTitle: { fontFamily: "IBM Plex Serif", fontSize: fontSizes.sm, fontWeight: 700 },
});

function SectionHeading({ children }: { children: ReactNode }) {
  return (
    <View style={styles.sectionHeading}>
      <Text style={styles.sectionHeadingText}>{children}</Text>
    </View>
  );
}

function BulletList({ items, boldFirst = false }: { items: string[]; boldFirst?: boolean }) {
  return (
    <View style={styles.list}>
      {items.map((item, index) => (
        <View key={`${item}-${index}`} style={styles.listItem}>
          <Text style={styles.bullet}>•</Text>
          <Text style={[styles.bulletText, boldFirst && index === 0 ? styles.bold : undefined]}>{item}</Text>
        </View>
      ))}
    </View>
  );
}

function locationText(
  location: Resume["basics"] extends infer Basics
    ? Basics extends { location?: infer Location }
      ? Location
      : never
    : never,
) {
  if (!location) return "";
  const { city, region, countryCode } = location;
  return [city, region, countryCode].filter(Boolean).join(", ");
}

export default function ResumePdf({ resume }: { resume: Resume }) {
  const basics = resume.basics;
  const name = basics?.name ?? "Résumé";
  const year = new Date().getFullYear();
  const profiles = basics?.profiles ?? [];
  return (
    <Document author={name} title={`Résumé for ${name}, ${year}`}>
      <Page size="LETTER" style={styles.page}>
        <View style={styles.sidebar}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>{name}</Text>
            {basics?.label && <Text style={styles.headerSubtitle}>{basics.label}</Text>}
          </View>

          <View style={styles.sidebarContent}>
            <View style={styles.section}>
              <SectionHeading>About Me</SectionHeading>
              <Text style={styles.paragraph}>
                {basics?.summary ||
                  `Software engineer focused on ${basics?.label?.toLowerCase() ?? "building reliable software"}.`}
              </Text>
            </View>

            <View style={styles.section}>
              <SectionHeading>Contact</SectionHeading>
              <View style={styles.contactRows}>
                {locationText(basics?.location) && (
                  <View style={styles.contactRow}>
                    <Text style={styles.bold}>Location: </Text>
                    <Text>{locationText(basics?.location)}</Text>
                  </View>
                )}
                {basics?.email && (
                  <View style={styles.contactRow}>
                    <Text style={styles.bold}>Email: </Text>
                    <Link href={`mailto:${basics.email}`} style={styles.link}>
                      {basics.email}
                    </Link>
                  </View>
                )}
                {basics?.phone && (
                  <View style={styles.contactRow}>
                    <Text style={styles.bold}>Phone: </Text>
                    <Text>{basics.phone}</Text>
                  </View>
                )}
                {basics?.url && (
                  <View style={styles.contactRow}>
                    <Text style={styles.bold}>Website: </Text>
                    <Link href={basics.url} style={styles.link}>
                      {basics.url.replace(/^https?:\/\//, "")}
                    </Link>
                  </View>
                )}
                {profiles.map(
                  (profile) =>
                    profile.url && (
                      <View key={`${profile.network}-${profile.url}`} style={styles.contactRow}>
                        <Text style={styles.bold}>{profile.network ?? "Profile"}: </Text>
                        <Link href={profile.url} style={styles.link}>
                          {profile.username ?? profile.url.replace(/^https?:\/\//, "")}
                        </Link>
                      </View>
                    ),
                )}
              </View>
            </View>

            {!!resume.skills?.length && (
              <View style={styles.section}>
                <SectionHeading>Skills</SectionHeading>
                {resume.skills.map((skill) => (
                  <View key={skill.name} style={styles.skillGroup}>
                    <Text style={styles.skillTitle}>{skill.name}</Text>
                    {!!skill.keywords?.length && <Text style={styles.meta}>{skill.keywords.join(", ")}</Text>}
                  </View>
                ))}
              </View>
            )}

            {!!resume.education?.length && (
              <View style={styles.section}>
                <SectionHeading>Education</SectionHeading>
                {resume.education.map((education) => (
                  <View key={`${education.institution}-${education.area}`} style={styles.skillGroup} wrap={false}>
                    {education.studyType && <Text style={styles.skillTitle}>{education.studyType}</Text>}
                    {education.area && <Text style={styles.meta}>{education.area}</Text>}
                    <Text style={styles.meta}>
                      {education.institution}
                      {education.startDate
                        ? `, ${education.endDate ? formatResumeDateRange(education.startDate, education.endDate) : formatResumeDate(education.startDate)}`
                        : ""}
                    </Text>
                  </View>
                ))}
              </View>
            )}
          </View>
        </View>

        <View style={styles.main}>
          {!!resume.work?.length && (
            <View style={styles.section}>
              <SectionHeading>Professional Experience</SectionHeading>
              {resume.work.map((job, index) => {
                const highlights = [job.summary, ...(job.highlights ?? [])].filter(Boolean) as string[];
                return (
                  <View key={`${job.name}-${job.position}`} style={styles.item} wrap={false}>
                    <Text style={styles.itemHeading}>{job.name}</Text>
                    <View style={styles.roleRow}>
                      <Text style={styles.role}>{job.position}</Text>
                      <Text style={styles.dates}>{formatResumeDateRange(job.startDate, job.endDate)}</Text>
                    </View>
                    {!!highlights.length && <BulletList items={highlights} boldFirst />}
                    {index < (resume.work?.length ?? 0) - 1 && <View style={styles.separator} />}
                  </View>
                );
              })}
            </View>
          )}
        </View>
      </Page>

      {!!resume.projects?.length && (
        <Page size="LETTER" style={styles.projectPage}>
          <View style={styles.section}>
            <SectionHeading>Projects</SectionHeading>
            {resume.projects.map((project) => (
              <View key={project.name} style={styles.item} wrap={false}>
                <Text style={styles.itemHeading}>{project.name}</Text>
                {project.description && <Text style={styles.meta}>{project.description}</Text>}
                {!!project.highlights?.length && <BulletList items={project.highlights} />}
              </View>
            ))}
          </View>
        </Page>
      )}
    </Document>
  );
}
