import type { z } from "astro/zod";
import type { resumeSchema } from "../content.config";

export type Resume = z.infer<typeof resumeSchema>;

export type ResumeBasics = NonNullable<Resume["basics"]>;
export type ResumeLocation = NonNullable<ResumeBasics["location"]>;
export type ResumeProfile = NonNullable<ResumeBasics["profiles"]>[number];
export type ResumeWork = NonNullable<Resume["work"]>[number];
export type ResumeEducation = NonNullable<Resume["education"]>[number];
export type ResumeAward = NonNullable<Resume["awards"]>[number];
export type ResumeSkill = NonNullable<Resume["skills"]>[number];
export type ResumeProject = NonNullable<Resume["projects"]>[number];
