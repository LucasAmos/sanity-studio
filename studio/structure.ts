import { StructureBuilder } from "sanity/structure";

import { standardTypes } from "./schemaTypes";

export const getStructure = (S: StructureBuilder) => {
  const documentTypeList = standardTypes.map(({ name, title }) =>
    S.documentTypeListItem(name).title(title || name)
  );
  return S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Pages")
        .child(
          S.list()
            .title("Page documents")
            .items([
              S.listItem().title("About Page").id("about").schemaType("about").child(
                // Instead of rendering a list of documents, render a single
                // document, specifying the `documentId` manually to ensure
                // that we're editing the single instance of the document
                S.document().schemaType("about").documentId("about")
              ),
              S.listItem()
                .title("CV Page")
                .id("cv")
                .schemaType("cv")
                .child(S.document().schemaType("cv").documentId("cv"))
            ])
        ),
      ...documentTypeList
    ]);
};
