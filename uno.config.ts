import { defineConfig, presetIcons } from "unocss";

const iconClasses = [
  "i-ri-user-fill",
  "i-ri-contacts-book-2-fill",
  "i-ri-check-fill",
  "i-ri-briefcase-4-fill",
  "i-ri-graduation-cap-fill",
  "i-ri-palette-fill",
  "i-ri-link",
  "i-ri-github-fill",
];

export default defineConfig({
  presets: [
    presetIcons({ collections: { ri: () => import("@iconify-json/ri/icons.json").then((module) => module.default) } }),
  ],
  safelist: iconClasses,
});
