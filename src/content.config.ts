import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const locationSchema = z
  .object({
    address: z.string().optional(),
    postalCode: z.string().optional(),
    city: z.string().optional(),
    countryCode: z.string().optional(),
    region: z.string().optional(),
  })
  .passthrough();

const profileSchema = z
  .object({ network: z.string().optional(), username: z.string().optional(), url: z.string().optional() })
  .passthrough();

const basicsSchema = z
  .object({
    name: z.string().optional(),
    label: z.string().optional(),
    image: z.string().optional(),
    email: z.string().email().optional(),
    phone: z.string().optional(),
    url: z.string().url().optional(),
    summary: z.string().optional(),
    location: locationSchema.optional(),
    profiles: z.array(profileSchema).optional(),
  })
  .passthrough();

const datedItemSchema = z
  .object({
    name: z.string().optional(),
    position: z.string().optional(),
    url: z.string().url().optional(),
    startDate: z.string().optional(),
    endDate: z.string().optional(),
    summary: z.string().optional(),
    highlights: z.array(z.string()).optional(),
  })
  .passthrough();

const educationSchema = z
  .object({
    institution: z.string().optional(),
    url: z.string().url().optional(),
    area: z.string().optional(),
    studyType: z.string().optional(),
    startDate: z.string().optional(),
    endDate: z.string().optional(),
    score: z.string().optional(),
    courses: z.array(z.string()).optional(),
  })
  .passthrough();

const awardSchema = z
  .object({
    title: z.string().optional(),
    date: z.string().optional(),
    awarder: z.string().optional(),
    summary: z.string().optional(),
  })
  .passthrough();

const certificateSchema = z
  .object({
    name: z.string().optional(),
    date: z.string().optional(),
    issuer: z.string().optional(),
    url: z.string().url().optional(),
  })
  .passthrough();

const publicationSchema = z
  .object({
    name: z.string().optional(),
    publisher: z.string().optional(),
    releaseDate: z.string().optional(),
    url: z.string().url().optional(),
    summary: z.string().optional(),
  })
  .passthrough();

const skillSchema = z
  .object({ name: z.string().optional(), level: z.string().optional(), keywords: z.array(z.string()).optional() })
  .passthrough();

const languageSchema = z.object({ language: z.string().optional(), fluency: z.string().optional() }).passthrough();

const interestSchema = z
  .object({ name: z.string().optional(), keywords: z.array(z.string()).optional() })
  .passthrough();

const referenceSchema = z.object({ name: z.string().optional(), reference: z.string().optional() }).passthrough();

const projectSchema = z
  .object({
    name: z.string().optional(),
    description: z.string().optional(),
    highlights: z.array(z.string()).optional(),
    keywords: z.array(z.string()).optional(),
    startDate: z.string().optional(),
    endDate: z.string().optional(),
    url: z.string().url().optional(),
    roles: z.array(z.string()).optional(),
    entity: z.string().optional(),
    type: z.string().optional(),
  })
  .passthrough();

const metaSchema = z
  .object({
    canonical: z.string().url().optional(),
    version: z.string().optional(),
    lastModified: z.string().optional(),
  })
  .passthrough();

export const resumeSchema = z
  .object({
    basics: basicsSchema.optional(),
    work: z.array(datedItemSchema).optional(),
    volunteer: z.array(datedItemSchema).optional(),
    education: z.array(educationSchema).optional(),
    awards: z.array(awardSchema).optional(),
    certificates: z.array(certificateSchema).optional(),
    publications: z.array(publicationSchema).optional(),
    skills: z.array(skillSchema).optional(),
    languages: z.array(languageSchema).optional(),
    interests: z.array(interestSchema).optional(),
    references: z.array(referenceSchema).optional(),
    projects: z.array(projectSchema).optional(),
    meta: metaSchema.optional(),
  })
  .passthrough();

const resumes = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./src/content/resumes" }),
  schema: resumeSchema,
});

export const collections = { resumes };
