import { defineConfig, presetIcons } from "unocss";

export default defineConfig({
  presets: [
    presetIcons({ collections: { ri: () => import("@iconify-json/ri/icons.json").then((module) => module.default) } }),
  ],
  safelist: [
    "i-ri-user-fill",
    "i-ri-contacts-book-2-fill",
    "i-ri-check-fill",
    "i-ri-briefcase-4-fill",
    "i-ri-graduation-cap-fill",
    "i-ri-palette-fill",
    "i-ri-link",
    "i-ri-github-fill",
    "i-ri-sun-fill",
    "i-ri-moon-fill",
    "i-ri-linkedin-fill",
    "i-ri-external-link-line",
  ],
});
