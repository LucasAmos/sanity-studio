import { RobotIcon } from "@sanity/icons";
import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { presentationTool } from "sanity/presentation";
import { structureTool } from "sanity/structure";

import { MyEnhancedNavbar } from "./navbar";
import { resolve } from "./presentation/resolve";
import { schemaTypes } from "./schemaTypes";
import { singletonTypes } from "./schemaTypes";
import { getStructure } from "./structure";

const singletonSet: Set<string> = new Set(singletonTypes.map(({ name }) => name));
const singletonActions = new Set(["publish", "discardChanges", "restore"]);

export default defineConfig({
  name: "default",
  title: process.env.SANITY_STUDIO_TITLE,
  icon: RobotIcon,
  projectId: process.env.SANITY_STUDIO_PROJECT_ID!,
  dataset: process.env.SANITY_STUDIO_DATASET!,

  plugins: [
    structureTool({
      structure: (S) => getStructure(S)
    }),
    visionTool(),
    presentationTool({
      resolve,
      previewUrl: {
        initial: process.env.SANITY_STUDIO_PREVIEW_ORIGIN,
        preview: "/",
        previewMode: {
          enable: "/api/draft-mode/enable"
        }
      }
    })
  ],
  schema: {
    types: schemaTypes,
    // Filter out singleton types from the global “New document” menu options
    templates: (templates) => templates.filter(({ schemaType }) => !singletonSet.has(schemaType))
  },
  document: {
    // For singleton types, filter out actions that are not explicitly included
    // in the `singletonActions` list defined above
    actions: (input, context) =>
      singletonSet.has(context.schemaType)
        ? input.filter(({ action }) => action && singletonActions.has(action))
        : input
  },
  studio: {
    components: {
      navbar: MyEnhancedNavbar
    }
  }
});
