import {defineConfig} from 'sanity'
import {presentationTool} from 'sanity/presentation'
import {resolve} from './presentation/resolve'
import {schemaTypes} from './schemaTypes'
import {StructureBuilder, structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import { singletonTypes, standardTypes } from './schemaTypes'

const singletonSet: Set<string> = new Set(singletonTypes.map(({name})=>name));
const singletonActions = new Set(["publish", "discardChanges", "restore"])
const getStructure =  (S: StructureBuilder) =>{
  const documentTypeList = standardTypes.map(({name, title})=> S.documentTypeListItem(name).title(title || ""))
       return S.list()
          .title("Content")
          .items([
            // The singleton type has a list item with a custom child
            S.listItem()
              .title("About Page")
              .id("aboutPage")
              .schemaType("aboutPage")
              .child(
                // Instead of rendering a list of documents, render a single
                // document, specifying the `documentId` manually to ensure
                // that we're editing the single instance of the document
                S.document()
                  .schemaType("aboutPage")
                  .documentId("aboutPage")
              ),
            // Regular document types
            ...documentTypeList
          ]);
}

export default defineConfig({
  name: 'default',
  title: process.env.SANITY_STUDIO_TITLE,

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
        preview: '/',
        previewMode: {
          enable: '/api/draft-mode/enable',
        },
      },
    }),
  ],

  schema: {
    types: schemaTypes,
        // Filter out singleton types from the global “New document” menu options
    templates: (templates) =>
      templates.filter(({ schemaType }) => !singletonSet.has(schemaType)),
  },
    document: {
    // For singleton types, filter out actions that are not explicitly included
    // in the `singletonActions` list defined above
    actions: (input, context) =>
      singletonSet.has(context.schemaType)
        ? input.filter(({ action }) => action && singletonActions.has(action))
        : input,
  },

})
