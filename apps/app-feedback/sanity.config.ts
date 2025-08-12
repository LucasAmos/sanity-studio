import { defineConfig } from "sanity";

export default defineConfig({
  title: "app feedback",
  projectId: process.env.SANITY_STUDIO_PROJECT_ID!,
  dataset: process.env.SANITY_STUDIO_DATASET!,
});
